"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { pricingPageContent } from "@/content/mkcalling/pricingPage";
import { buildAndSaveEnterprisePricingContext } from "@/lib/pricing-context";
import { cn } from "@/lib/utils";
import { Building2 } from "lucide-react";

/** Cyan radios/checkboxes — avoids theme `primary` (purple) in this section. */
const enterpriseRadioItemClassName =
  "border-cyan-600 text-cyan-600 focus-visible:ring-cyan-500/40 dark:border-cyan-400 dark:text-cyan-400";

/** Checkbox: cyan ring + solid fill when checked (tick stays white). */
const enterpriseCheckboxClassName =
  "shrink-0 rounded-[3px] border border-cyan-600 dark:border-cyan-400 data-[state=checked]:border-cyan-600 data-[state=checked]:bg-cyan-600 data-[state=checked]:text-white dark:data-[state=checked]:border-cyan-500 dark:data-[state=checked]:bg-cyan-500 dark:data-[state=checked]:text-white";

const enterpriseOptionLabelClass = (selected: boolean) =>
  cn(
    "flex items-center gap-3 rounded-lg border border-border/50 px-3 py-2.5 cursor-pointer hover:bg-muted/30",
    selected && "border-cyan-500/40 bg-cyan-500/5",
  );

const scheduleEnterpriseDiscoveryHref = "/schedule-demo#interest";

