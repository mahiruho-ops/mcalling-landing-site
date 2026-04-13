import type { SmbEstimateInput, SmbEstimateResult } from "@/lib/pricing-estimate";
import { formatInr, formatInrRange } from "@/lib/pricing-estimate";

export const PRICING_CONTEXT_STORAGE_KEY = "mkc_pricing_context";
export const PRICING_CONTEXT_VERSION = 1 as const;

export type PricingSource = "smb" | "enterprise";

/** Maps SMB estimator use-case ids to Interest form primary use case checkboxes. */
const SMB_USE_CASE_TO_INTEREST: Record<string, string[]> = {
  lead_qual: ["Sales & Lead Qualification"],
  inbound_support: ["Customer Support & Follow-ups"],
  missed_followup: ["Customer Support & Follow-ups"],
  collections: ["Payment Reminders & Collections"],
  appointments: ["Appointment Booking & Reminders"],
  other: ["Other/Not in this List"],
};

/** Maps enterprise domain values to Interest form primary use cases. */
const ENTERPRISE_DOMAIN_TO_INTEREST: Record<string, string[]> = {
  sales: ["Sales & Lead Qualification"],
  support: ["Customer Support & Follow-ups"],
  collections: ["Payment Reminders & Collections"],
  verification: ["Verification & Onboarding"],
  mixed: ["Other/Not in this List"],
};

const ENTERPRISE_SETUP_TO_CALLING_SETUP: Record<string, string> = {
  human: "In-house calling team",
  outsourced: "Outsourced / BPO",
  crm_manual: "Mixed",
  telephony: "Mixed",
  ai_tools: "Mixed",
};

export function estimatedMinutesHighToFormBucket(high: number): string {
  if (high <= 1500) return "0–1,500";
  if (high <= 3000) return "1,501–3,000";
  if (high <= 5000) return "3,001–5,000";
  if (high <= 10000) return "5,001–10,000";
  if (high <= 20000) return "10,001–20,000";
  return "20,001+";
}

function uniqueInterestUseCases(from: string[][]): string[] {
  return [...new Set(from.flat())];
}

export function smbUseCaseIdsToInterestPrimary(useCaseIds: string[]): string[] {
  const mapped = useCaseIds.map((id) => SMB_USE_CASE_TO_INTEREST[id] ?? []);
  return uniqueInterestUseCases(mapped.length ? mapped : [["Other/Not in this List"]]);
}

export function enterpriseDomainsToInterestPrimary(domainValues: string[]): string[] {
  const mapped = domainValues.map((v) => ENTERPRISE_DOMAIN_TO_INTEREST[v] ?? []);
  return uniqueInterestUseCases(mapped.length ? mapped : [["Other/Not in this List"]]);
}

export interface PricingContextLabelSnapshot {
  dailyVolumeLabel: string;
  useCaseLabels: string[];
  concurrencyLabel: string;
  complexityLabel: string;
  addonLabels: string[];
}

export interface PricingContextV1 {
  version: typeof PRICING_CONTEXT_VERSION;
  source: PricingSource;
  capturedAt: string;
  summaryLines: string[];
  smb?: {
    inputs: SmbEstimateInput;
    result: SmbEstimateResult;
    labels: PricingContextLabelSnapshot;
  };
  enterprise?: {
    inputs: {
      scale: string;
      scaleLabel: string;
      domainValues: string[];
      domainLabels: string[];
      currentSetup: string;
      setupLabel: string;
      integrationIds: string[];
      integrationLabels: string[];
      serviceValues: string[];
      serviceLabels: string[];
    };
  };
  interestFormPrefill: {
    primaryUseCase: string[];
    monthlyCallingMinutes?: string;
    callingDirection?: string;
    currentCallingSetup?: string;
  };
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function parsePricingContext(raw: unknown): PricingContextV1 | null {
  if (!isRecord(raw)) return null;
  if (raw.version !== PRICING_CONTEXT_VERSION) return null;
  if (raw.source !== "smb" && raw.source !== "enterprise") return null;
  if (typeof raw.capturedAt !== "string") return null;
  if (!Array.isArray(raw.summaryLines) || !raw.summaryLines.every((l) => typeof l === "string")) return null;
  if (!isRecord(raw.interestFormPrefill)) return null;
  const pc = raw.interestFormPrefill;
  if (!Array.isArray(pc.primaryUseCase) || !pc.primaryUseCase.every((x) => typeof x === "string")) return null;

  const base: PricingContextV1 = {
    version: PRICING_CONTEXT_VERSION,
    source: raw.source,
    capturedAt: raw.capturedAt,
    summaryLines: raw.summaryLines,
    interestFormPrefill: {
      primaryUseCase: pc.primaryUseCase as string[],
      monthlyCallingMinutes: typeof pc.monthlyCallingMinutes === "string" ? pc.monthlyCallingMinutes : undefined,
      callingDirection: typeof pc.callingDirection === "string" ? pc.callingDirection : undefined,
      currentCallingSetup: typeof pc.currentCallingSetup === "string" ? pc.currentCallingSetup : undefined,
    },
  };

  if (raw.source === "smb" && isRecord(raw.smb)) {
    const sm = raw.smb as Record<string, unknown>;
    if (!isRecord(sm.inputs) || !isRecord(sm.result) || !isRecord(sm.labels)) return null;
    base.smb = {
      inputs: sm.inputs as unknown as SmbEstimateInput,
      result: sm.result as unknown as SmbEstimateResult,
      labels: sm.labels as unknown as PricingContextLabelSnapshot,
    };
  } else if (raw.source === "enterprise" && isRecord(raw.enterprise)) {
    base.enterprise = raw.enterprise as unknown as PricingContextV1["enterprise"];
  } else {
    return null;
  }

  return base;
}

export function readPricingContextFromStorage(): PricingContextV1 | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PRICING_CONTEXT_STORAGE_KEY);
    if (!raw) return null;
    return parsePricingContext(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function writePricingContextToStorage(ctx: PricingContextV1): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PRICING_CONTEXT_STORAGE_KEY, JSON.stringify(ctx));
  } catch (e) {
    console.error("pricing context: failed to write localStorage", e);
  }
}

