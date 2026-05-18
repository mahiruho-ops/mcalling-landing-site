import type { SmbEstimateInput, SmbEstimateResult } from "@/lib/pricing-estimate";
import type { PricingContextV1 } from "@/lib/pricing-context";

export interface SmbEstimatePublicConfig {
  channelDidAnnualExGst: number;
  usageCreditValidityMonthsFromGoLive: number;
  taxDisplayRate: number;
}

export interface SmbEstimateApiResponse {
  estimate: SmbEstimateResult;
  pricebookVersion: string;
  publicConfig: SmbEstimatePublicConfig;
  calculatedAt: string;
}

export interface CreateSmbQuoteIntentInput {
  pricing_context: PricingContextV1;
  utm?: Record<string, string>;
}

export interface CreateSmbQuoteIntentResponse {
  quote_intent_id: string;
  claim_token: string;
  expires_at: string;
}

export class BillingApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "BillingApiError";
    this.status = status;
    this.details = details;
  }
}

function getBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_BILLING_API_BASE_URL;
  if (!url || url.trim().length === 0) {
    throw new BillingApiError(
      "Billing API URL is not configured. Set NEXT_PUBLIC_BILLING_API_BASE_URL.",
      500,
    );
  }
  return url.replace(/\/$/, "");
}

interface BillingRequestOptions {
  path: string;
  body: unknown;
  unreachableMessage: string;
  unexpectedMessage: string;
  expectedKeys: string[];
}

async function postBillingApi(options: BillingRequestOptions): Promise<Record<string, unknown>> {
  const baseUrl = getBaseUrl();
  let response: Response;
  try {
    response = await fetch(`${baseUrl}${options.path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options.body),
    });
  } catch (err) {
    throw new BillingApiError(options.unreachableMessage, 0, err);
  }

  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    /* tolerate empty/non-json bodies on errors */
  }

  if (!response.ok) {
    const message =
      (body && typeof body === "object" && "message" in body && typeof (body as { message?: unknown }).message === "string"
        ? (body as { message: string }).message
        : null) ?? `Billing service returned ${response.status}.`;
    throw new BillingApiError(message, response.status, body);
  }

  if (!body || typeof body !== "object" || !("data" in body)) {
    throw new BillingApiError(options.unexpectedMessage, 502, body);
  }
  const data = (body as { data: unknown }).data;
  if (!data || typeof data !== "object") {
    throw new BillingApiError(options.unexpectedMessage, 502, body);
  }
  for (const key of options.expectedKeys) {
    if (!(key in data)) {
      throw new BillingApiError(options.unexpectedMessage, 502, body);
    }
  }
  return data as Record<string, unknown>;
}

export async function calculateSmbEstimate(input: SmbEstimateInput): Promise<SmbEstimateApiResponse> {
  const data = await postBillingApi({
    path: "/v1/estimator/smb/calculate",
    body: input,
    unreachableMessage:
      "Couldn't reach the pricing service. Please check your connection and try again.",
    unexpectedMessage: "Pricing service returned an unexpected response.",
    expectedKeys: ["estimate", "pricebookVersion", "publicConfig", "calculatedAt"],
  });
  return data as unknown as SmbEstimateApiResponse;
}

export async function createSmbQuoteIntent(
  input: CreateSmbQuoteIntentInput,
): Promise<CreateSmbQuoteIntentResponse> {
  const data = await postBillingApi({
    path: "/v1/quote-intents",
    body: input,
    unreachableMessage:
      "Couldn't reach the billing service. Please check your connection and try again.",
    unexpectedMessage: "Billing service returned an unexpected response.",
    expectedKeys: ["quote_intent_id", "claim_token", "expires_at"],
  });
  return data as unknown as CreateSmbQuoteIntentResponse;
}
