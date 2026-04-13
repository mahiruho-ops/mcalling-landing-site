"use client";

import { useMemo, useState, useCallback, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { pricingPageContent } from "@/content/mkcalling/pricingPage";
import {
  SMB_CHANNEL_DID_ANNUAL_EX_GST,
  SMB_USAGE_CREDIT_VALIDITY_MONTHS_FROM_GOLIVE,
  computeSmbEstimate,
  estimatedMonthlyMinutesRange,
  formatDurationMin,
  formatInr,
  formatInrRange,
  type SmbConcurrency,
  type SmbDailyVolume,
  type SmbEstimateResult,
} from "@/lib/pricing-estimate";
import { buildAndSaveSmbPricingContext } from "@/lib/pricing-context";
import { cn } from "@/lib/utils";
import { Calculator } from "lucide-react";

const initialVolume: SmbDailyVolume = "v100_250";
const DEFAULT_DURATION = 3;

function snapCallDurationMinutes(value: number): number {
  const snapped = Math.round(value * 2) / 2;
  return Math.min(15, Math.max(1, snapped));
}

/** Digits and at most one `.` with up to 2 decimal places (for typing 1–15). */
function sanitizeDurationDraft(raw: string): string {
  let s = raw.replace(/,/g, ".").replace(/[^\d.]/g, "");
  const dot = s.indexOf(".");
  if (dot === -1) return s;
  const intPart = s.slice(0, dot);
  const frac = s.slice(dot + 1).replace(/\./g, "").slice(0, 2);
  return intPart + "." + frac;
}

function formatDurationInputDisplay(n: number): string {
  if (Number.isInteger(n)) return String(n);
  return n.toFixed(2).replace(/\.?0+$/, "");
}

/** Matches SMB radio option rows; selected = same primary border/fill as concurrency radios. */
function smbCheckboxOptionLabelClass(selected: boolean) {
  return cn(
    "flex items-center gap-3 rounded-lg border border-border/50 px-3 py-2.5 cursor-pointer hover:bg-muted/30",
    selected && "border-primary/50 bg-primary/5",
  );
}

const smbCheckboxClassName =
  "shrink-0 rounded-[3px] border-2 border-primary/50 data-[state=checked]:border-primary";

export function SMBConfigurator() {
  const router = useRouter();
  const { smb, gst } = pricingPageContent;
  const [dailyVolume, setDailyVolume] = useState<SmbDailyVolume>(initialVolume);
  const [selectedUseCases, setSelectedUseCases] = useState<string[]>([smb.fields.useCases.options[0].value]);
  const [concurrency, setConcurrency] = useState<SmbConcurrency>("2");
  const [avgDurationMin, setAvgDurationMin] = useState<number>(DEFAULT_DURATION);
  const [durationDraft, setDurationDraft] = useState<string | null>(null);
  const [complexity, setComplexity] = useState<"basic" | "standard" | "advanced">("standard");
  const [addons, setAddons] = useState<string[]>([]);
  const [result, setResult] = useState<SmbEstimateResult | null>(null);

  const minutePreview = useMemo(
    () => estimatedMonthlyMinutesRange(dailyVolume, avgDurationMin),
    [dailyVolume, avgDurationMin],
  );

  /** 0–100, aligned with linear slider position (1–15 min). */
  const durationThumbPercent = useMemo(() => ((avgDurationMin - 1) / (15 - 1)) * 100, [avgDurationMin]);

  const toggleUseCase = (value: string) => {
    setSelectedUseCases((prev) => {
      if (prev.includes(value)) {
        if (prev.length <= 1) return prev;
        return prev.filter((v) => v !== value);
      }
      return [...prev, value];
    });
  };

  const toggleAddon = (id: string) => {
    setAddons((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));
  };

  const runEstimate = () => {
    if (selectedUseCases.length < 1) return;
    setResult(
      computeSmbEstimate({
        dailyVolume,
        useCases: selectedUseCases,
        concurrency,
        avgCallDurationMin: avgDurationMin,
        complexity,
        addons,
      }),
    );
  };

  const persistSmbPricingContext = useCallback(() => {
    if (!result) return;
    buildAndSaveSmbPricingContext({
      inputs: {
        dailyVolume,
        useCases: selectedUseCases,
        concurrency,
        avgCallDurationMin: avgDurationMin,
        complexity,
        addons,
      },
      result,
      labels: {
        dailyVolumeLabel: smb.fields.dailyVolume.options.find((o) => o.value === dailyVolume)?.label ?? dailyVolume,
        useCaseLabels: selectedUseCases.map(
          (v) => smb.fields.useCases.options.find((o) => o.value === v)?.label ?? v,
        ),
        concurrencyLabel: smb.fields.concurrency.options.find((o) => o.value === concurrency)?.label ?? concurrency,
        complexityLabel: smb.fields.complexity.options.find((o) => o.value === complexity)?.label ?? complexity,
        addonLabels: addons.map((id) => smb.fields.addons.options.find((o) => o.id === id)?.label ?? id),
      },
    });
  }, [
    result,
    dailyVolume,
    selectedUseCases,
    concurrency,
    avgDurationMin,
    complexity,
    addons,
    smb.fields.dailyVolume.options,
    smb.fields.useCases.options,
    smb.fields.concurrency.options,
    smb.fields.complexity.options,
    smb.fields.addons.options,
  ]);

  const scheduleConsultationHref = "/schedule-demo#interest";

  return (
    <section id="smb-configurator" className="pt-8 md:pt-10 pb-16 md:pb-20 scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
              <Calculator className="h-3.5 w-3.5" aria-hidden />
              SMB
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">{smb.sectionTitle}</h2>
            <p className="text-muted-foreground text-lg">{smb.sectionSubtitle}</p>
            <p className="text-xs text-muted-foreground">{gst.shortLine}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm shadow-card p-6 md:p-8 space-y-8">
              <FieldBlock label={smb.fields.dailyVolume.label}>
                <RadioGroup
                  value={dailyVolume}
                  onValueChange={(v) => setDailyVolume(v as SmbDailyVolume)}
                  className="grid gap-2"
                >
                  {smb.fields.dailyVolume.options.map((opt) => (
                    <label
                      key={opt.value}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border border-border/50 px-3 py-2.5 cursor-pointer hover:bg-muted/30",
                        dailyVolume === opt.value && "border-primary/50 bg-primary/5",
                      )}
                    >
                      <RadioGroupItem value={opt.value} id={`dv-${opt.value}`} />
                      <span className="text-sm">{opt.label}</span>
                    </label>
                  ))}
                </RadioGroup>
              </FieldBlock>

              <Separator />

              <div className="space-y-3" role="group" aria-labelledby="smb-usecases-heading">
                <div>
                  <Label id="smb-usecases-heading" className="text-base">
                    {smb.fields.useCases.label}
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">{smb.fields.useCases.sublabel}</p>
                </div>
                <div className="grid gap-2">
                  {smb.fields.useCases.options.map((opt) => {
                    const inputId = `uc-${opt.value}`;
                    const checked = selectedUseCases.includes(opt.value);
                    return (
                      <label key={opt.value} htmlFor={inputId} className={smbCheckboxOptionLabelClass(checked)}>
                        <Checkbox
                          id={inputId}
                          className={smbCheckboxClassName}
                          checked={checked}
                          onCheckedChange={() => toggleUseCase(opt.value)}
                        />
                        <span className="text-sm">{opt.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <Separator />

              <FieldBlock label={smb.fields.concurrency.label} hint={smb.fields.concurrency.hint}>
                <RadioGroup
                  value={concurrency}
                  onValueChange={(v) => setConcurrency(v as SmbConcurrency)}
                  className="grid gap-2"
                >
                  {smb.fields.concurrency.options.map((opt) => (
                    <label
                      key={opt.value}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border border-border/50 px-3 py-2.5 cursor-pointer hover:bg-muted/30",
                        concurrency === opt.value && "border-primary/50 bg-primary/5",
                      )}
                    >
                      <RadioGroupItem value={opt.value} id={`cc-${opt.value}`} />
                      <span className="text-sm">{opt.label}</span>
                    </label>
                  ))}
                </RadioGroup>
              </FieldBlock>

              <Separator />

              <FieldBlock label={smb.fields.callDuration.label} hint={smb.fields.callDuration.hint}>
                <div className="space-y-3 pt-1">
                  <div className="flex justify-between items-baseline gap-2 text-xs font-medium text-muted-foreground">
                    <span>1 min</span>
                    <span>15 min</span>
                  </div>
                  <div className="relative pt-1">
                    <div className="pointer-events-none absolute bottom-full left-0 right-0 z-10 mb-1.5 h-9">
                      <div
                        className="pointer-events-auto absolute bottom-0 inline-flex items-center gap-1 rounded border border-border/50 bg-background/90 px-1 py-0.5 shadow-sm backdrop-blur-sm"
                        style={{
                          left: `clamp(1.75rem, ${durationThumbPercent}%, calc(100% - 1.75rem))`,
                          transform: "translateX(-50%)",
                        }}
                      >
                        <Label htmlFor="smb-avg-duration" className="sr-only">
                          {smb.fields.callDuration.durationInputLabel}
                        </Label>
                        <Input
                          id="smb-avg-duration"
                          type="text"
                          inputMode="decimal"
                          autoComplete="off"
                          title="Numbers only: 1–15, up to 2 decimal places — snaps to 30 sec steps on exit; or drag the slider"
                          aria-label={smb.fields.callDuration.durationInputLabel}
                          className="h-7 w-[3.5rem] shrink-0 cursor-text rounded border border-border/60 bg-muted/45 px-px py-0 text-center text-sm font-semibold tabular-nums tracking-tight text-foreground shadow-none ring-offset-background transition-colors hover:bg-muted/55 focus-visible:border-primary/50 focus-visible:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 dark:bg-muted/30 dark:hover:bg-muted/40 dark:focus-visible:bg-muted/35"
                          value={
                            durationDraft !== null ? durationDraft : formatDurationInputDisplay(avgDurationMin)
                          }
                          onChange={(e) => setDurationDraft(sanitizeDurationDraft(e.target.value))}
                          onFocus={() => setDurationDraft(formatDurationInputDisplay(avgDurationMin))}
                          onBlur={() => {
                            if (durationDraft === null) return;
                            const trimmed = durationDraft.trim();
                            if (trimmed === "" || trimmed === ".") {
                              setDurationDraft(null);
                              setAvgDurationMin((p) => snapCallDurationMinutes(p));
                              return;
                            }
                            const v = parseFloat(trimmed.replace(",", "."));
                            if (Number.isNaN(v)) {
                              setDurationDraft(null);
                              return;
                            }
                            setAvgDurationMin(snapCallDurationMinutes(v));
                            setDurationDraft(null);
                          }}
                        />
                        <span className="pr-0.5 text-xs font-medium text-muted-foreground tabular-nums">min</span>
                      </div>
                    </div>
                    <Slider
                      min={1}
                      max={15}
                      step={0.5}
                      value={[avgDurationMin]}
                      onValueChange={([v]) => {
                        if (typeof v !== "number") return;
                        setDurationDraft(null);
                        setAvgDurationMin(snapCallDurationMinutes(v));
                      }}
                      aria-label="Average connected call duration in minutes"
                      aria-valuetext={formatDurationMin(avgDurationMin)}
                    />
                  </div>
                  <div className="rounded-lg border border-border/50 bg-muted/10 px-3 py-2.5">
                    <p className="text-xs font-medium text-foreground">{smb.fields.callDuration.estimatedMinutesTitle}</p>
                    <p className="text-sm text-muted-foreground mt-1 tabular-nums">
                      {minutePreview.low.toLocaleString("en-IN")} – {minutePreview.high.toLocaleString("en-IN")} min / month
                    </p>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed border-t border-border/40 pt-2">
                      {smb.fields.callDuration.connectedTimeNote}
                    </p>
                  </div>
                </div>
              </FieldBlock>

              <Separator />

              <FieldBlock label={smb.fields.complexity.label}>
                <RadioGroup
                  value={complexity}
                  onValueChange={(v) => setComplexity(v as "basic" | "standard" | "advanced")}
                  className="grid gap-3"
                >
                  {smb.fields.complexity.options.map((opt) => (
                    <label
                      key={opt.value}
                      className={cn(
                        "flex flex-col gap-1 rounded-lg border border-border/50 px-3 py-3 cursor-pointer hover:bg-muted/30",
                        complexity === opt.value && "border-primary/50 bg-primary/5",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value={opt.value} id={`cx-${opt.value}`} />
                        <span className="text-sm font-medium">{opt.label}</span>
                      </div>
                      <p className="text-xs text-muted-foreground pl-7">{opt.description}</p>
                    </label>
                  ))}
                </RadioGroup>
              </FieldBlock>

              <Separator />

              <div className="space-y-3" role="group" aria-labelledby="smb-addons-heading">
                <div>
                  <Label id="smb-addons-heading" className="text-base">
                    {smb.fields.addons.label}
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">{smb.fields.addons.sublabel}</p>
                </div>
                <div className="grid gap-2">
                  {smb.fields.addons.options.map((opt) => {
                    const inputId = `addon-${opt.id}`;
                    const checked = addons.includes(opt.id);
                    return (
                      <label key={opt.id} htmlFor={inputId} className={smbCheckboxOptionLabelClass(checked)}>
                        <Checkbox
                          id={inputId}
                          className={smbCheckboxClassName}
                          checked={checked}
                          onCheckedChange={() => toggleAddon(opt.id)}
                        />
                        <span className="text-sm">{opt.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <Button
                type="button"
                size="lg"
                className="w-full bg-gradient-primary hover:shadow-glow-primary"
                onClick={runEstimate}
                disabled={selectedUseCases.length < 1}
              >
                {smb.submit}
              </Button>
              {selectedUseCases.length < 1 ? (
                <p className="text-xs text-center text-amber-700 dark:text-amber-400">{smb.result.useCaseValidation}</p>
              ) : null}
            </div>

            <div className="lg:sticky lg:top-32 space-y-6">
              {!result ? (
                <div className="rounded-2xl border border-dashed border-border/60 bg-muted/10 p-8 text-center text-muted-foreground text-sm">
                  Complete the questions and select <span className="text-foreground font-medium">{smb.submit}</span> to see a
                  suggested plan and cost breakdown.
                </div>
              ) : (
                <div className="rounded-2xl border border-primary/30 bg-gradient-to-b from-card/80 to-card/40 shadow-glow-primary/20 p-6 md:p-8 space-y-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">{smb.result.planLabel}</p>
                    <p className="text-3xl font-bold gradient-text-primary mt-1">{result.tier}</p>
                    <p className="text-sm text-muted-foreground mt-2">{result.tierBlurb}</p>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <p className="text-sm font-semibold text-foreground">{smb.result.breakdownTitle}</p>

                    <div className="rounded-xl border border-border/50 bg-background/50 p-4 space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">{smb.result.setupLabel}</p>
                      <p className="text-lg font-semibold tabular-nums">{formatInr(result.setupOneTimeExGst)}</p>
                      {result.freeConnectedMinutesFromSetup > 0 ? (
                        <div className="border-t border-border/40 pt-3 space-y-1.5">
                          <p className="text-xs font-medium text-foreground">{smb.result.setupUsageCreditTitle}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {smb.result.setupUsageCreditLine
                              .replace("{minutes}", result.freeConnectedMinutesFromSetup.toLocaleString("en-IN"))
                              .replace("{rate}", String(result.perMinuteExGst))}
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {smb.result.setupUsageCreditValidity.replace(
                              "{months}",
                              String(SMB_USAGE_CREDIT_VALIDITY_MONTHS_FROM_GOLIVE),
                            )}
                          </p>
                          <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                            {smb.result.setupUsageCreditFootnote}
                          </p>
                        </div>
                      ) : null}
                    </div>

                    <div className="rounded-xl border border-border/50 bg-background/50 p-4 space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">{smb.result.channelLabel}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{smb.result.channelSub}</p>
                      <p className="text-sm text-foreground">
                        {result.effectiveConcurrency} path(s) × {formatInr(SMB_CHANNEL_DID_ANNUAL_EX_GST)} / year ={" "}
                        <span className="font-semibold tabular-nums">{formatInr(result.channelAnnualExGst)}</span> / year
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ≈ <span className="font-semibold text-foreground tabular-nums">{formatInr(result.channelMonthlyEquivExGst)}</span>{" "}
                        / month equivalent
                      </p>
                      <p className="text-xs text-muted-foreground italic">{smb.result.channelBilledAnnually}</p>
                    </div>

                    <div className="rounded-xl border border-border/50 bg-background/50 p-4 space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">{smb.result.usageLabel}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{smb.result.usageSub}</p>
                      <p className="text-sm text-foreground tabular-nums">
                        ~{result.minutesLow.toLocaleString("en-IN")} – {result.minutesHigh.toLocaleString("en-IN")} min/mo @ ₹
                        {result.perMinuteExGst}/min ({result.tier}) →{" "}
                        <span className="font-semibold">{formatInrRange(result.usageMonthlyLowExGst, result.usageMonthlyHighExGst)}</span>
                        / month
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">{smb.result.typicalMonthlyTitle}</p>
                      <p className="text-xs text-muted-foreground">{smb.result.typicalMonthlyHint}</p>
                      <p className="text-xl font-semibold tabular-nums">
                        {formatInrRange(result.typicalMonthlyExGstLow, result.typicalMonthlyExGstHigh)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">{smb.result.firstYearTitle}</p>
                      <p className="text-xs text-muted-foreground">{smb.result.firstYearHint}</p>
                      <p className="text-lg font-semibold tabular-nums">
                        {formatInrRange(result.firstYearExGstLow, result.firstYearExGstHigh)}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">{smb.result.ongoingYearTitle}</p>
                      <p className="text-xs text-muted-foreground">{smb.result.ongoingYearHint}</p>
                      <p className="text-lg font-semibold tabular-nums">
                        {formatInrRange(result.ongoingYearExGstLow, result.ongoingYearExGstHigh)}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground border border-border/50 rounded-lg px-3 py-2 bg-muted/20">
                    {smb.result.gstNote}
                  </p>

                  <Separator />

                  <div>
                    <p className="text-sm font-semibold mb-2">{smb.result.summaryTitle}</p>
                    <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                      <li>
                        Avg. duration: <span className="text-foreground">{formatDurationMin(result.avgCallDurationMin)}</span> — est.{" "}
                        <span className="text-foreground tabular-nums">
                          {result.minutesLow.toLocaleString("en-IN")}–{result.minutesHigh.toLocaleString("en-IN")}
                        </span>{" "}
                        connected min/month
                      </li>
                      <li>
                        Concurrent capacity: <span className="text-foreground">{result.effectiveConcurrency}</span>
                        {result.inferredConcurrency ? " (inferred from volume)" : ""}
                      </li>
                      <li>
                        Use cases selected: <span className="text-foreground">{selectedUseCases.length}</span>
                      </li>
                      {result.freeConnectedMinutesFromSetup > 0 ? (
                        <li>
                          Usage credit from setup:{" "}
                          <span className="text-foreground tabular-nums">
                            {result.freeConnectedMinutesFromSetup.toLocaleString("en-IN")} min
                          </span>{" "}
                          at ₹{result.perMinuteExGst}/min (ex-GST), within{" "}
                          {SMB_USAGE_CREDIT_VALIDITY_MONTHS_FROM_GOLIVE} months of go-live
                        </li>
                      ) : null}
                      <li>
                        Workflow complexity: <span className="text-foreground capitalize">{complexity}</span>
                      </li>
                      <li>
                        Custom integration likely:{" "}
                        <span className="text-foreground">{result.integrationLikely ? "Yes" : "Unlikely from selections"}</span>
                      </li>
                    </ul>
                  </div>

                  {result.showLowVolumeNote && (
                    <p className="text-xs text-amber-700 dark:text-amber-400/90 border border-amber-500/25 rounded-lg px-3 py-2 bg-amber-500/5">
                      {smb.result.lowVolumeNote}
                    </p>
                  )}

                  {result.integrationLikely && (
                    <p className="text-xs text-muted-foreground">{smb.result.integrationNote}</p>
                  )}

                  <div className="rounded-xl border border-border/50 bg-background/50 p-4">
                    <p className="text-xs font-semibold text-foreground mb-1">{smb.result.guidanceTitle}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{smb.result.guidanceBody}</p>
                  </div>

                  <Button
                    type="button"
                    size="lg"
                    className="w-full bg-gradient-primary hover:shadow-glow-primary"
                    onPointerDown={persistSmbPricingContext}
                    onClick={() => {
                      persistSmbPricingContext();
                      router.push(scheduleConsultationHref);
                    }}
                    onAuxClick={(e) => {
                      if (e.button !== 1) return;
                      persistSmbPricingContext();
                      window.open(scheduleConsultationHref, "_blank", "noopener,noreferrer");
                    }}
                  >
                    {smb.result.ctas.consultation}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FieldBlock({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="space-y-3">
      <div>
        <Label className="text-base">{label}</Label>
        {hint ? <p className="text-xs text-muted-foreground mt-1">{hint}</p> : null}
      </div>
      {children}
    </div>
  );
}
