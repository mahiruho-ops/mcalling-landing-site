import { Metadata } from "next";
import { trustContent } from "@/content/mkcalling/trust";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Check, CheckCircle2, Shield, Lock, Users, Phone, FileText, AlertCircle } from "lucide-react";
import { Atmosphere } from "@/components/site/Atmosphere";
import { ChildPageHero } from "@/components/site/ChildPageHero";
import { PointGrid } from "@/components/site/HeroStages";

export const metadata: Metadata = {
  title: "Trust & Compliance | mKcalling",
  description: "Learn how mKcalling ensures responsible, transparent, and India-first AI calling for businesses.",
};

export default function TrustCompliancePage() {
  const { hero, indiaFirst, callHandling, consent, aiTransparency, dataSecurity, roleBasedAccess, fairUse, businessValue, cta } = trustContent;

  return (
    <>
    <ChildPageHero
      eyebrow="Trust & compliance"
      title={hero.headline}
      support={
        <>
          <p>{hero.subheadline}</p>
          <p>{hero.supportingLine}</p>
        </>
      }
      stageLabel="india-first"
      stage={
        <>
          <div className="border-b border-border px-5 py-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">{indiaFirst.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{indiaFirst.description}</p>
          </div>
          <PointGrid points={indiaFirst.points} footer={indiaFirst.closing} />
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

          {/* SECTION 2: India-First by Design */}
          <div className="mb-16 p-8 rounded-xl bg-card border border-primary/30">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{indiaFirst.title}</h2>
              </div>
              <p className="text-muted-foreground mb-6">{indiaFirst.subtitle}</p>
              <p className="text-foreground mb-6">{indiaFirst.description}</p>
              <ul className="space-y-3 mb-6">
                {indiaFirst.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-foreground font-medium">{indiaFirst.closing}</p>
              </div>
            </div>
          </div>

          {/* SECTION 3: Call Handling & Recording */}
          <div className="mb-16 p-8 rounded-xl bg-card border border-border/50">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{callHandling.title}</h2>
              </div>
              <p className="text-muted-foreground mb-6">{callHandling.subtitle}</p>
              <ul className="space-y-3 mb-6">
                {callHandling.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground" dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </li>
                ))}
              </ul>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-foreground font-medium">{callHandling.closing}</p>
              </div>
            </div>
          </div>

          {/* SECTION 4: Consent, DND & Responsible Outreach */}
          <div className="mb-16 p-8 rounded-xl bg-card border border-border/50">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Phone className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{consent.title}</h2>
              </div>
              <p className="text-muted-foreground mb-6">{consent.subtitle}</p>
              <ul className="space-y-3 mb-6">
                {consent.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-foreground font-medium">{consent.closing}</p>
              </div>
            </div>
          </div>

          {/* SECTION 5: AI Transparency & Human Control */}
          <div className="mb-16 p-8 rounded-xl bg-card border border-border/50">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{aiTransparency.title}</h2>
              </div>
              <p className="text-muted-foreground mb-6">{aiTransparency.subtitle}</p>
              <ul className="space-y-3 mb-6">
                {aiTransparency.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-foreground font-medium italic">{aiTransparency.closing}</p>
              </div>
            </div>
          </div>

          {/* SECTION 6: Data Access & Security Practices */}
          <div className="mb-16 p-8 rounded-xl bg-card border border-border/50">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{dataSecurity.title}</h2>
              </div>
              <p className="text-muted-foreground mb-6">{dataSecurity.subtitle}</p>
              <ul className="space-y-3 mb-6">
                {dataSecurity.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-foreground font-medium">{dataSecurity.closing}</p>
              </div>
            </div>
          </div>

          {/* SECTION 7: Role-Based Access Control */}
          <div className="mb-16 p-8 rounded-xl bg-card border border-primary/30">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{roleBasedAccess.title}</h2>
              </div>
              <p className="text-muted-foreground mb-6">{roleBasedAccess.subtitle}</p>
              <p className="text-foreground mb-6">{roleBasedAccess.description}</p>
              <ul className="space-y-3 mb-6">
                {roleBasedAccess.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-foreground font-medium">{roleBasedAccess.closing}</p>
              </div>
            </div>
          </div>

          {/* SECTION 8: Ethical & Fair Use */}
          <div className="mb-16 p-8 rounded-xl bg-card border border-border/50">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{fairUse.title}</h2>
              </div>
              <p className="text-muted-foreground mb-6">{fairUse.subtitle}</p>
              <ul className="space-y-3 mb-6">
                {fairUse.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground italic">{fairUse.note}</p>
            </div>
          </div>

          {/* SECTION 9: What This Means for Your Business */}
          <div className="mb-16">
            <div className="mb-8 max-w-2xl space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{businessValue.title}</h2>
              <p className="text-muted-foreground">{businessValue.subtitle}</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4">
                {businessValue.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border/50">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 10: CTA */}
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
