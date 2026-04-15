import { NextResponse } from "next/server";
import { runBookingReminderCron } from "@/lib/booking-reminders";

/**
 * Sends 24h and 1h consultation reminders. Protect with CRON_SECRET.
 * Example: curl -H "Authorization: Bearer $CRON_SECRET" https://your-domain/api/cron/booking-reminders
 * Vercel Cron: configure in vercel.json to GET this path on a schedule.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "CRON_SECRET is not configured" }, { status: 503 });
  }
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  try {
    const result = await runBookingReminderCron();
    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    console.error("booking-reminders cron:", e);
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 },
    );
  }
}
