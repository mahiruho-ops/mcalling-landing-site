/**
 * Central place for consultation Meet URL and optional email link flags.
 * Use when API-created events omit Meet (service account) or until mCRM owns booking UX.
 */

function isHttpUrl(s: string): boolean {
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

/** Prefer Calendar API Meet link; otherwise `CONSULTATION_GOOGLE_MEET_URL` (e.g. shared room). */
export function getConsultationMeetUrl(apiMeet: string | null | undefined): string | undefined {
  const t = apiMeet?.trim();
  if (t && isHttpUrl(t)) return t;
  const fallback = process.env.CONSULTATION_GOOGLE_MEET_URL?.trim();
  if (fallback && isHttpUrl(fallback)) return fallback;
  return undefined;
}

/** When true, confirmation emails may include "View your booking" (requires APP_BASE_URL + /booking route). Off until mCRM. */
export function shouldIncludeBookingManagementLink(): boolean {
  return process.env.EMAIL_INCLUDE_BOOKING_MANAGEMENT_LINK === "true";
}

/**
 * Google Calendar `htmlLink` often only works for the calendar owner; recipients see "Event not found".
 * Default: omit "Open in Google Calendar" in HTML and in ICS description unless this flag is set.
 */
export function shouldIncludeGoogleCalendarEventHtmlLink(): boolean {
  return process.env.EMAIL_INCLUDE_GOOGLE_CALENDAR_HTML_LINK === "true";
}
