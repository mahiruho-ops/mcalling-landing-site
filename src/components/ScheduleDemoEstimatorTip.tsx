"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { readPricingContextFromStorage } from "@/lib/pricing-context";

/**
 * Soft nudge to run the pricing estimators when no saved context (shared across tabs via localStorage).
 */
export function ScheduleDemoEstimatorTip() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(readPricingContextFromStorage() === null);
  }, []);

  if (!show) return null;

  return (
    <div className="mb-10 rounded-xl border border-primary/25 bg-primary/5 px-4 py-3 text-center text-sm text-muted-foreground max-w-3xl mx-auto">
      <span className="text-foreground font-medium">Tip:</span> Running the{" "}
      <Link href="/pricing" className="text-primary underline-offset-4 hover:underline font-medium">
        pricing estimator
      </Link>{" "}
      first gives you indicative numbers and makes your consultation more productive — you can still book below without it.
    </div>
  );
}
