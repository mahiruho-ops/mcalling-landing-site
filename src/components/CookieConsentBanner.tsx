"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const COOKIE_CONSENT_KEY = "mkcalling-cookie-consent";
export const COOKIE_CONSENT_ACCEPTED = "accepted";

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (stored !== COOKIE_CONSENT_ACCEPTED) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, COOKIE_CONSENT_ACCEPTED);
      window.dispatchEvent(new Event("mkcalling-cookie-consent"));
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-[100] border-t border-border bg-card/95 backdrop-blur p-4 md:p-5 shadow-lg"
    >
      <div className="container mx-auto flex flex-col md:flex-row md:items-center gap-4 md:gap-6 max-w-5xl">
        <p className="text-sm text-muted-foreground flex-1 leading-relaxed">
          We use essential cookies for site functionality. With your consent, we also use analytics and marketing
          cookies (such as Meta Pixel) to understand how visitors use our site. See our{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <Button size="sm" onClick={accept} className="bg-gradient-primary">
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
