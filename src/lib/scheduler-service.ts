import { DateTime } from "luxon";
import { createGoogleCalendarEventWithMeet, getGoogleFreeBusy } from "./google-calendar";
import { getSchedulerConfig } from "./scheduler-config";
import {
  buildSlotsForDate,
  filterUnavailableSlots,
  getEarliestBookableInstant,
  getEarliestSelectableDateString,
} from "./scheduler-slots";
import {
  createOrRefreshHold,
  finalizeBookingFromHold,
  getBookingByHoldToken,
  getUnavailableIntervals,
  markBookingAsConfirmed,
  markBookingAsFailed,
} from "./scheduler-store";
import { shouldIncludeBookingManagementLink } from "./consultation-links";
import type { FinalizedBooking } from "./scheduler-store";
import type { HoldContact } from "./scheduler-types";

function buildSchedulerBookingReturn(
  bookingRef: string,
  slotStart: Date,
  slotEnd: Date,
  timezone: string,
  googleEventId: string,
  googleEventHtmlLink: string,
  googleMeetLink: string | null,
  managementToken: string,
) {
  const startLocal = DateTime.fromJSDate(slotStart).setZone(timezone);
  const endLocal = DateTime.fromJSDate(slotEnd).setZone(timezone);
  const baseUrl = process.env.APP_BASE_URL?.replace(/\/$/, "") ?? "";
  const bookingManagementUrl =
    shouldIncludeBookingManagementLink() && baseUrl ? `${baseUrl}/booking/${managementToken}` : undefined;
  return {
    bookingRef,
    managementToken,
    bookingManagementUrl,
    slotStartIso: slotStart.toISOString(),
    slotEndIso: slotEnd.toISOString(),
    slotLabel: `${startLocal.toFormat("dd LLL yyyy, hh:mm a")} - ${endLocal.toFormat("hh:mm a")}`,
    timezone,
    googleEventId,
    googleEventHtmlLink,
    googleMeetLink,
  };
}

export interface SchedulerSlotResponse {
  startIso: string;
  endIso: string;
  label: string;
}

export async function listAvailableSlotsForDate(date: string): Promise<SchedulerSlotResponse[]> {
  const config = getSchedulerConfig();
  const candidateSlots = buildSlotsForDate(date);
  if (!candidateSlots.length) return [];

  const dayStart = DateTime.fromISO(date, { zone: config.timezone }).startOf("day");
  const dayEnd = dayStart.endOf("day");

  const [dbUnavailable, googleBusy] = await Promise.all([
    getUnavailableIntervals(dayStart.toUTC().toJSDate(), dayEnd.toUTC().toJSDate()),
    getGoogleFreeBusy(dayStart.toUTC().toJSDate(), dayEnd.toUTC().toJSDate()),
  ]);
  const slots = filterUnavailableSlots(candidateSlots, [...dbUnavailable, ...googleBusy]);

  return slots.map((slot) => ({
    startIso: slot.start.toISOString(),
    endIso: slot.end.toISOString(),
    label: slot.label,
  }));
}

export function getSchedulerBoundsPayload() {
  const config = getSchedulerConfig();
  const now = new Date();
  return {
    timezone: config.timezone,
    leadBusinessDays: config.leadBusinessDays,
    earliestSelectableDate: getEarliestSelectableDateString(now, config),
    earliestBookableStartIso: getEarliestBookableInstant(now, config).toISOString(),
  };
}

export async function holdSlot(input: {
  slotStartIso: string;
  slotEndIso: string;
  timezone: string;
  contact: HoldContact;
  holdToken?: string;
}) {
  const config = getSchedulerConfig();
  const slotStart = new Date(input.slotStartIso);
  const slotEnd = new Date(input.slotEndIso);
  if (Number.isNaN(slotStart.getTime()) || Number.isNaN(slotEnd.getTime()) || slotStart >= slotEnd) {
    throw new Error("Invalid slot timing selected");
  }

  const earliest = getEarliestBookableInstant(new Date(), config);
  if (slotStart < earliest) {
    throw new Error("Selected slot is outside the allowed booking window (lead time)");
  }

  const [dbUnavailable, googleBusy] = await Promise.all([
    getUnavailableIntervals(slotStart, slotEnd),
    getGoogleFreeBusy(slotStart, slotEnd),
  ]);
  if ([...dbUnavailable, ...googleBusy].some((x) => x.start < slotEnd && x.end > slotStart)) {
    throw new Error("Selected slot is no longer available");
  }

  return createOrRefreshHold({
    slotStart,
    slotEnd,
    timezone: input.timezone,
    contact: input.contact,
    holdToken: input.holdToken,
  });
}

