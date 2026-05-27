"use client";

import { useEffect, useState } from "react";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import MetaPixel from "@/components/MetaPixel";
import { COOKIE_CONSENT_ACCEPTED, COOKIE_CONSENT_KEY } from "@/components/CookieConsentBanner";

type Props = {
  gaId?: string;
  metaPixelId?: string;
};

export function AnalyticsWithConsent({ gaId, metaPixelId }: Props) {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    function read() {
      try {
        setConsented(localStorage.getItem(COOKIE_CONSENT_KEY) === COOKIE_CONSENT_ACCEPTED);
      } catch {
        setConsented(false);
      }
    }
    read();
    window.addEventListener("mkcalling-cookie-consent", read);
    return () => window.removeEventListener("mkcalling-cookie-consent", read);
  }, []);

  if (!consented) return null;

  return (
    <>
      {gaId ? <GoogleAnalytics measurementId={gaId} /> : null}
      {metaPixelId ? <MetaPixel pixelId={metaPixelId} /> : null}
    </>
  );
}
