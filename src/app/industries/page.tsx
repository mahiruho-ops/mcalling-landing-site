import { Metadata } from "next";
import { industriesData, industriesIndexContent } from "@/content/mkcalling/industries";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import { Atmosphere } from "@/components/site/Atmosphere";
import { ChildPageHero } from "@/components/site/ChildPageHero";
import { ChipCloud } from "@/components/site/HeroStages";

export const metadata: Metadata = {
  title: "Industries | mKcalling",
  description: "Explore industries where mKcalling automates inbound and outbound business calls — configured and managed for Indian businesses.",
};

export default function IndustriesPage() {
  const { hero, whyFits, cta } = industriesIndexContent;
  const highlightedIndustry = industriesData.find(industry => industry.highlight);
  const regularIndustries = industriesData.filter(industry => !industry.highlight);

  return (
    <>
    <ChildPageHero
      eyebrow="Industries"
      title={hero.headline}
      support={hero.subheadline}
      stageLabel="industries"
      stage={
        <>
          {highlightedIndustry ? (
            <Link href={`/industries/${highlightedIndustry.slug}`} className="group block border-b border-border px-5 py-5 transition hover:bg-muted/40">
              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">{highlightedIndustry.badge}</p>
              <p className="mt-1 text-lg font-semibold tracking-tight group-hover:text-primary">{highlightedIndustry.name}</p>
              <ul className="mt-3 space-y-1.5">
                {highlightedIndustry.bullets.map((bullet) => (
                  <li key={bullet} className="text-xs leading-relaxed text-muted-foreground">{bullet}</li>
                ))}
              </ul>
            </Link>
          ) : null}
          <ChipCloud
            items={regularIndustries.map((industry) => ({
              label: industry.name,
              href: `/industries/${industry.slug}`,
            }))}
          />
        </>
      }
      actions={
        <>
          <Link href="/schedule-demo">
            <Button size="lg" className="bg-gradient-primary hover:shadow-glow-primary transition-all group">
              {hero.primaryCTA}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/use-cases">
            <Button size="lg" variant="outline" className="border-primary/30 hover:border-primary/60">
              {hero.secondaryCTA}
            </Button>
          </Link>
        </>
      }
    />
    <section className="relative overflow-hidden border-b border-border py-16 md:py-20">
      <Atmosphere variant="mist" />
      <div className="relative container mx-auto px-6">
        <div className="max-w-6xl mx-auto">

          {/* SECTION 2: Industry Grid */}
          <div className="mb-16">
            {/* Highlighted Industry - Banking DSA */}
            {highlightedIndustry && (
              <div className="max-w-4xl mx-auto mb-12">
                <Link
                  href={`/industries/${highlightedIndustry.slug}`}
                  className="group block p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/50 hover:border-primary transition-all hover:shadow-glow-primary"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3">
                        <Badge variant="default" className="bg-primary text-primary-foreground">
                          <Star className="w-3 h-3 mr-1" />
                          {highlightedIndustry.badge}
                        </Badge>
                        <h3 className="text-2xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                          {highlightedIndustry.name}
                        </h3>
                      </div>
                      <ul className="space-y-2">
                        {highlightedIndustry.bullets.map((bullet, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-foreground">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        Explore {highlightedIndustry.name} solutions
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Regular Industries Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularIndustries.map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  className="group p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-card"
                >
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                      {industry.name}
                    </h3>
                    <ul className="space-y-2">
                      {industry.bullets.map((bullet, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-muted-foreground">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* SECTION 3: Why mKcalling fits across industries */}
          <div className="mb-16 p-8 rounded-xl bg-card border border-border/50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl mb-2 normal-case">{whyFits.title}</h2>
              <p className="text-muted-foreground mb-6">{whyFits.subtitle}</p>
              <div className="grid md:grid-cols-2 gap-4">
                {whyFits.points.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 4: CTA Band */}
          <div className="max-w-2xl rounded-2xl border border-primary/30 bg-card p-8 md:p-12">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl mb-4">{cta.headline}</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">{cta.copy}</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/schedule-demo">
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow-primary transition-all group">
                  {cta.primaryCTA}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/use-cases">
                <Button size="lg" variant="outline" className="border-primary/30 hover:border-primary/60">
                  {cta.secondaryCTA}
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
