import {
  listBookingsForReminder1h,
  listBookingsForReminder24h,
  markReminder1hSent,
  markReminder24hSent,
} from "./scheduler-store";
import { sendConsultationReminderEmail } from "./email";

export async function runBookingReminderCron(): Promise<{
  sent24h: number;
  sent1h: number;
  errors: string[];
}> {
  const errors: string[] = [];
  let sent24h = 0;
  let sent1h = 0;

  const batch24 = await listBookingsForReminder24h();
  for (const row of batch24) {
    try {
      await sendConsultationReminderEmail(row, "24h");
      await markReminder24hSent(row.bookingId);
      sent24h += 1;
    } catch (e) {
      errors.push(`24h ${row.bookingRef}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  const batch1 = await listBookingsForReminder1h();
  for (const row of batch1) {
    try {
      await sendConsultationReminderEmail(row, "1h");
      await markReminder1hSent(row.bookingId);
      sent1h += 1;
    } catch (e) {
      errors.push(`1h ${row.bookingRef}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }

  return { sent24h, sent1h, errors };
}
