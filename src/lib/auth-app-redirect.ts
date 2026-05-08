import { BillingApiError } from "@/lib/billing-api-client";

function getAuthAppBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_AUTH_APP_BASE_URL;
  if (!url || url.trim().length === 0) {
    throw new BillingApiError(
      "Sign-up destination is not configured. Set NEXT_PUBLIC_AUTH_APP_BASE_URL.",
      500,
    );
  }
  return url.replace(/\/$/, "");
}

export function buildSignupUrl(args: { quoteIntentId: string; claimToken: string }): string {
  const base = getAuthAppBaseUrl();
  const params = new URLSearchParams({
    quote_intent_id: args.quoteIntentId,
    claim_token: args.claimToken,
  });
  return `${base}/signup?${params.toString()}`;
}
