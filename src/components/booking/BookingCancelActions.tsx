"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Props = {
  token: string;
  status: string;
  rescheduleHref: string;
};

export function BookingCancelActions({ token, status, rescheduleHref }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canCancel = status === "confirmed" || status === "pending" || status === "failed";
  const cancelled = status === "cancelled";

  async function onCancel() {
    if (!canCancel || loading) return;
    if (!confirm("Cancel this consultation? This cannot be undone.")) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/booking/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error === "not_cancellable" ? "This booking can no longer be cancelled." : "Something went wrong.");
        return;
      }
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 space-y-4 border-t border-border pt-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Button asChild variant="outline" size="sm">
          <Link href={rescheduleHref}>Pick a new time</Link>
        </Button>
        {canCancel ? (
          <Button type="button" variant="destructive" size="sm" disabled={loading} onClick={onCancel}>
            {loading ? "Cancelling…" : "Cancel booking"}
          </Button>
        ) : null}
      </div>
      {cancelled ? (
        <p className="text-sm text-muted-foreground">This booking has been cancelled.</p>
      ) : null}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
      <p className="text-sm text-muted-foreground">
        Need help? Use “Pick a new time” to choose another slot, or email us if you prefer a manual change.
      </p>
    </div>
  );
}
