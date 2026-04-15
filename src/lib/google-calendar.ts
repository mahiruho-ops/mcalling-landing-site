import { randomUUID } from "crypto";
import { google } from "googleapis";

/** Set to a Workspace user email when using domain-wide delegation so Calendar can create Meet links. */
function getCalendarJwtAuth() {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKeyRaw = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;
  if (!clientEmail || !privateKeyRaw) {
    throw new Error("Google service account env vars are missing");
  }
  const privateKey = privateKeyRaw.replace(/\\n/g, "\n");
  const subject = process.env.GOOGLE_CALENDAR_IMPERSONATE_EMAIL?.trim();
  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/calendar"],
    ...(subject ? { subject } : {}),
  });
}

function getCalendarClient() {
  return google.calendar({ version: "v3", auth: getCalendarJwtAuth() });
}

function shouldSendCalendarInvites(): boolean {
  return (
    process.env.GOOGLE_CALENDAR_SEND_INVITES === "true" && Boolean(process.env.GOOGLE_CALENDAR_IMPERSONATE_EMAIL?.trim())
  );
}

async function withTransientRetry<T>(fn: () => Promise<T>): Promise<T> {
  let lastErr: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      const code = typeof (err as { code?: number }).code === "number" ? (err as { code: number }).code : undefined;
      if (code !== 429 && code !== 500 && code !== 503) throw err;
      await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
    }
  }
  throw lastErr;
}

function isMeetCreation400(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const e = err as {
    code?: unknown;
    message?: unknown;
    response?: { data?: { error?: { code?: unknown; message?: unknown } } };
  };
  const code = typeof e.code === "number" ? e.code : undefined;
  if (code !== 400) return false;
  const apiMsg = String(e.response?.data?.error?.message ?? "");
  const topMsg = String(e.message ?? "");
  const msg = `${topMsg} ${apiMsg}`.toLowerCase();
  return msg.includes("conference") || msg.includes("meet") || msg.includes("hangout");
}

function getCalendarId(): string {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  if (!calendarId) throw new Error("GOOGLE_CALENDAR_ID is required");
  return calendarId;
}

export async function getGoogleFreeBusy(timeMin: Date, timeMax: Date): Promise<Array<{ start: Date; end: Date }>> {
  const calendar = getCalendarClient();
  const calendarId = getCalendarId();
  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      items: [{ id: calendarId }],
    },
  });
  const busy = res.data.calendars?.[calendarId]?.busy ?? [];
  return busy
    .map((b) => ({
      start: b.start ? new Date(b.start) : null,
      end: b.end ? new Date(b.end) : null,
    }))
    .filter((b): b is { start: Date; end: Date } => Boolean(b.start && b.end));
}

export interface CreateGoogleEventInput {
  summary: string;
  description: string;
  timezone: string;
  start: Date;
  end: Date;
  /** When `GOOGLE_CALENDAR_SEND_INVITES=true` and `GOOGLE_CALENDAR_IMPERSONATE_EMAIL` is set, sends Calendar invites. */
  attendeeEmails?: string[];
}

/**
 * Creates an event on the shared calendar. Tries to attach Google Meet; falls back to a plain event if the API
 * rejects Meet (common for service accounts without Workspace domain-wide delegation + GOOGLE_CALENDAR_IMPERSONATE_EMAIL).
 * Optional attendee invites when delegation + GOOGLE_CALENDAR_SEND_INVITES are configured.
 */
export async function createGoogleCalendarEventWithMeet(input: CreateGoogleEventInput) {
  const calendar = getCalendarClient();
  const calendarId = getCalendarId();

  const sendInvites = shouldSendCalendarInvites();
  const uniqueAttendees = sendInvites
    ? [...new Set((input.attendeeEmails ?? []).map((e) => e.trim().toLowerCase()).filter((e) => e.includes("@")))]
    : [];
  const attendees =
    uniqueAttendees.length > 0 ? uniqueAttendees.map((email) => ({ email })) : undefined;
  const sendUpdates = attendees?.length ? ("all" as const) : ("none" as const);

  const limitationNote =
    "Note: Guest is not added as a Calendar invite (service account limitation). They receive details via email from mKcalling.";
  const baseDescription = [
    input.description,
    "",
    ...(attendees?.length ? [] : [limitationNote]),
  ].join("\n");

  const requestBase = {
    summary: input.summary,
    description: baseDescription,
    start: {
      dateTime: input.start.toISOString(),
      timeZone: input.timezone,
    },
    end: {
      dateTime: input.end.toISOString(),
      timeZone: input.timezone,
    },
    ...(attendees ? { attendees } : {}),
  };

  const withMeet = {
    ...requestBase,
    conferenceData: {
      createRequest: {
        requestId: randomUUID(),
        conferenceSolutionKey: {
          type: "hangoutsMeet" as const,
        },
      },
    },
  };

  let res;
  try {
    res = await withTransientRetry(() =>
      calendar.events.insert({
        calendarId,
        conferenceDataVersion: 1,
        sendUpdates,
        requestBody: withMeet,
      }),
    );
  } catch (err) {
    if (!isMeetCreation400(err)) throw err;
    res = await withTransientRetry(() =>
      calendar.events.insert({
        calendarId,
        sendUpdates,
        requestBody: {
          ...requestBase,
          description: [
            baseDescription,
            "",
            "Video: Google Meet could not be added automatically for this calendar credential. Add a Meet link in Google Calendar, or set GOOGLE_CALENDAR_IMPERSONATE_EMAIL with Workspace domain-wide delegation.",
          ].join("\n"),
        },
      }),
    );
  }

  const meetLink =
    res.data.hangoutLink ??
    res.data.conferenceData?.entryPoints?.find((e) => e.entryPointType === "video")?.uri ??
    null;

  return {
    eventId: res.data.id ?? "",
    htmlLink: res.data.htmlLink ?? "",
    meetLink,
  };
}

/** Removes an event from the shared calendar (e.g. when a booking is cancelled). */
export async function deleteGoogleCalendarEvent(eventId: string): Promise<void> {
  if (!eventId) return;
  const calendar = getCalendarClient();
  const calendarId = getCalendarId();
  const sendUpdates = shouldSendCalendarInvites() ? ("all" as const) : ("none" as const);
  await withTransientRetry(() =>
    calendar.events.delete({
      calendarId,
      eventId,
      sendUpdates,
    }),
  );
}
