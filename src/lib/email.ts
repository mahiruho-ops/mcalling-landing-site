import nodemailer from "nodemailer";
import type { Attachment } from "nodemailer/lib/mailer";
import { DateTime } from "luxon";
import {
  getConsultationMeetUrl,
  shouldIncludeGoogleCalendarEventHtmlLink,
} from "./consultation-links";
import { buildConsultationIcs } from "./ics";
import type { BookingReminderCandidate } from "./scheduler-store";

// Email configuration interface
interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  tls: {
    rejectUnauthorized: boolean;
    servername: string;
  };
  name: string;
}

// Email data interface
interface EmailData {
  name: string;
  email: string;
  company?: string;
  message?: string;
  interestType?: string;
  countryCode?: string;
  phone?: string;
  industry?: string;
  primaryUseCase?: string | string[];
  callingDirection?: string;
  monthlyCallingMinutes?: string;
  preferredLanguages?: string | string[];
  goLiveTimeline?: string;
  currentCallingSetup?: string;
  crmTools?: string;
  schedulerBookingRef?: string;
  schedulerSlotStartIso?: string;
  schedulerSlotEndIso?: string;
  schedulerSlotLabel?: string;
  schedulerTimezone?: string;
  schedulerGoogleEventId?: string;
  schedulerGoogleEventHtmlLink?: string;
  schedulerGoogleMeetLink?: string;
  /** Public URL to view booking (requires APP_BASE_URL). */
  bookingManagementUrl?: string;
  /** SMB / enterprise pricing tool context */
  pricingEstimatorSource?: string;
  pricingEstimatorSummary?: string;
  pricingEstimatorJson?: string;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escape plain text for HTML body (emails, admin notifications). */
function h(s: string | undefined | null): string {
  return escapeHtml(s ?? "");
}

/** Escape joined list or string (e.g. use cases, languages). */
function hList(v: string | string[] | undefined | null): string {
  if (v === undefined || v === null) return "";
  const joined = Array.isArray(v) ? v.join(", ") : v;
  return escapeHtml(joined);
}

/** Strip control chars / newlines from user text used in email Subject (header injection / broken subjects). */
function safeEmailSubjectFragment(s: string | undefined): string {
  if (!s || typeof s !== "string") return "Unknown";
  const t = s.replace(/[\r\n\u0000-\u001F\u007F]/g, " ").trim().slice(0, 120);
  return t || "Unknown";
}

const BRAND_WEBSITE_HREF = "https://www.mahiruho.com";
const BRAND_WEBSITE_LABEL = "www.mahiruho.com";

function getOrganizerEmailForIcs(): string {
  const raw =
    process.env.CALENDAR_ORGANIZER_EMAIL?.trim() ||
    process.env.SMTP_FROM?.trim() ||
    process.env.SMTP_USER?.trim() ||
    "";
  const m = raw.match(/<([^>]+)>/);
  const email = (m ? m[1] : raw).trim();
  return email.includes("@") ? email : "noreply@mahiruho.com";
}

function getIcsUidDomain(): string {
  return process.env.ICS_UID_DOMAIN?.trim() || "mahiruho.com";
}

function meetUrlForEmail(data: EmailData): string | undefined {
  return getConsultationMeetUrl(data.schedulerGoogleMeetLink);
}

function buildSchedulerIcsBuffer(data: EmailData): Buffer | null {
  if (!data.schedulerBookingRef || !data.schedulerSlotStartIso || !data.schedulerSlotEndIso) return null;
  const start = new Date(data.schedulerSlotStartIso);
  const end = new Date(data.schedulerSlotEndIso);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return null;

  const organizer = getOrganizerEmailForIcs();
  const admin = process.env.ADMIN_EMAIL?.trim();
  const attendees: Array<{ email: string; cn?: string }> = [{ email: data.email, cn: data.name }];
  if (admin && !attendees.some((a) => a.email.toLowerCase() === admin.toLowerCase())) {
    attendees.push({ email: admin, cn: "Mahiruho" });
  }

  const meetUrl = meetUrlForEmail(data);
  const desc = [
    `Booking reference: ${data.schedulerBookingRef}`,
    meetUrl
      ? `Join Google Meet: ${meetUrl}`
      : "Video: add CONSULTATION_GOOGLE_MEET_URL to your server env for a join link in this file.",
    shouldIncludeGoogleCalendarEventHtmlLink() && data.schedulerGoogleEventHtmlLink
      ? `Organizer calendar link (may require sign-in): ${data.schedulerGoogleEventHtmlLink}`
      : "",
  ];

  const ics = buildConsultationIcs({
    bookingRef: data.schedulerBookingRef,
    uidDomain: getIcsUidDomain(),
    summary: `mKcalling consultation — ${data.name}`,
    descriptionLines: desc,
    location: meetUrl || "Online — see description for Meet link",
    start,
    end,
    organizerEmail: organizer,
    organizerCn: "Mahiruho / mKcalling",
    attendeeEmails: attendees,
    method: "REQUEST",
  });

  return Buffer.from(ics, "utf8");
}

function schedulerAttachments(data: EmailData): Attachment[] {
  const buf = buildSchedulerIcsBuffer(data);
  if (!buf) return [];
  const safeRef = data.schedulerBookingRef!.replace(/[^a-zA-Z0-9-]/g, "-");
  return [
    {
      filename: `mKcalling-consultation-${safeRef}.ics`,
      content: buf,
      contentType: "text/calendar; charset=utf-8; method=REQUEST",
    },
  ];
}

function brandSignatureHtml(): string {
  return `<p>Best regards,<br>
                The Mahiruho Team<br>
                <a href="${BRAND_WEBSITE_HREF}" style="color:#2563eb;text-decoration:none;">${BRAND_WEBSITE_LABEL}</a></p>`;
}

function meetingSectionHtml(data: EmailData): string {
  if (!data.schedulerBookingRef) return "";
  const when = data.schedulerSlotLabel
    ? `${h(data.schedulerSlotLabel)}${data.schedulerTimezone ? ` (${h(data.schedulerTimezone)})` : ""}`
    : h([data.schedulerSlotStartIso, data.schedulerSlotEndIso].filter(Boolean).join(" → "));
  const meetUrl = meetUrlForEmail(data);
  const meetBlock = meetUrl
    ? `<p style="margin:12px 0 0;"><a class="button" href="${h(meetUrl)}">Join Google Meet</a><br><span style="font-size:13px;color:#6b7280;word-break:break-all;">${h(meetUrl)}</span></p>`
    : `<p style="margin-top:12px;color:#4b5563;font-size:14px;">Video: set <strong>CONSULTATION_GOOGLE_MEET_URL</strong> on the server for a shared Meet room, or use the attached <strong>.ics</strong> after Meet is configured.</p>`;
  const calLink =
    shouldIncludeGoogleCalendarEventHtmlLink() && data.schedulerGoogleEventHtmlLink
      ? `<p style="margin-top:8px;font-size:14px;"><a href="${h(data.schedulerGoogleEventHtmlLink)}">Open in Google Calendar</a></p>`
      : "";
  const manage = data.bookingManagementUrl
    ? `<p style="margin-top:8px;font-size:14px;"><a href="${h(data.bookingManagementUrl)}">View your booking</a></p>`
    : "";
  return `
  <div style="background:linear-gradient(135deg,#eff6ff 0%,#ffffff 100%);border:1px solid #bfdbfe;border-radius:8px;padding:20px;margin:24px 0;">
    <div style="font-size:12px;font-weight:600;color:#1d4ed8;text-transform:uppercase;letter-spacing:0.06em;">Your consultation</div>
    <h2 style="margin:8px 0 12px;font-size:20px;color:#1f2937;">Scheduled call</h2>
    <p style="margin:0;font-size:15px;"><strong>When:</strong> ${when}</p>
    ${meetBlock}
    ${calLink}
    ${manage}
    <p style="margin:12px 0 0;font-size:13px;color:#6b7280;">Reference: ${h(data.schedulerBookingRef)}</p>
  </div>`;
}

// Create transporter
const createTransporter = () => {
  const config: EmailConfig = {
    host: process.env.SMTP_HOST!,
    port: parseInt(process.env.SMTP_PORT!),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
    tls: {
      rejectUnauthorized: false,
      servername: process.env.EHLO_DOMAIN!, // This sets the EHLO domain
    },
    name: process.env.EHLO_DOMAIN!,
  };

  return nodemailer.createTransport(config);
};

// HTML template for confirmation email to user
const getConfirmationEmailHTML = (data: EmailData): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Your Interest</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f8f9fa;
            }
            .container {
                background-color: white;
                border-radius: 8px;
                padding: 40px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
            }
            .logo {
                font-size: 24px;
                font-weight: bold;
                color: #2563eb;
                margin-bottom: 10px;
            }
            h1 {
                color: #1f2937;
                margin-bottom: 20px;
            }
            .content {
                margin-bottom: 30px;
            }
            .highlight {
                background-color: #f3f4f6;
                padding: 15px;
                border-radius: 6px;
                border-left: 4px solid #2563eb;
                margin: 20px 0;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                color: #6b7280;
                font-size: 14px;
            }
            .button {
                display: inline-block;
                background-color: #2563eb;
                color: white;
                padding: 12px 24px;
                text-decoration: none;
                border-radius: 6px;
                margin: 20px 0;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">mKcalling AI</div>
                <h1>Thank You for Your Interest!</h1>
            </div>
            
            <div class="content">
                <p>Hi ${h(data.name)},</p>
                
                <p>Thank you for reaching out to us! We've received your interest form submission and are excited to learn more about your project.</p>
                
                ${meetingSectionHtml(data)}
                
                <div class="highlight">
                    <strong>Your submission details:</strong><br>
                    Name: ${h(data.name)}<br>
                    Email: ${h(data.email)}<br>
                    ${data.phone ? `Phone: ${h(data.countryCode)} ${h(data.phone)}<br>` : ''}
                    ${data.company ? `Company: ${h(data.company)}<br>` : ''}
                    ${data.industry ? `Industry: ${h(data.industry)}<br>` : ''}
                    ${data.interestType ? `Interest Type: ${h(data.interestType)}<br>` : ''}
                    ${data.primaryUseCase ? `Primary Use Case: ${hList(data.primaryUseCase)}<br>` : ''}
                    ${data.callingDirection ? `Calling Direction: ${h(data.callingDirection)}<br>` : ''}
                    ${data.monthlyCallingMinutes ? `Estimated Monthly Calling Minutes: ${h(data.monthlyCallingMinutes)}<br>` : ''}
                    ${data.preferredLanguages ? `Preferred Languages: ${hList(data.preferredLanguages)}<br>` : ''}
                    ${data.goLiveTimeline ? `Go-live Timeline: ${h(data.goLiveTimeline)}<br>` : ''}
                    ${data.currentCallingSetup ? `Current Calling Setup: ${h(data.currentCallingSetup)}<br>` : ''}
                    ${data.crmTools ? `CRM / Tools: ${h(data.crmTools)}<br>` : ''}
                    ${data.message ? `<br><strong>Message:</strong><br><span style="white-space:pre-wrap;">${h(data.message)}</span>` : ''}
                    ${data.pricingEstimatorSummary ? `<br><br><strong>Pricing estimator:</strong> We received the selections from your ${data.pricingEstimatorSource === "enterprise" ? "enterprise discovery" : "SMB pricing"} session on our site.` : ""}
                </div>
                ${data.schedulerBookingRef ? `<p style="font-size:14px;color:#4b5563;">A calendar file (<strong>.ics</strong>) is attached — open it to add this meeting to your calendar. You can accept or decline there like any calendar invite.</p>` : `<p>Our team will review your information and get back to you within 24-48 hours. We're looking forward to discussing how mKcalling AI can help with your project!</p>`}
                
                <p>If you have any urgent questions, feel free to reach out to us directly.</p>
                
                ${brandSignatureHtml()}
            </div>
            
            <div class="footer">
                <p>This email was sent to ${h(data.email)} because you submitted an interest form on our website.</p>
                <p>&copy; 2026 Mahiruho Consulting Services Pvt. Ltd. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// HTML template for notification email to admin
const getNotificationEmailHTML = (data: EmailData): string => {
  const meet = meetUrlForEmail(data);
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Interest Form Submission</title>
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f8f9fa;
            }
            .container {
                background-color: white;
                border-radius: 8px;
                padding: 40px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                background-color: #fef3c7;
                padding: 20px;
                border-radius: 6px;
                border-left: 4px solid #f59e0b;
            }
            .alert {
                color: #92400e;
                font-weight: bold;
                font-size: 18px;
            }
            .submission-details {
                background-color: #f9fafb;
                padding: 20px;
                border-radius: 6px;
                margin: 20px 0;
                border: 1px solid #e5e7eb;
            }
            .field {
                margin-bottom: 10px;
            }
            .label {
                font-weight: bold;
                color: #374151;
            }
            .value {
                color: #6b7280;
                margin-left: 10px;
            }
            .timestamp {
                text-align: center;
                color: #6b7280;
                font-size: 14px;
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="alert">🔔 New Interest Form Submission</div>
            </div>
            
            <div class="submission-details">
                <div class="field">
                    <span class="label">Name:</span>
                    <span class="value">${h(data.name)}</span>
                </div>
                <div class="field">
                    <span class="label">Email:</span>
                    <span class="value">${h(data.email)}</span>
                </div>
                ${data.phone ? `
                <div class="field">
                    <span class="label">Phone:</span>
                    <span class="value">${h(data.countryCode)} ${h(data.phone)}</span>
                </div>
                ` : ''}
                ${data.company ? `
                <div class="field">
                    <span class="label">Company:</span>
                    <span class="value">${h(data.company)}</span>
                </div>
                ` : ''}
                ${data.industry ? `
                <div class="field">
                    <span class="label">Industry:</span>
                    <span class="value">${h(data.industry)}</span>
                </div>
                ` : ''}
                ${data.interestType ? `
                <div class="field">
                    <span class="label">Interest Type:</span>
                    <span class="value">${h(data.interestType)}</span>
                </div>
                ` : ''}
                ${data.primaryUseCase ? `
                <div class="field">
                    <span class="label">Primary Use Case:</span>
                    <span class="value">${hList(data.primaryUseCase)}</span>
                </div>
                ` : ''}
                ${data.callingDirection ? `
                <div class="field">
                    <span class="label">Calling Direction:</span>
                    <span class="value">${h(data.callingDirection)}</span>
                </div>
                ` : ''}
                ${data.monthlyCallingMinutes ? `
                <div class="field">
                    <span class="label">Estimated Monthly Calling Minutes:</span>
                    <span class="value">${h(data.monthlyCallingMinutes)}</span>
                </div>
                ` : ''}
                ${data.preferredLanguages ? `
                <div class="field">
                    <span class="label">Preferred Languages:</span>
                    <span class="value">${hList(data.preferredLanguages)}</span>
                </div>
                ` : ''}
                ${data.goLiveTimeline ? `
                <div class="field">
                    <span class="label">Go-live Timeline:</span>
                    <span class="value">${h(data.goLiveTimeline)}</span>
                </div>
                ` : ''}
                ${data.currentCallingSetup ? `
                <div class="field">
                    <span class="label">Current Calling Setup:</span>
                    <span class="value">${h(data.currentCallingSetup)}</span>
                </div>
                ` : ''}
                ${data.crmTools ? `
                <div class="field">
                    <span class="label">CRM / Tools:</span>
                    <span class="value">${h(data.crmTools)}</span>
                </div>
                ` : ''}
                ${data.schedulerSlotLabel ? `
                <div class="field">
                    <span class="label">Consultation Slot:</span>
                    <span class="value">${h(data.schedulerSlotLabel)}${data.schedulerTimezone ? ` (${h(data.schedulerTimezone)})` : ''}</span>
                </div>
                ` : ''}
                ${meet ? `
                <div class="field">
                    <span class="label">Google Meet Link:</span>
                    <span class="value"><a href="${h(meet)}">${h(meet)}</a></span>
                </div>
                ` : ''}
                ${data.schedulerBookingRef ? `
                <div class="field">
                    <span class="label">Booking Reference:</span>
                    <span class="value">${h(data.schedulerBookingRef)}</span>
                </div>
                ` : ''}
                ${data.schedulerGoogleEventId ? `
                <div class="field">
                    <span class="label">Google Event ID:</span>
                    <span class="value">${h(data.schedulerGoogleEventId)}</span>
                </div>
                ` : ''}
                ${shouldIncludeGoogleCalendarEventHtmlLink() && data.schedulerGoogleEventHtmlLink ? `
                <div class="field">
                    <span class="label">Google Calendar Event:</span>
                    <span class="value">${h(data.schedulerGoogleEventHtmlLink)}</span>
                </div>
                ` : ''}
                ${data.message ? `
                <div class="field">
                    <span class="label">Message:</span>
                    <span class="value" style="white-space:pre-wrap;">${h(data.message)}</span>
                </div>
                ` : ''}
                ${data.pricingEstimatorSummary ? `
                <div class="field" style="margin-top:16px;padding-top:16px;border-top:1px solid #e5e7eb;">
                    <span class="label">Pricing estimator (${escapeHtml(data.pricingEstimatorSource || "unknown")}):</span>
                    <pre style="white-space:pre-wrap;font-size:12px;background:#f3f4f6;padding:12px;border-radius:6px;margin-top:8px;">${escapeHtml(data.pricingEstimatorSummary)}</pre>
                </div>
                ` : ''}
                ${data.pricingEstimatorJson ? `
                <div class="field">
                    <span class="label">Full pricing context (JSON):</span>
                    <pre style="white-space:pre-wrap;font-size:11px;background:#1f2937;color:#e5e7eb;padding:12px;border-radius:6px;max-height:320px;overflow:auto;margin-top:8px;">${escapeHtml(data.pricingEstimatorJson)}</pre>
                </div>
                ` : ''}
            </div>
            
            <div style="text-align:center;margin-top:20px;padding-top:16px;border-top:1px solid #e5e7eb;">
                <a href="${BRAND_WEBSITE_HREF}" style="color:#2563eb;text-decoration:none;font-size:14px;">${BRAND_WEBSITE_LABEL}</a>
            </div>
            
            <div class="timestamp">
                Submitted on: ${new Date().toLocaleString('en-US', {
                  timeZone: 'UTC',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })} UTC
            </div>
        </div>
    </body>
    </html>
  `;
};

/** Reminder email (24h / 1h before consultation). Attaches the same ICS pattern as the confirmation email. */
export async function sendConsultationReminderEmail(
  row: BookingReminderCandidate,
  kind: "24h" | "1h",
): Promise<void> {
  const transporter = createTransporter();
  const tz = row.timezone;
  const startLocal = DateTime.fromJSDate(row.slotStart).setZone(tz);
  const endLocal = DateTime.fromJSDate(row.slotEnd).setZone(tz);
  const label = `${startLocal.toFormat("dd LLL yyyy, hh:mm a")} – ${endLocal.toFormat("hh:mm a")}`;

  const meet = getConsultationMeetUrl(row.googleMeetLink);
  const icsPayload: EmailData = {
    name: row.contactName,
    email: row.contactEmail,
    schedulerBookingRef: row.bookingRef,
    schedulerSlotStartIso: row.slotStart.toISOString(),
    schedulerSlotEndIso: row.slotEnd.toISOString(),
    schedulerSlotLabel: label,
    schedulerTimezone: tz,
    schedulerGoogleMeetLink: meet,
    schedulerGoogleEventHtmlLink: row.googleEventHtmlLink ?? undefined,
  };

  const subject =
    kind === "24h"
      ? `Reminder: your mKcalling consultation is tomorrow — ${row.bookingRef}`
      : `Starting in about 1 hour: mKcalling consultation — ${row.bookingRef}`;

  const meetHtml = meet
    ? `<p><a href="${h(meet)}" style="display:inline-block;background:#2563eb;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;">Join Google Meet</a><br><span style="font-size:13px;color:#6b7280;word-break:break-all;">${h(meet)}</span></p>`
    : `<p style="color:#6b7280;font-size:14px;">Set CONSULTATION_GOOGLE_MEET_URL on the server for a Meet link in reminders, or use the attached calendar file for the scheduled time.</p>`;

  const calReminderLine =
    shouldIncludeGoogleCalendarEventHtmlLink() && row.googleEventHtmlLink
      ? `<p><a href="${h(row.googleEventHtmlLink)}">Open in Google Calendar</a></p>`
      : "";

  const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6;color:#333;max-width:600px;margin:0 auto;padding:24px;">
  <p>Hi ${h(row.contactName)},</p>
  <p>${
    kind === "24h"
      ? "This is a reminder about your scheduled mKcalling consultation."
      : "Your mKcalling consultation is scheduled to start in about one hour."
  }</p>
  <div style="background:#f3f4f6;border-radius:8px;padding:16px;margin:16px 0;border-left:4px solid #2563eb;">
    <p style="margin:0;"><strong>When:</strong> ${h(label)} (${h(tz)})</p>
    <p style="margin:8px 0 0;"><strong>Reference:</strong> ${h(row.bookingRef)}</p>
  </div>
  ${meetHtml}
  ${calReminderLine}
  ${brandSignatureHtml()}
</body></html>`;

  await transporter.sendMail({
    from: `"mKcalling AI" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to: row.contactEmail,
    subject,
    html,
    attachments: schedulerAttachments(icsPayload),
    bcc:
      process.env.REMINDER_BCC_ADMIN === "true" && process.env.ADMIN_EMAIL?.trim()
        ? process.env.ADMIN_EMAIL.trim()
        : undefined,
  });
}

// Send confirmation email to user
export const sendConfirmationEmail = async (data: EmailData): Promise<void> => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"mKcalling AI" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: data.email,
      subject: 'Thank You for Your Interest - mKcalling AI',
      html: getConfirmationEmailHTML(data),
      attachments: schedulerAttachments(data),
    };

    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to: ${data.email}`);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw new Error('Failed to send confirmation email');
  }
};

// Send notification email to admin
export const sendNotificationEmail = async (data: EmailData): Promise<void> => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"mkcalling AI" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: `New Interest Form Submission from ${safeEmailSubjectFragment(data.name)}`,
      html: getNotificationEmailHTML(data),
      attachments: schedulerAttachments(data),
    };

    await transporter.sendMail(mailOptions);
    console.log(`Notification email sent to admin: ${process.env.ADMIN_EMAIL || process.env.SMTP_USER}`);
  } catch (error) {
    console.error('Error sending notification email:', error);
    throw new Error('Failed to send notification email');
  }
};

// Send both emails
export const sendInterestFormEmails = async (data: EmailData): Promise<void> => {
  try {
    // Send both emails in parallel for better performance
    await Promise.all([
      sendConfirmationEmail(data),
      sendNotificationEmail(data)
    ]);
    
    console.log('Both confirmation and notification emails sent successfully');
  } catch (error) {
    console.error('Error sending interest form emails:', error);
    throw error;
  }
};