export function EnterpriseConfigurator() {
  const router = useRouter();
  const { enterprise, gst } = pricingPageContent;
  const [scale, setScale] = useState<string>(enterprise.fields.scale.options[0].value);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([enterprise.fields.domain.options[0].value]);
  const [currentSetup, setCurrentSetup] = useState<string>(enterprise.fields.currentSetup.options[0].value);
  const [integrations, setIntegrations] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([enterprise.fields.service.options[0].value]);
  const [showResult, setShowResult] = useState(false);
  const [resultRevealTick, setResultRevealTick] = useState(0);
  const resultCardRef = useRef<HTMLDivElement | null>(null);
  const resultBannerRef = useRef<HTMLParagraphElement | null>(null);

  const toggleIntegration = (id: string) => {
    setIntegrations((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleDomain = (value: string) => {
    setSelectedDomains((prev) => {
      if (prev.includes(value)) {
        if (prev.length <= 1) return prev;
        return prev.filter((v) => v !== value);
      }
      return [...prev, value];
    });
  };

  const toggleService = (value: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(value)) {
        if (prev.length <= 1) return prev;
        return prev.filter((v) => v !== value);
      }
      return [...prev, value];
    });
  };

  const scaleLabel = enterprise.fields.scale.options.find((o) => o.value === scale)?.label ?? "";
  const domainLabels = enterprise.fields.domain.options
    .filter((o) => selectedDomains.includes(o.value))
    .map((o) => o.label);
  const setupLabel = enterprise.fields.currentSetup.options.find((o) => o.value === currentSetup)?.label ?? "";
  const serviceLabels = enterprise.fields.service.options
    .filter((o) => selectedServices.includes(o.value))
    .map((o) => o.label);
  const integrationLabels = enterprise.fields.integrations.options
    .filter((o) => integrations.includes(o.id))
    .map((o) => o.label);

  const submit = () => {
    setShowResult(true);
    setResultRevealTick((v) => v + 1);
  };

  useEffect(() => {
    if (!showResult || resultRevealTick === 0) return;
    const raf = window.requestAnimationFrame(() => {
      resultCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      resultBannerRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(raf);
  }, [showResult, resultRevealTick]);

  const persistEnterprisePricingContext = () => {
    buildAndSaveEnterprisePricingContext({
      scale,
      scaleLabel,
      domainValues: selectedDomains,
      domainLabels,
      currentSetup,
      setupLabel,
      integrationIds: integrations,
      integrationLabels,
      serviceValues: selectedServices,
      serviceLabels,
    });
  };

  return (
    <section id="enterprise-configurator" className="py-16 md:py-20 scroll-mt-28 border-t border-border/40 bg-card/15">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/5 px-3 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-400">
              <Building2 className="h-3.5 w-3.5" aria-hidden />
              Enterprise
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">{enterprise.sectionTitle}</h2>
            <p className="text-muted-foreground text-lg">{enterprise.sectionSubtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm shadow-card p-6 md:p-8 space-y-8">
              <FieldBlock label={enterprise.fields.scale.label}>
                <RadioGroup value={scale} onValueChange={setScale} className="grid gap-2">
                  {enterprise.fields.scale.options.map((opt) => (
                    <label
                      key={opt.value}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border border-border/50 px-3 py-2.5 cursor-pointer hover:bg-muted/30",
                        scale === opt.value && "border-cyan-500/40 bg-cyan-500/5",
                      )}
                    >
                      <RadioGroupItem
                        value={opt.value}
                        id={`es-${opt.value}`}
                        className={enterpriseRadioItemClassName}
                      />
                      <span className="text-sm">{opt.label}</span>
                    </label>
                  ))}
                </RadioGroup>
              </FieldBlock>

              <Separator />

              <div className="space-y-3" role="group" aria-labelledby="enterprise-domain-heading">
                <div>
                  <Label id="enterprise-domain-heading" className="text-base">
                    {enterprise.fields.domain.label}
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">{enterprise.fields.domain.sublabel}</p>
                </div>
                <div className="grid gap-2">
                  {enterprise.fields.domain.options.map((opt) => {
                    const inputId = `ed-${opt.value}`;
                    const checked = selectedDomains.includes(opt.value);
                    return (
                      <label key={opt.value} htmlFor={inputId} className={enterpriseOptionLabelClass(checked)}>
                        <Checkbox
                          id={inputId}
                          className={enterpriseCheckboxClassName}
                          checked={checked}
                          onCheckedChange={() => toggleDomain(opt.value)}
                        />
                        <span className="text-sm">{opt.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <Separator />

              <FieldBlock label={enterprise.fields.currentSetup.label}>
                <RadioGroup value={currentSetup} onValueChange={setCurrentSetup} className="grid gap-2">
                  {enterprise.fields.currentSetup.options.map((opt) => (
                    <label
                      key={opt.value}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border border-border/50 px-3 py-2.5 cursor-pointer hover:bg-muted/30",
                        currentSetup === opt.value && "border-cyan-500/40 bg-cyan-500/5",
                      )}
                    >
                      <RadioGroupItem
                        value={opt.value}
                        id={`cs-${opt.value}`}
                        className={enterpriseRadioItemClassName}
                      />
                      <span className="text-sm">{opt.label}</span>
                    </label>
                  ))}
                </RadioGroup>
              </FieldBlock>

              <Separator />

              <div className="space-y-3" role="group" aria-labelledby="enterprise-integrations-heading">
                <div>
                  <Label id="enterprise-integrations-heading" className="text-base">
                    {enterprise.fields.integrations.label}
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">{enterprise.fields.integrations.sublabel}</p>
                </div>
                <div className="grid gap-2">
                  {enterprise.fields.integrations.options.map((opt) => {
                    const inputId = `ei-${opt.id}`;
                    const checked = integrations.includes(opt.id);
                    return (
                      <label key={opt.id} htmlFor={inputId} className={enterpriseOptionLabelClass(checked)}>
                        <Checkbox
                          id={inputId}
                          className={enterpriseCheckboxClassName}
                          checked={checked}
                          onCheckedChange={() => toggleIntegration(opt.id)}
                        />
                        <span className="text-sm">{opt.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <Separator />

              <div className="space-y-3" role="group" aria-labelledby="enterprise-service-heading">
                <div>
                  <Label id="enterprise-service-heading" className="text-base">
                    {enterprise.fields.service.label}
                  </Label>
                  <p className="text-xs text-muted-foreground mt-1">{enterprise.fields.service.sublabel}</p>
                </div>
                <div className="grid gap-2">
                  {enterprise.fields.service.options.map((opt) => {
                    const inputId = `sv-${opt.value}`;
                    const checked = selectedServices.includes(opt.value);
                    return (
                      <label key={opt.value} htmlFor={inputId} className={enterpriseOptionLabelClass(checked)}>
                        <Checkbox
                          id={inputId}
                          className={enterpriseCheckboxClassName}
                          checked={checked}
                          onCheckedChange={() => toggleService(opt.value)}
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
                className="w-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-900 dark:text-cyan-100 hover:bg-cyan-500/20"
                onClick={submit}
              >
                {enterprise.submit}
              </Button>
            </div>

            <div className="lg:sticky lg:top-32 space-y-6">
              {!showResult ? (
                <div className="rounded-2xl border border-dashed border-border/60 bg-muted/10 p-8 text-center text-muted-foreground text-sm">
                  Submit the discovery form to see how we frame enterprise scope — <span className="text-foreground font-medium">no instant monthly quote</span>.
                </div>
              ) : (
                <div
                  ref={resultCardRef}
                  className="rounded-2xl border border-cyan-500/25 bg-gradient-to-b from-card/90 to-card/50 shadow-card p-6 md:p-8 space-y-6"
                >
                  <p
                    ref={resultBannerRef}
                    tabIndex={-1}
                    className="text-sm font-semibold text-cyan-700 dark:text-cyan-400 border border-cyan-500/20 rounded-lg px-3 py-2 bg-cyan-500/5"
                  >
                    {enterprise.result.banner}
                  </p>

                  <div>
                    <p className="text-sm font-semibold mb-2">Scope summary</p>
                    <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                      <li>Likely scale: {scaleLabel}</li>
                      <li>
                        Use case domains:{" "}
                        {domainLabels.length ? domainLabels.join("; ") : "None selected — to be confirmed on call"}
                      </li>
                      <li>Current setup: {setupLabel}</li>
                      <li>
                        Integration depth:{" "}
                        {integrationLabels.length ? integrationLabels.join("; ") : "None selected — to be confirmed on call"}
                      </li>
                      <li>
                        Service expectations:{" "}
                        {serviceLabels.length
                          ? serviceLabels.join("; ")
                          : "None selected — to be confirmed on call"}
                      </li>
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm font-semibold mb-1">{enterprise.result.pricingFramingTitle}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{enterprise.result.pricingFramingBody}</p>
                    <p className="text-xs text-muted-foreground mt-2 border border-border/50 rounded-lg px-3 py-2 bg-muted/20">
                      {gst.shortLine}
                    </p>
                  </div>

                  <Separator />

                  <div>
                    <p className="text-sm font-semibold mb-3">{enterprise.result.featuresTitle}</p>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      {enterprise.result.features.map((f) => (
                        <li key={f} className="flex gap-2">
                          <span className="text-cyan-600 dark:text-cyan-400 mt-0.5">•</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    type="button"
                    size="lg"
                    className="w-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-900 dark:text-cyan-100 hover:bg-cyan-500/20"
                    onPointerDown={persistEnterprisePricingContext}
                    onClick={() => {
                      persistEnterprisePricingContext();
                      router.push(scheduleEnterpriseDiscoveryHref);
                    }}
                    onAuxClick={(e) => {
                      if (e.button !== 1) return;
                      persistEnterprisePricingContext();
                      window.open(scheduleEnterpriseDiscoveryHref, "_blank", "noopener,noreferrer");
                    }}
                  >
                    {enterprise.result.ctas.discovery}
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

function FieldBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-3">
      <Label className="text-base">{label}</Label>
      {children}
    </div>
  );
}
