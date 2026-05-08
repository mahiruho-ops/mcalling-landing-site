/**
 * SMB pricing estimator types, slider preview helpers, and INR formatters.
 *
 * Pricing math (tier selection, setup costs, channel/usage totals) lives in
 * the billing-api `/v1/estimator/smb/calculate` endpoint, which is the single
 * source of truth. The helpers below only support the live "X – Y min/month"
 * preview that updates while the user drags the slider; they do enum-bucket
 * math and use no pricing numbers.
 */

export type SmbDailyVolume = "lt100" | "v100_250" | "v250_500" | "v500p";
export type SmbConcurrency = "1" | "2" | "3" | "4" | "unsure";
export type SmbComplexity = "basic" | "standard" | "advanced";
export type SmbTier = "Starter" | "Growth" | "Scale";

/** Calendar days for estimated monthly connected minutes (preview). */
export const SMB_DAYS_PER_MONTH = 30;

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
  tier: SmbTier;
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
  /** channelAnnualExGst / 12 — for "monthly equivalent" copy. */
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
