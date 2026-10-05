import { Metadata } from "next";
import { productContent } from "@/content/mkcalling/product";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2, X, MessageSquare, Phone, PhoneCall, Calendar, Hash, BarChart, Settings, Shield, Plug, Check } from "lucide-react";
import { Atmosphere } from "@/components/site/Atmosphere";
import { ChildPageHero } from "@/components/site/ChildPageHero";
import { ShelfRows, StageFooter } from "@/components/site/HeroStages";

export const metadata: Metadata = {
  title: "Product | mKcalling",
  description: "Automate inbound and outbound business calls with mKcalling — an all-inclusive AI calling platform, configured and managed for you.",
};

const iconMap: Record<string, any> = {
  "agents": MessageSquare,
  "calling": Phone,
  "campaigns": Calendar,
  "numbers": Hash,
  "monitoring": BarChart,
};

export default function ProductPage() {
  const { hero, whatItIs, capabilities, managedService, humanInLoop, integrations, whyChoose, cta } = productContent;

  return (
    <>
    <ChildPageHero
      eyebrow="Product"
      title={hero.headline}
      support={hero.subheadline}
      stageLabel="product"
      stage={
        <>
          <div className="grid divide-y border-b border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <div className="px-4 py-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">{whatItIs.is.title}</p>
              <ul className="mt-2 space-y-1">
                {whatItIs.is.items.slice(0, 2).map((item) => (
                  <li key={item} className="text-xs leading-relaxed text-muted-foreground">{item}</li>
                ))}
              </ul>
            </div>
            <div className="px-4 py-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">{whatItIs.isNot.title}</p>
              <ul className="mt-2 space-y-1">
                {whatItIs.isNot.items.slice(0, 2).map((item) => (
                  <li key={item} className="text-xs leading-relaxed text-muted-foreground">{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <ShelfRows
            rows={capabilities.items.map((item) => {
              const Icon = iconMap[item.icon];
              return {
                title: item.title,
                detail: item.description,
                icon: Icon ? <Icon className="h-4 w-4" aria-hidden /> : undefined,
              };
            })}
          />
          <StageFooter>
            <ul className="flex flex-wrap gap-1.5">
              {hero.bullets.map((bullet) => (
                <li key={bullet} className="rounded-md border border-border bg-background/70 px-2.5 py-1 text-xs text-foreground">
                  {bullet}
                </li>
              ))}
            </ul>
          </StageFooter>
        </>
      }
      actions={
        <Link href="/schedule-demo">
          <Button size="lg" className="bg-gradient-primary hover:shadow-glow-primary transition-all group">
            {hero.primaryCTA}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      }
    />
    <section className="relative overflow-hidden border-b border-border py-16 md:py-20">
      <Atmosphere variant="mist" />
      <div className="relative container mx-auto px-6">
        <div className="max-w-6xl mx-auto">

          {/* SECTION 2: What mKcalling Is (and Is Not) */}
          <div className="mb-16">
            <div className="mb-12 max-w-2xl space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl normal-case">{whatItIs.title}</h2>
              <p className="text-muted-foreground">{whatItIs.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {/* What It Is */}
              <div className="p-8 rounded-xl bg-card border border-primary/30">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  {whatItIs.is.title}
                </h3>
                <ul className="space-y-4">
                  {whatItIs.is.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* What It Is Not */}
              <div className="p-8 rounded-xl bg-card border border-border/50">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                  <X className="w-6 h-6 text-muted-foreground" />
                  {whatItIs.isNot.title}
                </h3>
                <ul className="space-y-4">
                  {whatItIs.isNot.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* SECTION 3: Core Platform Capabilities */}
          <div className="mb-16">
            <div className="mb-12 max-w-2xl space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{capabilities.title}</h2>
              <p className="text-muted-foreground">{capabilities.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {capabilities.items.map((capability, index) => {
                const Icon = iconMap[capability.icon] || Settings;
                return (
                  <div key={index} className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all">
                    <div className="space-y-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary w-fit">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold text-lg">{capability.title}</h3>
                      <p className="text-sm text-muted-foreground">{capability.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 4: Managed Service */}
          <div className="mb-16 p-8 rounded-xl bg-card border border-primary/30">
            <div className="mb-8 max-w-2xl space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{managedService.title}</h2>
              <p className="text-muted-foreground">{managedService.subtitle}</p>
            </div>
            <p className="mb-8 max-w-3xl text-lg text-foreground">
              {managedService.description}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {managedService.includes.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-background/50">
                  <Settings className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 5: Human-in-the-Loop Safety */}
          <div className="mb-16">
            <div className="p-8 rounded-xl bg-card border border-border/50">
              <div className="mb-6 max-w-2xl space-y-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mx-auto">
                  <Shield className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{humanInLoop.title}</h2>
                <p className="text-muted-foreground">{humanInLoop.subtitle}</p>
              </div>
              <p className="mb-4 max-w-3xl text-foreground">
                {humanInLoop.description}
              </p>
              <p className="text-sm italic text-muted-foreground">
                {humanInLoop.note}
              </p>
            </div>
          </div>

          {/* SECTION 6: Integrations & Extensibility */}
          <div className="mb-16">
            <div className="mb-12 max-w-2xl space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{integrations.title}</h2>
              <p className="text-muted-foreground">{integrations.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="p-6 rounded-xl bg-card border border-primary/30">
                <div className="flex items-center gap-3 mb-4">
                  <Plug className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold">{integrations.native.title}</h3>
                </div>
                <ul className="space-y-3">
                  {integrations.native.items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border/50">
                <div className="flex items-center gap-3 mb-4">
                  <Plug className="w-5 h-5 text-muted-foreground" />
                  <h3 className="text-xl font-semibold">{integrations.other.title}</h3>
                </div>
                <ul className="space-y-3">
                  {integrations.other.items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* SECTION 7: Why Businesses Choose mKcalling */}
          <div className="mb-16">
            <div className="mb-12 max-w-2xl space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{whyChoose.title}</h2>
              <p className="text-muted-foreground">{whyChoose.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {whyChoose.reasons.map((reason, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border/50">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 8: CTA */}
          <div className="max-w-2xl rounded-2xl border border-primary/30 bg-card p-8 md:p-12">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl mb-4 normal-case">{cta.title}</h2>
            <div className="pt-4">
              <Link href="/schedule-demo">
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow-primary transition-all group">
                  {cta.buttonText}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
