import { Metadata } from "next";
import { howItWorksContent } from "@/content/mkcalling/howItWorks";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Check, CheckCircle2, Phone, PhoneCall, Settings, TrendingUp, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works | mKcalling AI Calling Platform",
  description: "Learn how mKcalling automates inbound and outbound business calls with AI — fully configured and managed for Indian businesses.",
};

export default function HowItWorksPage() {
  const { hero, overview, step1, step2, step3, step4, step5, responsibilities, indiaFirst, cta } = howItWorksContent;

  return (
    <section className="py-24 pt-32">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* SECTION 1: Hero */}
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold">{hero.headline}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{hero.subheadline}</p>
            <p className="text-muted-foreground">{hero.supportingLine}</p>
            <div className="pt-4">
              <Link href="/schedule-demo">
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow-primary transition-all group">
                  {hero.primaryCTA}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          {/* SECTION 2: High-Level Flow Overview */}
          <div className="mb-16">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">{overview.title}</h2>
              <p className="text-muted-foreground">{overview.subtitle}</p>
            </div>
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {overview.steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-2 md:gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg border-2 border-primary/20">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-[140px] md:min-w-[180px]">
                      <p className="text-sm md:text-base font-medium text-foreground">{step}</p>
                    </div>
                    {index < overview.steps.length - 1 && (
                      <div className="hidden md:block flex-shrink-0 w-8 h-0.5 bg-primary/30 mx-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 3: Step 1 */}
          <div className="mb-16 p-8 rounded-xl bg-card border border-border/50">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">{step1.title}</h2>
                  <p className="text-muted-foreground mb-6">{step1.subtitle}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <ul className="space-y-3">
                    {step1.content.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-3 text-muted-foreground">Examples:</p>
                  <ul className="space-y-2">
                    {step1.examples.map((example, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-foreground">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-foreground font-medium italic">{step1.keyMessage}</p>
              </div>
            </div>
          </div>

          {/* SECTION 4: Step 2 */}
          <div className="mb-16 p-8 rounded-xl bg-card border border-border/50">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">{step2.title}</h2>
                  <p className="text-muted-foreground mb-6">{step2.subtitle}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <ul className="space-y-3">
                    {step2.content.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 rounded-lg bg-card border border-border/50">
                  <p className="text-sm font-semibold mb-3 text-foreground">{step2.importantNote.title}</p>
                  <ul className="space-y-2 mb-4">
                    {step2.importantNote.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-muted-foreground mt-1">✗</span>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm font-medium text-primary">{step2.importantNote.closing}</p>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 5: Step 3 */}
          <div className="mb-16 p-8 rounded-xl bg-card border border-border/50">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">{step3.title}</h2>
                  <p className="text-muted-foreground mb-6">{step3.subtitle}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="p-6 rounded-lg bg-card border border-primary/30">
                  <div className="flex items-center gap-3 mb-4">
                    <Phone className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold">{step3.inbound.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {step3.inbound.points.map((point, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 rounded-lg bg-card border border-border/50">
                  <div className="flex items-center gap-3 mb-4">
                    <PhoneCall className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-semibold">{step3.outbound.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {step3.outbound.points.map((point, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-sm text-foreground font-medium">{step3.billingReminder}</p>
              </div>
            </div>
          </div>

          {/* SECTION 6: Step 4 */}
          <div className="mb-16 p-8 rounded-xl bg-card border border-border/50">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">{step4.title}</h2>
                  <p className="text-muted-foreground mb-6">{step4.subtitle}</p>
                </div>
              </div>
              <div className="mb-6">
                <ul className="space-y-3">
                  {step4.content.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-foreground font-medium italic">{step4.keyMessage}</p>
              </div>
            </div>
          </div>

          {/* SECTION 7: Step 5 */}
          <div className="mb-16 p-8 rounded-xl bg-card border border-border/50">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xl">
                  5
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">{step5.title}</h2>
                  <p className="text-muted-foreground mb-6">{step5.subtitle}</p>
                </div>
              </div>
              <div className="mb-6">
                <ul className="space-y-3">
                  {step5.content.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-foreground font-medium">{step5.closing}</p>
              </div>
            </div>
          </div>

          {/* SECTION 8: What You Manage vs What We Manage */}
          <div className="mb-16">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold">{responsibilities.title}</h2>
              <p className="text-muted-foreground">{responsibilities.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="p-8 rounded-xl bg-card border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-bold">{responsibilities.youManage.title}</h3>
                </div>
                <ul className="space-y-3">
                  {responsibilities.youManage.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 rounded-xl bg-card border border-primary/30">
                <div className="flex items-center gap-3 mb-6">
                  <Settings className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-bold">{responsibilities.weManage.title}</h3>
                </div>
                <ul className="space-y-3">
                  {responsibilities.weManage.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* SECTION 9: Designed for Indian Businesses */}
          <div className="mb-16 p-8 rounded-xl bg-card border border-primary/30">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold">{indiaFirst.title}</h2>
              <p className="text-muted-foreground">{indiaFirst.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {indiaFirst.points.map((point, index) => (
                <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-background border border-border/50">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 10: CTA */}
          <div className="text-center p-12 rounded-xl bg-card border border-primary/30">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{cta.title}</h2>
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
  );
}