export async function finalizeSlotAndCreateMeeting(input: {
  holdToken: string;
  timezone: string;
  contact: HoldContact;
  interestPayload: Record<string, unknown>;
}) {
  const existing = await getBookingByHoldToken(input.holdToken);

  if (existing) {
    if (
      existing.contactEmail !== input.contact.email ||
      existing.contactPhone !== input.contact.phone ||
      existing.contactName !== input.contact.name ||
      existing.contactCompany !== input.contact.company
    ) {
      throw new Error("Contact details changed after slot selection. Please choose your slot again.");
    }

    if (existing.status === "cancelled") {
      throw new Error("This booking was cancelled. Please choose a new slot.");
    }

    if (existing.status === "confirmed") {
      return buildSchedulerBookingReturn(
        existing.bookingRef,
        existing.slotStart,
        existing.slotEnd,
        input.timezone,
        existing.googleEventId ?? "",
        existing.googleEventHtmlLink ?? "",
        existing.googleMeetLink,
        existing.managementToken,
      );
    }

    if (existing.status === "pending" && existing.googleEventId) {
      await markBookingAsConfirmed(existing.bookingId, {
        eventId: existing.googleEventId,
        htmlLink: existing.googleEventHtmlLink ?? "",
        meetLink: existing.googleMeetLink,
      });
      return buildSchedulerBookingReturn(
        existing.bookingRef,
        existing.slotStart,
        existing.slotEnd,
        input.timezone,
        existing.googleEventId,
        existing.googleEventHtmlLink ?? "",
        existing.googleMeetLink,
        existing.managementToken,
      );
    }

    if (existing.status !== "pending" && existing.status !== "failed") {
      throw new Error("This slot booking is in an unexpected state. Please refresh and choose a slot again.");
    }
  }

  let booking: FinalizedBooking;
  if (existing) {
    booking = {
      bookingId: existing.bookingId,
      bookingRef: existing.bookingRef,
      managementToken: existing.managementToken,
      slotStart: existing.slotStart,
      slotEnd: existing.slotEnd,
      timezone: existing.timezone,
    };
  } else {
    booking = await finalizeBookingFromHold(input);
  }

  const inviteEmails = [input.contact.email, process.env.ADMIN_EMAIL]
    .map((e) => (typeof e === "string" ? e.trim() : ""))
    .filter((e) => e.includes("@"));

  try {
    const googleEvent = await createGoogleCalendarEventWithMeet({
      summary: `mKcalling Consultation - ${input.contact.name}`,
      description: [
        `Booking Reference: ${booking.bookingRef}`,
        `Name: ${input.contact.name}`,
        `Email: ${input.contact.email}`,
        `Phone: ${input.contact.phone}`,
        `Company: ${input.contact.company}`,
      ].join("\n"),
      timezone: input.timezone,
      start: booking.slotStart,
      end: booking.slotEnd,
      attendeeEmails: inviteEmails,
    });

    await markBookingAsConfirmed(booking.bookingId, googleEvent);

    return buildSchedulerBookingReturn(
      booking.bookingRef,
      booking.slotStart,
      booking.slotEnd,
      input.timezone,
      googleEvent.eventId,
      googleEvent.htmlLink,
      googleEvent.meetLink,
      booking.managementToken,
    );
  } catch (error) {
    await markBookingAsFailed(
      booking.bookingId,
      error instanceof Error ? error.message : "Failed creating Google calendar event",
    );
    throw error;
  }
}
