import { randomUUID } from "crypto";
import type { PoolClient } from "pg";
import { deleteGoogleCalendarEvent } from "./google-calendar";
import { dbPool } from "./db";
import type { HoldContact, SlotInterval } from "./scheduler-types";
import { getSchedulerConfig } from "./scheduler-config";

interface HoldSlotInput {
  slotStart: Date;
  slotEnd: Date;
  timezone: string;
  contact: HoldContact;
  holdToken?: string;
}

interface FinalizeBookingInput {
  holdToken: string;
  timezone: string;
  contact: HoldContact;
  interestPayload: Record<string, unknown>;
}

export interface FinalizedBooking {
  bookingId: string;
  bookingRef: string;
  managementToken: string;
  slotStart: Date;
  slotEnd: Date;
  timezone: string;
}

function mapInterval(row: { slot_start: Date; slot_end: Date }): SlotInterval {
  return {
    start: new Date(row.slot_start),
    end: new Date(row.slot_end),
  };
}

function buildBookingRef(): string {
  return `MK-${Date.now().toString(36).toUpperCase()}-${randomUUID().slice(0, 8).toUpperCase()}`;
}

async function lockSlotWindow(client: PoolClient, slotStart: Date, slotEnd: Date) {
  await client.query("SELECT pg_advisory_xact_lock(hashtext($1 || '|' || $2))", [
    slotStart.toISOString(),
    slotEnd.toISOString(),
  ]);
}

export async function getUnavailableIntervals(slotWindowStart: Date, slotWindowEnd: Date): Promise<SlotInterval[]> {
  const holdsRes = await dbPool.query<{ slot_start: Date; slot_end: Date }>(
    `SELECT slot_start, slot_end
     FROM slot_holds
     WHERE status = 'held'
       AND expires_at > NOW()
       AND slot_start < $2
       AND slot_end > $1`,
    [slotWindowStart.toISOString(), slotWindowEnd.toISOString()],
  );

  const bookingsRes = await dbPool.query<{ slot_start: Date; slot_end: Date }>(
    `SELECT slot_start, slot_end
     FROM bookings
     WHERE status IN ('pending', 'confirmed')
       AND slot_start < $2
       AND slot_end > $1`,
    [slotWindowStart.toISOString(), slotWindowEnd.toISOString()],
  );

  return [...holdsRes.rows.map(mapInterval), ...bookingsRes.rows.map(mapInterval)];
}

export async function getBookingByHoldToken(holdToken: string): Promise<{
  bookingId: string;
  bookingRef: string;
  status: string;
  slotStart: Date;
  slotEnd: Date;
  timezone: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactCompany: string;
  googleEventId: string | null;
  googleEventHtmlLink: string | null;
  googleMeetLink: string | null;
  managementToken: string;
} | null> {
  const res = await dbPool.query<{
    id: string;
    booking_ref: string;
    status: string;
    slot_start: Date;
    slot_end: Date;
    timezone: string;
    contact_name: string;
    contact_email: string;
    contact_phone: string;
    contact_company: string;
    google_event_id: string | null;
    google_event_html_link: string | null;
    google_meet_link: string | null;
    management_token: string;
  }>(
    `SELECT id, booking_ref, status, slot_start, slot_end, timezone,
            contact_name, contact_email, contact_phone, contact_company,
            google_event_id, google_event_html_link, google_meet_link,
            management_token
     FROM bookings
     WHERE hold_token = $1`,
    [holdToken],
  );
  if (!res.rowCount) return null;
  const row = res.rows[0];
  return {
    bookingId: row.id,
    bookingRef: row.booking_ref,
    status: row.status,
    slotStart: new Date(row.slot_start),
    slotEnd: new Date(row.slot_end),
    timezone: row.timezone,
    contactName: row.contact_name,
    contactEmail: row.contact_email,
    contactPhone: row.contact_phone,
    contactCompany: row.contact_company,
    googleEventId: row.google_event_id,
    googleEventHtmlLink: row.google_event_html_link,
    googleMeetLink: row.google_meet_link,
    managementToken: row.management_token,
  };
}

