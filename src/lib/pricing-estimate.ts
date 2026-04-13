/**
 * SMB pricing estimates: bundled channel+DID (annual, ex-GST), tiered usage (₹/min ex-GST),
 * and one-time setup from use-case count, complexity, and add-ons.
 */

export type SmbDailyVolume = "lt100" | "v100_250" | "v250_500" | "v500p";
export type SmbConcurrency = "1" | "2" | "3" | "4" | "unsure";
export type SmbComplexity = "basic" | "standard" | "advanced";

/** Per concurrent path: 1 channel + 1 DID bundled, billed annually (ex-GST). */
export const SMB_CHANNEL_DID_ANNUAL_EX_GST = 28_500;

/** GST rate shown in copy; invoice line is handled at billing time. */
export const SMB_GST_RATE = 0.18;

export const SMB_PER_MIN_EX_GST: Record<"Starter" | "Growth" | "Scale", number> = {
  Starter: 7,
  Growth: 6,
  Scale: 5,
};

/** Calendar days for estimated monthly connected minutes. */
export const SMB_DAYS_PER_MONTH = 30;

/** Usage credit from setup applies for this many months after go-live (commercial / UI term). */
export const SMB_USAGE_CREDIT_VALIDITY_MONTHS_FROM_GOLIVE = 3;

export interface SmbEstimateInput {
  dailyVolume: SmbDailyVolume;
  /** Selected use-case ids (at least one in UI). */
  useCases: string[];
  concurrency: SmbConcurrency;
  /** Average handle time in minutes (1–15, step 0.5). */
  avgCallDurationMin: number;
  complexity: SmbComplexity;
  addons: string[];
}

export interface SmbEstimateResult {
  tier: "Starter" | "Growth" | "Scale";
  effectiveConcurrency: number;
  inferredConcurrency: boolean;
  showLowVolumeNote: boolean;
  integrationLikely: boolean;
  tierBlurb: string;
  perMinuteExGst: number;
  /** Estimated connected minutes / month from daily volume range × duration × 30 days. */
  minutesLow: number;
  minutesHigh: number;
  avgCallDurationMin: number;
  /** One-time setup (ex-GST), rounded. */
  setupOneTimeExGst: number;
  /** N × annual bundle (ex-GST). */
  channelAnnualExGst: number;
  /** channelAnnualExGst / 12 — for “monthly equivalent” copy. */
  channelMonthlyEquivExGst: number;
  /** usage = minutes × perMinute, range from minutes low/high. */
  usageMonthlyLowExGst: number;
  usageMonthlyHighExGst: number;
  /** setup + channel annual + 12 × usage range. */
  firstYearExGstLow: number;
  firstYearExGstHigh: number;
  /** channel annual + 12 × usage (no setup). */
  ongoingYearExGstLow: number;
  ongoingYearExGstHigh: number;
  /** channelMonthlyEquiv + usage (typical monthly cash view, ex-GST). */
  typicalMonthlyExGstLow: number;
  typicalMonthlyExGstHigh: number;
  /**
   * Connected minutes of usage credit from one-time setup at tier per-minute rate (floor).
   * Valued at perMinuteExGst (ex-GST).
   */
  freeConnectedMinutesFromSetup: number;
}

const TIER_COPY: Record<SmbEstimateResult["tier"], string> = {
  Starter: "Best for teams starting with one focused AI calling workflow.",
  Growth: "Best for growing teams that need reliable automation across regular call flow.",
  Scale: "Best for operations that need broader automation, higher concurrency, and optimization.",
};

export function inferConcurrencyFromVolume(daily: SmbDailyVolume): 1 | 2 | 3 | 4 {
  switch (daily) {
    case "lt100":
      return 1;
    case "v100_250":
      return 2;
    case "v250_500":
      return 3;
    case "v500p":
      return 4;
  }
}

/** Inclusive daily call count range implied by the volume bucket. */
export function dailyCallsRange(daily: SmbDailyVolume): { low: number; high: number } {
  switch (daily) {
    case "lt100":
      return { low: 25, high: 99 };
    case "v100_250":
      return { low: 100, high: 250 };
    case "v250_500":
      return { low: 250, high: 500 };
    case "v500p":
      return { low: 500, high: 2000 };
  }
}

export function estimatedMonthlyMinutesRange(
  daily: SmbDailyVolume,
  avgCallDurationMin: number,
): { low: number; high: number } {
  const { low, high } = dailyCallsRange(daily);
  const d = Math.min(15, Math.max(1, avgCallDurationMin));
  const lowM = Math.round(low * d * SMB_DAYS_PER_MONTH);
  const highM = Math.round(high * d * SMB_DAYS_PER_MONTH);
  return { low: lowM, high: Math.max(lowM, highM) };
}

function roundTo500(n: number): number {
  return Math.round(n / 500) * 500;
}

function midpointMinutes(low: number, high: number): number {
  return (low + high) / 2;
}

function minutesScore(mid: number): number {
  if (mid < 3750) return 8;
  if (mid < 7500) return 18;
  if (mid < 15_000) return 32;
  return 48;
}

