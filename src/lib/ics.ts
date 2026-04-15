/** RFC 5545 text escape for SUMMARY, DESCRIPTION, LOCATION */
function escapeIcsText(s: string): string {
  return s
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

function formatUtc(dt: Date): string {
  return dt.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

export interface BuildConsultationIcsInput {
  /** Stable per booking — used in UID so re-sent emails update the same calendar object. */
  bookingRef: string;
  uidDomain: string;
  summary: string;
  descriptionLines: string[];
  location?: string;
  start: Date;
  end: Date;
  organizerEmail: string;
  organizerCn?: string;
  attendeeEmails: Array<{ email: string; cn?: string }>;
  method: "REQUEST" | "PUBLISH";
}

/**
 * Minimal iCalendar (ICS) for email attachments. Uses UTC DTSTART/DTEND so all clients interpret consistently.
 */
export function buildConsultationIcs(input: BuildConsultationIcsInput): string {
  const safeRef = input.bookingRef.replace(/[^a-zA-Z0-9-]/g, "-").slice(0, 80);
  const uid = `${safeRef}@${input.uidDomain}`;
  const dtStamp = formatUtc(new Date());
  const dtStart = formatUtc(input.start);
  const dtEnd = formatUtc(input.end);
  const summary = escapeIcsText(input.summary);
  const description = escapeIcsText(input.descriptionLines.filter(Boolean).join("\n"));
  const location = input.location ? escapeIcsText(input.location) : "";
  const orgCn = input.organizerCn ? escapeIcsText(input.organizerCn) : "Mahiruho";
  const organizer = `ORGANIZER;CN=${orgCn}:mailto:${input.organizerEmail}`;

  const attendees = input.attendeeEmails
    .filter((a) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email))
    .map((a) => {
      const cn = a.cn ? escapeIcsText(a.cn) : a.email;
      return `ATTENDEE;CUTYPE=INDIVIDUAL;RSVP=TRUE;CN=${cn}:mailto:${a.email}`;
    });

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Mahiruho//mKcalling//EN",
    "CALSCALE:GREGORIAN",
    `METHOD:${input.method}`,
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    ...(location ? [`LOCATION:${location}`] : []),
    organizer,
    ...attendees,
    "STATUS:CONFIRMED",
    "SEQUENCE:0",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n");
}
