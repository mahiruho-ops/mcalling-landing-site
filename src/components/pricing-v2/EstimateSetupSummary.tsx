import { formatDurationMin } from "@/lib/pricing-estimate";
import type { SmbEstimateResult } from "@/lib/pricing-estimate";

type Props = {
  title: string;
  result: SmbEstimateResult;
  complexity: string;
  selectedUseCaseCount: number;
  usageCreditValidityMonths?: number;
  summaryPlanRateLine: string;
  summaryDurationLine: string;
  summaryConcurrencyLine: string;
  summaryUseCasesLine: string;
  summaryUsageCreditLine: string;
  summaryComplexityLine: string;
  summaryIntegrationLine: string;
  summaryIntegrationUnlikely: string;
};

export function EstimateSetupSummary({
  title,
  result,
  complexity,
  selectedUseCaseCount,
  usageCreditValidityMonths,
  summaryPlanRateLine,
  summaryDurationLine,
  summaryConcurrencyLine,
  summaryUseCasesLine,
  summaryUsageCreditLine,
  summaryComplexityLine,
  summaryIntegrationLine,
  summaryIntegrationUnlikely,
}: Props) {
  return (
    <div>
      <p className="text-sm font-semibold mb-2">{title}</p>
      <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
        <li>
          {summaryPlanRateLine.replace("{rate}", String(result.perMinuteExGst)).replace("{tier}", result.tier)}
        </li>
        <li>
          {summaryDurationLine.replace("{duration}", formatDurationMin(result.avgCallDurationMin))}
        </li>
        <li>
          {summaryConcurrencyLine.replace("{paths}", String(result.effectiveConcurrency)).replace(
            "{inferred}",
            result.inferredConcurrency ? " (inferred from volume)" : "",
          )}
        </li>
        <li>{summaryUseCasesLine.replace("{count}", String(selectedUseCaseCount))}</li>
        {result.freeConnectedMinutesFromSetup > 0 ? (
          <li>
            {summaryUsageCreditLine
              .replace("{minutes}", result.freeConnectedMinutesFromSetup.toLocaleString("en-IN"))
              .replace("{rate}", String(result.perMinuteExGst))
              .replace(
                "{validity}",
                usageCreditValidityMonths != null ? `, within ${usageCreditValidityMonths} months of go-live` : "",
              )}
          </li>
        ) : null}
        <li>
          {summaryComplexityLine.replace(
            "{complexity}",
            complexity.charAt(0).toUpperCase() + complexity.slice(1),
          )}
        </li>
        <li>
          {summaryIntegrationLine.replace(
            "{answer}",
            result.integrationLikely ? "Yes" : summaryIntegrationUnlikely,
          )}
        </li>
      </ul>
    </div>
  );
}
