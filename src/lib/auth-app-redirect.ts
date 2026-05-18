import { BillingApiError } from "@/lib/billing-api-client";

/**
 * Post-auth destination on the calling app where the quote-intent claim happens.
 * Owned by the calling-app frontend (Phase-1 §3.5 step 2). Kept here as a
 * constant so the contract is explicit in one place.
 */
const CALLING_APP_CLAIM_PATH = "/business/billing/claim";

function getAuthAppBaseUrl(): string {
  // Next.js only inlines NEXT_PUBLIC_* with literal property access; do NOT
  // refactor this into a helper that uses process.env[name].
  const url = process.env.NEXT_PUBLIC_AUTH_APP_BASE_URL;
  if (!url || url.trim().length === 0) {
    throw new BillingApiError(
      "Sign-up destination is not configured. Set NEXT_PUBLIC_AUTH_APP_BASE_URL.",
      500,
    );
  }
  return url.replace(/\/$/, "");
}

function getCallingAppBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_CALLING_APP_BASE_URL;
  if (!url || url.trim().length === 0) {
    throw new BillingApiError(
      "Calling app URL is not configured. Set NEXT_PUBLIC_CALLING_APP_BASE_URL.",
      500,
    );
  }
  return url.replace(/\/$/, "");
}

function buildClaimUrl(args: { quoteIntentId: string; claimToken: string }): string {
  const base = getCallingAppBaseUrl();
  const params = new URLSearchParams({
    quote_intent_id: args.quoteIntentId,
    claim_token: args.claimToken,
  });
  return `${base}${CALLING_APP_CLAIM_PATH}?${params.toString()}`;
}

/**
 * Build the auth-app signup URL with a single opaque `redirect` param that
 * carries the calling-app claim destination. Auth-app validates `redirect`
 * against an allowlist (see docs/auth-app-redirect-contract.md) and forwards
 * the user there after successful signup / login.
 */
export function buildSignupUrl(args: { quoteIntentId: string; claimToken: string }): string {
  const authBase = getAuthAppBaseUrl();
  const claimUrl = buildClaimUrl(args);
  const params = new URLSearchParams({ redirect: claimUrl });
  return `${authBase}/signup?${params.toString()}`;
}
