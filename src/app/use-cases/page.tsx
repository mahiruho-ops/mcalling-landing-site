import { Metadata } from "next";
import Link from "next/link";
import { useCasesIndexContent } from "@/content/mkcalling/useCasesIndex";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, PhoneCall, Users, CheckCircle2, Check } from "lucide-react";
import { Atmosphere } from "@/components/site/Atmosphere";
import { ChildPageHero } from "@/components/site/ChildPageHero";
import { ShelfRows, StageFooter } from "@/components/site/HeroStages";

export const metadata: Metadata = {
  title: "AI Calling Use Cases | mKcalling",
  description: "Explore how mKcalling automates inbound and outbound business calls across sales, support, reminders, and follow-ups.",
};

export default function UseCasesIndex() {
  const { hero, useCases, inboundOutbound, aiHuman, industries, whyChoose, cta } = useCasesIndexContent;

  return (
    <>
    <ChildPageHero
      eyebrow="Use cases"
      title={hero.headline}
      support={hero.subheadline}
      stageLabel="use cases"
      stage={
        <>
          <div className="grid divide-y border-b border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            {[inboundOutbound.inbound, inboundOutbound.outbound].map((side) => (
              <div key={side.title} className="px-4 py-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">{side.title}</p>
                <ul className="mt-2 space-y-1">
                  {side.features.slice(0, 2).map((feature) => (
                    <li key={feature} className="text-xs leading-relaxed text-muted-foreground">{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <ShelfRows
            rows={useCases.map((item) => ({
              title: item.title,
              detail: item.description,
              href: `/use-cases/${item.slug}`,
            }))}
          />
          <StageFooter>{hero.supportingLine}</StageFooter>
        </>
      }
    />
    <section className="relative overflow-hidden border-b border-border py-16 md:py-20">
      <Atmosphere variant="mist" />
      <div className="relative container mx-auto px-6">
        <div className="max-w-6xl mx-auto">

          {/* SECTION 2: Functional Use Cases Grid */}
          <div className="mb-16">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map((useCase, index) => (
                <Link
                  key={useCase.slug}
                  href={`/use-cases/${useCase.slug}`}
                  className="group p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-card"
                >
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                      {useCase.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {useCase.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* SECTION 3: Inbound vs Outbound Coverage */}
          <div className="mb-16">
            <div className="mb-12 max-w-2xl space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{inboundOutbound.title}</h2>
              <p className="text-muted-foreground">{inboundOutbound.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Inbound */}
              <div className="p-8 rounded-xl bg-card border border-primary/30">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{inboundOutbound.inbound.title}</h3>
                </div>
                <ul className="space-y-3">
                  {inboundOutbound.inbound.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Outbound */}
              <div className="p-8 rounded-xl bg-card border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <PhoneCall className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold">{inboundOutbound.outbound.title}</h3>
                </div>
                <ul className="space-y-3">
                  {inboundOutbound.outbound.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* SECTION 4: How AI + Humans Work Together */}
          <div className="mb-16">
            <div className="p-8 rounded-xl bg-card border border-border/50">
              <div className="mb-6 max-w-2xl space-y-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mx-auto">
                  <Users className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{aiHuman.title}</h2>
                <p className="text-muted-foreground">{aiHuman.subtitle}</p>
              </div>
              <div className="max-w-3xl mx-auto space-y-4 mb-6">
                {aiHuman.points.map((point, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-background/50">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{point}</span>
                  </div>
                ))}
              </div>
              <p className="max-w-2xl text-sm italic text-muted-foreground">
                {aiHuman.note}
              </p>
            </div>
          </div>

          {/* SECTION 5: Works Across Industries */}
          <div className="mb-16">
            <div className="mb-8 max-w-2xl space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{industries.title}</h2>
              <p className="text-muted-foreground">{industries.subtitle}</p>
            </div>
            <div className="mb-8 flex flex-wrap items-center gap-3">
              {industries.industries.map((industry, index) => (
                <div key={index} className="px-4 py-2 rounded-lg bg-card border border-border/50 text-sm">
                  {industry}
                </div>
              ))}
            </div>
            <div>
              <Link href={industries.route}>
                <Button variant="outline" size="lg" className="border-primary/30 hover:border-primary/60">
                  {industries.cta}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* SECTION 6: Why Businesses Use mKcalling */}
          <div className="mb-16">
            <div className="mb-12 max-w-2xl space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl normal-case">{whyChoose.title}</h2>
              <p className="text-muted-foreground">{whyChoose.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {whyChoose.reasons.map((reason, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border/50">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-sm">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 7: CTA */}
          <div className="max-w-2xl rounded-2xl border border-primary/30 bg-card p-8 md:p-12">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl mb-4">{cta.title}</h2>
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