export async function createOrRefreshHold(input: HoldSlotInput): Promise<{ holdToken: string; expiresAt: string }> {
  const config = getSchedulerConfig();
  let holdToken = input.holdToken?.trim() || randomUUID();
  const client = await dbPool.connect();
  try {
    await client.query("BEGIN");
    await lockSlotWindow(client, input.slotStart, input.slotEnd);

    // Replacing an existing hold must remove the row: hold_token is UNIQUE and "released"
    // still occupies the key, so UPDATE-to-released + INSERT with same token would violate the constraint.
    if (input.holdToken?.trim()) {
      const prev = input.holdToken.trim();
      const consumed = await client.query(`SELECT 1 FROM bookings WHERE hold_token = $1 LIMIT 1`, [prev]);
      if (consumed.rowCount) {
        // Finalized/failed booking still references this token via FK — cannot DELETE slot_holds row.
        // Issue a fresh token for a new hold attempt.
        holdToken = randomUUID();
      } else {
        await client.query(`DELETE FROM slot_holds WHERE hold_token = $1`, [prev]);
      }
    }

    const overlap = await client.query(
      `SELECT id
       FROM slot_holds
       WHERE status = 'held'
         AND expires_at > NOW()
         AND slot_start < $2
         AND slot_end > $1
       LIMIT 1`,
      [input.slotStart.toISOString(), input.slotEnd.toISOString()],
    );
    if (overlap.rowCount && overlap.rowCount > 0) {
      throw new Error("Selected slot is no longer available");
    }

    const bookingOverlap = await client.query(
      `SELECT id
       FROM bookings
       WHERE status IN ('pending', 'confirmed')
         AND slot_start < $2
         AND slot_end > $1
       LIMIT 1`,
      [input.slotStart.toISOString(), input.slotEnd.toISOString()],
    );
    if (bookingOverlap.rowCount && bookingOverlap.rowCount > 0) {
      throw new Error("Selected slot is no longer available");
    }

    const insertRes = await client.query<{ expires_at: Date }>(
      `INSERT INTO slot_holds (
         hold_token,
         slot_start,
         slot_end,
         timezone,
         contact_name,
         contact_email,
         contact_phone,
         contact_company,
         status,
         expires_at
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'held', NOW() + ($9::text || ' minutes')::interval)
       RETURNING expires_at`,
      [
        holdToken,
        input.slotStart.toISOString(),
        input.slotEnd.toISOString(),
        input.timezone,
        input.contact.name,
        input.contact.email,
        input.contact.phone,
        input.contact.company,
        config.holdMinutes,
      ],
    );

    await client.query(
      `INSERT INTO booking_events (hold_token, event_type, payload)
       VALUES ($1, 'hold_created', $2::jsonb)`,
      [
        holdToken,
        JSON.stringify({
          slotStart: input.slotStart.toISOString(),
          slotEnd: input.slotEnd.toISOString(),
          timezone: input.timezone,
        }),
      ],
    );

    await client.query("COMMIT");

    return {
      holdToken,
      expiresAt: insertRes.rows[0].expires_at.toISOString(),
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function finalizeBookingFromHold(input: FinalizeBookingInput): Promise<FinalizedBooking> {
  const client = await dbPool.connect();
  try {
    await client.query("BEGIN");

    const holdRes = await client.query<{
      slot_start: Date;
      slot_end: Date;
      timezone: string;
      contact_name: string;
      contact_email: string;
      contact_phone: string;
      contact_company: string;
    }>(
      `SELECT slot_start, slot_end, timezone, contact_name, contact_email, contact_phone, contact_company
       FROM slot_holds
       WHERE hold_token = $1
         AND status = 'held'
         AND expires_at > NOW()
       FOR UPDATE`,
      [input.holdToken],
    );
    if (!holdRes.rowCount) {
      throw new Error("Booking hold is missing or expired. Please choose a fresh slot.");
    }

    const hold = holdRes.rows[0];
    if (
      hold.contact_email !== input.contact.email ||
      hold.contact_phone !== input.contact.phone ||
      hold.contact_name !== input.contact.name ||
      hold.contact_company !== input.contact.company
    ) {
      throw new Error("Contact details changed after slot selection. Please choose your slot again.");
    }

    await lockSlotWindow(client, new Date(hold.slot_start), new Date(hold.slot_end));

    const bookingRef = buildBookingRef();
    const bookingInsert = await client.query<{ id: string; management_token: string }>(
      `INSERT INTO bookings (
         booking_ref,
         hold_token,
         slot_start,
         slot_end,
         timezone,
         contact_name,
         contact_email,
         contact_phone,
         contact_company,
         interest_payload,
         status
       )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10::jsonb, 'pending')
       RETURNING id, management_token`,
      [
        bookingRef,
        input.holdToken,
        new Date(hold.slot_start).toISOString(),
        new Date(hold.slot_end).toISOString(),
        hold.timezone,
        hold.contact_name,
        hold.contact_email,
        hold.contact_phone,
        hold.contact_company,
        JSON.stringify(input.interestPayload),
      ],
    );

    await client.query(
      `UPDATE slot_holds
       SET status = 'finalized', updated_at = NOW()
       WHERE hold_token = $1`,
      [input.holdToken],
    );

    await client.query(
      `INSERT INTO booking_events (booking_id, hold_token, event_type, payload)
       VALUES ($1, $2, 'booking_finalized', $3::jsonb)`,
      [
        bookingInsert.rows[0].id,
        input.holdToken,
        JSON.stringify({
          slotStart: new Date(hold.slot_start).toISOString(),
          slotEnd: new Date(hold.slot_end).toISOString(),
        }),
      ],
    );

    await client.query("COMMIT");

    return {
      bookingId: bookingInsert.rows[0].id,
      bookingRef,
      managementToken: bookingInsert.rows[0].management_token,
      slotStart: new Date(hold.slot_start),
      slotEnd: new Date(hold.slot_end),
      timezone: hold.timezone || input.timezone,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export interface BookingForManagementPage {
  bookingRef: string;
  status: string;
  slotStart: Date;
  slotEnd: Date;
  timezone: string;
  contactName: string;
  contactEmail: string;
  googleMeetLink: string | null;
  googleEventHtmlLink: string | null;
}

export type CancelBookingResult =
  | { ok: true; alreadyCancelled?: boolean }
  | { ok: false; error: "not_found" | "not_cancellable" };

/**
 * Cancels a booking from the management token link: updates DB and removes the Google Calendar event when present.
 */
export async function cancelBookingByManagementToken(token: string): Promise<CancelBookingResult> {
  const trimmed = token?.trim();
  if (!trimmed) return { ok: false, error: "not_found" };

  const res = await dbPool.query<{
    id: string;
    status: string;
    google_event_id: string | null;
  }>(`SELECT id, status, google_event_id FROM bookings WHERE management_token = $1`, [trimmed]);

  if (!res.rowCount) return { ok: false, error: "not_found" };

  const row = res.rows[0];
  if (row.status === "cancelled") {
    return { ok: true, alreadyCancelled: true };
  }
  if (row.status !== "confirmed" && row.status !== "pending" && row.status !== "failed") {
    return { ok: false, error: "not_cancellable" };
  }

  if (row.google_event_id) {
    try {
      await deleteGoogleCalendarEvent(row.google_event_id);
    } catch (e) {
      console.error("deleteGoogleCalendarEvent failed (booking still cancelled in DB):", e);
    }
  }

  await dbPool.query(
    `UPDATE bookings
     SET status = 'cancelled',
         google_event_id = NULL,
         google_event_html_link = NULL,
         google_meet_link = NULL,
         updated_at = NOW()
     WHERE id = $1`,
    [row.id],
  );

  await dbPool.query(
    `INSERT INTO booking_events (booking_id, event_type, payload)
     VALUES ($1, 'booking_cancelled', $2::jsonb)`,
    [row.id, JSON.stringify({ source: "management_token" })],
  );

  return { ok: true };
}

export async function getBookingByManagementToken(token: string): Promise<BookingForManagementPage | null> {
  const res = await dbPool.query<{
    booking_ref: string;
    status: string;
    slot_start: Date;
    slot_end: Date;
    timezone: string;
    contact_name: string;
    contact_email: string;
    google_meet_link: string | null;
    google_event_html_link: string | null;
  }>(
    `SELECT booking_ref, status, slot_start, slot_end, timezone,
            contact_name, contact_email, google_meet_link, google_event_html_link
     FROM bookings
     WHERE management_token = $1`,
    [token],
  );
  if (!res.rowCount) return null;
  const row = res.rows[0];
  return {
    bookingRef: row.booking_ref,
    status: row.status,
    slotStart: new Date(row.slot_start),
    slotEnd: new Date(row.slot_end),
    timezone: row.timezone,
    contactName: row.contact_name,
    contactEmail: row.contact_email,
    googleMeetLink: row.google_meet_link,
    googleEventHtmlLink: row.google_event_html_link,
  };
}

export interface BookingReminderCandidate {
  bookingId: string;
  bookingRef: string;
  contactName: string;
  contactEmail: string;
  slotStart: Date;
  slotEnd: Date;
  timezone: string;
  googleMeetLink: string | null;
  googleEventHtmlLink: string | null;
}

export async function listBookingsForReminder24h(): Promise<BookingReminderCandidate[]> {
  const res = await dbPool.query<{
    id: string;
    booking_ref: string;
    contact_name: string;
    contact_email: string;
    slot_start: Date;
    slot_end: Date;
    timezone: string;
    google_meet_link: string | null;
    google_event_html_link: string | null;
  }>(
    `SELECT id, booking_ref, contact_name, contact_email, slot_start, slot_end, timezone,
            google_meet_link, google_event_html_link
     FROM bookings
     WHERE status = 'confirmed'
       AND reminder_24h_sent_at IS NULL
       AND slot_start > NOW()
       AND slot_start >= NOW() + INTERVAL '23 hours 40 minutes'
       AND slot_start <= NOW() + INTERVAL '24 hours 20 minutes'`,
  );
  return res.rows.map((row) => ({
    bookingId: row.id,
    bookingRef: row.booking_ref,
    contactName: row.contact_name,
    contactEmail: row.contact_email,
    slotStart: new Date(row.slot_start),
    slotEnd: new Date(row.slot_end),
    timezone: row.timezone,
    googleMeetLink: row.google_meet_link,
    googleEventHtmlLink: row.google_event_html_link,
  }));
}

export async function listBookingsForReminder1h(): Promise<BookingReminderCandidate[]> {
  const res = await dbPool.query<{
    id: string;
    booking_ref: string;
    contact_name: string;
    contact_email: string;
    slot_start: Date;
    slot_end: Date;
    timezone: string;
    google_meet_link: string | null;
    google_event_html_link: string | null;
  }>(
    `SELECT id, booking_ref, contact_name, contact_email, slot_start, slot_end, timezone,
            google_meet_link, google_event_html_link
     FROM bookings
     WHERE status = 'confirmed'
       AND reminder_1h_sent_at IS NULL
       AND slot_start > NOW()
       AND slot_start >= NOW() + INTERVAL '45 minutes'
       AND slot_start <= NOW() + INTERVAL '75 minutes'`,
  );
  return res.rows.map((row) => ({
    bookingId: row.id,
    bookingRef: row.booking_ref,
    contactName: row.contact_name,
    contactEmail: row.contact_email,
    slotStart: new Date(row.slot_start),
    slotEnd: new Date(row.slot_end),
    timezone: row.timezone,
    googleMeetLink: row.google_meet_link,
    googleEventHtmlLink: row.google_event_html_link,
  }));
}

export async function markReminder24hSent(bookingId: string): Promise<void> {
  await dbPool.query(
    `UPDATE bookings SET reminder_24h_sent_at = NOW(), updated_at = NOW() WHERE id = $1`,
    [bookingId],
  );
}

export async function markReminder1hSent(bookingId: string): Promise<void> {
  await dbPool.query(
    `UPDATE bookings SET reminder_1h_sent_at = NOW(), updated_at = NOW() WHERE id = $1`,
    [bookingId],
  );
}

export async function markBookingAsFailed(bookingId: string, reason: string): Promise<void> {
  await dbPool.query(
    `UPDATE bookings
     SET status = 'failed', updated_at = NOW()
     WHERE id = $1`,
    [bookingId],
  );
  await dbPool.query(
    `INSERT INTO booking_events (booking_id, event_type, payload)
     VALUES ($1, 'booking_failed', $2::jsonb)`,
    [bookingId, JSON.stringify({ reason })],
  );
}

export async function markBookingAsConfirmed(
  bookingId: string,
  googleEvent: { eventId: string; htmlLink: string; meetLink: string | null },
): Promise<void> {
  await dbPool.query(
    `UPDATE bookings
     SET status = 'confirmed',
         google_event_id = $2,
         google_event_html_link = $3,
         google_meet_link = $4,
         updated_at = NOW()
     WHERE id = $1`,
    [bookingId, googleEvent.eventId, googleEvent.htmlLink, googleEvent.meetLink],
  );

  await dbPool.query(
    `INSERT INTO booking_events (booking_id, event_type, payload)
     VALUES ($1, 'booking_confirmed', $2::jsonb)`,
    [bookingId, JSON.stringify(googleEvent)],
  );
}
