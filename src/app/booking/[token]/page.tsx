import { DateTime } from "luxon";
import Link from "next/link";
import type { Metadata } from "next";
import { getConsultationMeetUrl } from "@/lib/consultation-links";
import { getBookingByManagementToken } from "@/lib/scheduler-store";
import { BookingCancelActions } from "@/components/booking/BookingCancelActions";

type PageProps = { params: Promise<{ token: string }> };

export const metadata: Metadata = {
  title: "Your consultation booking",
  robots: { index: false, follow: false },
};

export default async function BookingManagementPage({ params }: PageProps) {
  const { token } = await params;
  const supportEmail =
    process.env.SUPPORT_EMAIL?.trim() || process.env.ADMIN_EMAIL?.trim() || "hello@mahiruho.com";
  const booking = await getBookingByManagementToken(token);

  if (!booking) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="text-xl font-semibold text-foreground">Link not found</h1>
        <p className="mt-2 text-muted-foreground">This booking link is invalid or no longer available.</p>
        <Link href="/schedule-demo" className="mt-6 inline-block text-primary underline">
          Schedule a demo
        </Link>
      </div>
    );
  }

  const start = DateTime.fromJSDate(booking.slotStart).setZone(booking.timezone);
  const end = DateTime.fromJSDate(booking.slotEnd).setZone(booking.timezone);
  const label = `${start.toFormat("dd LLL yyyy, hh:mm a")} – ${end.toFormat("hh:mm a")}`;
  const meetUrl = getConsultationMeetUrl(booking.googleMeetLink);

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">Your consultation</h1>
      <p className="mt-1 text-sm text-muted-foreground">Reference {booking.bookingRef}</p>

      <div className="mt-8 rounded-lg border border-border bg-card p-6 shadow-sm">
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="font-medium text-foreground">When</dt>
            <dd className="text-muted-foreground">
              {label} ({booking.timezone})
            </dd>
          </div>
          <div>
            <dt className="font-medium text-foreground">Status</dt>
            <dd className="capitalize text-muted-foreground">{booking.status}</dd>
          </div>
          {meetUrl ? (
            <div>
              <dt className="font-medium text-foreground">Google Meet</dt>
              <dd>
                <a
                  href={meetUrl}
                  className="break-all text-primary underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {meetUrl}
                </a>
              </dd>
            </div>
          ) : null}
        </dl>
      </div>

      <BookingCancelActions
        token={token}
        status={booking.status}
        rescheduleHref={`/schedule-demo?ref=${encodeURIComponent(booking.bookingRef)}`}
      />

      <p className="mt-6 text-sm text-muted-foreground">
        Questions? Reply to your confirmation email or contact{" "}
        <a href={`mailto:${supportEmail}`} className="text-primary underline">
          {supportEmail}
        </a>
        .
      </p>

      <p className="mt-4 text-sm">
        <a href="https://www.mahiruho.com" className="text-primary underline" target="_blank" rel="noopener noreferrer">
          www.mahiruho.com
        </a>
      </p>
    </div>
  );
}
