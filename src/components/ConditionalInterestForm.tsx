"use client";

import { usePathname } from "next/navigation";
import { InterestForm } from "@/components/InterestForm";

/** Hides the floating interest form on booking management pages. */
export function ConditionalInterestForm() {
  const pathname = usePathname();
  if (pathname?.startsWith("/booking")) {
    return null;
  }
  return <InterestForm />;
}