export function clearPricingContextFromStorage(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(PRICING_CONTEXT_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

function buildSmbSummaryLines(args: {
  labels: PricingContextLabelSnapshot;
  result: SmbEstimateResult;
}): string[] {
  const { labels, result } = args;
  const lines: string[] = [
    `Source: SMB pricing estimator`,
    `Daily call volume: ${labels.dailyVolumeLabel}`,
    `Use cases: ${labels.useCaseLabels.join("; ")}`,
    `Concurrent paths: ${labels.concurrencyLabel}`,
    `Avg. call duration: ${result.avgCallDurationMin} min`,
    `Complexity: ${labels.complexityLabel}`,
    `Add-ons: ${labels.addonLabels.length ? labels.addonLabels.join("; ") : "None"}`,
    `Recommended tier: ${result.tier}`,
    `Est. connected minutes / month: ${result.minutesLow.toLocaleString("en-IN")} – ${result.minutesHigh.toLocaleString("en-IN")}`,
    `Typical all-in monthly (ex-GST): ${formatInrRange(result.typicalMonthlyExGstLow, result.typicalMonthlyExGstHigh)}`,
    `Indicative first year (ex-GST): ${formatInrRange(result.firstYearExGstLow, result.firstYearExGstHigh)}`,
    `One-time setup (ex-GST): ${formatInr(result.setupOneTimeExGst)}`,
  ];
  return lines;
}

export function buildAndSaveSmbPricingContext(args: {
  inputs: SmbEstimateInput;
  result: SmbEstimateResult;
  labels: PricingContextLabelSnapshot;
}): void {
  const { inputs, result, labels } = args;
  const summaryLines = buildSmbSummaryLines({ labels, result });
  const interestFormPrefill: PricingContextV1["interestFormPrefill"] = {
    primaryUseCase: smbUseCaseIdsToInterestPrimary(inputs.useCases),
    monthlyCallingMinutes: estimatedMinutesHighToFormBucket(result.minutesHigh),
    callingDirection: "Both",
    currentCallingSetup: undefined,
  };
  const ctx: PricingContextV1 = {
    version: PRICING_CONTEXT_VERSION,
    source: "smb",
    capturedAt: new Date().toISOString(),
    summaryLines,
    smb: { inputs, result, labels },
    interestFormPrefill,
  };
  writePricingContextToStorage(ctx);
}

function buildEnterpriseSummaryLines(args: PricingContextV1["enterprise"]): string[] {
  if (!args) return [];
  const {
    scaleLabel,
    domainLabels,
    setupLabel,
    integrationLabels,
    serviceLabels,
  } = args.inputs;
  return [
    `Source: Enterprise discovery form`,
    `Likely scale: ${scaleLabel}`,
    `Use case domains: ${domainLabels.length ? domainLabels.join("; ") : "—"}`,
    `Current setup: ${setupLabel}`,
    `Integration depth: ${integrationLabels.length ? integrationLabels.join("; ") : "None selected"}`,
    `Service expectations: ${serviceLabels.length ? serviceLabels.join("; ") : "—"}`,
  ];
}

export function buildAndSaveEnterprisePricingContext(args: {
  scale: string;
  scaleLabel: string;
  domainValues: string[];
  domainLabels: string[];
  currentSetup: string;
  setupLabel: string;
  integrationIds: string[];
  integrationLabels: string[];
  serviceValues: string[];
  serviceLabels: string[];
}): void {
  const enterprise: PricingContextV1["enterprise"] = {
    inputs: {
      scale: args.scale,
      scaleLabel: args.scaleLabel,
      domainValues: args.domainValues,
      domainLabels: args.domainLabels,
      currentSetup: args.currentSetup,
      setupLabel: args.setupLabel,
      integrationIds: args.integrationIds,
      integrationLabels: args.integrationLabels,
      serviceValues: args.serviceValues,
      serviceLabels: args.serviceLabels,
    },
  };
  const summaryLines = buildEnterpriseSummaryLines(enterprise);
  const setupMap = ENTERPRISE_SETUP_TO_CALLING_SETUP[args.currentSetup];
  const ctx: PricingContextV1 = {
    version: PRICING_CONTEXT_VERSION,
    source: "enterprise",
    capturedAt: new Date().toISOString(),
    summaryLines,
    enterprise,
    interestFormPrefill: {
      primaryUseCase: enterpriseDomainsToInterestPrimary(args.domainValues),
      monthlyCallingMinutes: undefined,
      callingDirection: "Both",
      currentCallingSetup: setupMap,
    },
  };
  writePricingContextToStorage(ctx);
}