function computeSetupOneTimeExGst(
  tier: SmbEstimateResult["tier"],
  useCaseCount: number,
  complexity: SmbComplexity,
  addonCount: number,
): number {
  const base = { Starter: 10_000, Growth: 17_500, Scale: 28_000 }[tier];
  const n = Math.max(1, useCaseCount);
  const extraUseCases = (n - 1) * 6500;
  const complexityAdd =
    complexity === "basic" ? 0 : complexity === "standard" ? 7500 : 18_500;
  const addonAdd = addonCount * 4500;
  return roundTo500(base + extraUseCases + complexityAdd + addonAdd);
}

export function computeSmbEstimate(input: SmbEstimateInput): SmbEstimateResult {
  const inferredConcurrency = input.concurrency === "unsure";
  const effectiveConcurrency = inferredConcurrency
    ? inferConcurrencyFromVolume(input.dailyVolume)
    : (parseInt(input.concurrency, 10) as 1 | 2 | 3 | 4);

  const useCaseCount = Math.max(1, input.useCases.length);

  const duration = Math.min(15, Math.max(1, input.avgCallDurationMin));
  const { low: minutesLow, high: minutesHigh } = estimatedMonthlyMinutesRange(input.dailyVolume, duration);
  const midMin = midpointMinutes(minutesLow, minutesHigh);

  let score = 0;
  switch (input.dailyVolume) {
    case "lt100":
      score += 12;
      break;
    case "v100_250":
      score += 28;
      break;
    case "v250_500":
      score += 44;
      break;
    case "v500p":
      score += 58;
      break;
  }

  switch (input.complexity) {
    case "basic":
      score += 12;
      break;
    case "standard":
      score += 28;
      break;
    case "advanced":
      score += 48;
      break;
  }

  switch (effectiveConcurrency) {
    case 1:
      score += 8;
      break;
    case 2:
      score += 22;
      break;
    case 3:
      score += 34;
      break;
    case 4:
      score += 46;
      break;
  }

  score += minutesScore(midMin);
  score += Math.min(useCaseCount, 6) * 7;
  score += input.addons.length * 10;

  let tier: SmbEstimateResult["tier"];
  if (score < 52) tier = "Starter";
  else if (score < 95) tier = "Growth";
  else tier = "Scale";

  const perMinuteExGst = SMB_PER_MIN_EX_GST[tier];
  const setupOneTimeExGst = computeSetupOneTimeExGst(tier, useCaseCount, input.complexity, input.addons.length);
  const freeConnectedMinutesFromSetup =
    perMinuteExGst > 0 ? Math.floor(setupOneTimeExGst / perMinuteExGst) : 0;

  const channelAnnualExGst = effectiveConcurrency * SMB_CHANNEL_DID_ANNUAL_EX_GST;
  const channelMonthlyEquivExGst = channelAnnualExGst / 12;

  const usageMonthlyLowExGst = minutesLow * perMinuteExGst;
  const usageMonthlyHighExGst = minutesHigh * perMinuteExGst;

  const rawTypicalMonthlyLow = channelMonthlyEquivExGst + usageMonthlyLowExGst;
  const rawTypicalMonthlyHigh = channelMonthlyEquivExGst + usageMonthlyHighExGst;

  const ongoingYearExGstLow = channelAnnualExGst + usageMonthlyLowExGst * 12;
  const ongoingYearExGstHigh = channelAnnualExGst + usageMonthlyHighExGst * 12;

  const firstYearExGstLow = setupOneTimeExGst + ongoingYearExGstLow;
  const firstYearExGstHigh = setupOneTimeExGst + ongoingYearExGstHigh;

  const integrationLikely =
    input.addons.includes("crm") ||
    input.addons.includes("custom_workflow") ||
    input.addons.includes("org_ai_consultation");

  return {
    tier,
    effectiveConcurrency,
    inferredConcurrency,
    showLowVolumeNote: input.dailyVolume === "lt100",
    integrationLikely,
    tierBlurb: TIER_COPY[tier],
    perMinuteExGst,
    minutesLow,
    minutesHigh,
    avgCallDurationMin: duration,
    setupOneTimeExGst,
    channelAnnualExGst,
    channelMonthlyEquivExGst,
    usageMonthlyLowExGst,
    usageMonthlyHighExGst,
    firstYearExGstLow: roundTo500(firstYearExGstLow),
    firstYearExGstHigh: roundTo500(firstYearExGstHigh),
    ongoingYearExGstLow: roundTo500(ongoingYearExGstLow),
    ongoingYearExGstHigh: roundTo500(ongoingYearExGstHigh),
    typicalMonthlyExGstLow: roundTo500(rawTypicalMonthlyLow),
    typicalMonthlyExGstHigh: roundTo500(Math.max(rawTypicalMonthlyHigh, rawTypicalMonthlyLow + 500)),
    freeConnectedMinutesFromSetup,
  };
}

export function formatInr(n: number): string {
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

export function formatInrRange(min: number, max: number): string {
  return `${formatInr(min)} – ${formatInr(max)}`;
}

export function formatDurationMin(m: number): string {
  if (Number.isInteger(m)) return `${m} min`;
  return `${m.toFixed(1)} min`;
}
