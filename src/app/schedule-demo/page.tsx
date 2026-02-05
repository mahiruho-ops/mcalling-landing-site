import { Metadata } from "next";
import { scheduleDemoContent } from "@/content/mkcalling/scheduleDemo";
import { InterestForm } from "@/components/InterestForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Check, CheckCircle2, Users, X, Shield, Phone, Calendar, TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Schedule a Demo | mKcalling",
  description: "Schedule a demo of mKcalling and see how AI can automate inbound and outbound business calls — managed and built for Indian businesses.",
};

export default function ScheduleDemoPage() {
  const { hero, whatToExpect, whoIsThisFor, reassurance, cta } = scheduleDemoContent;

  return (
    <section className="py-24 pt-32">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* SECTION 1: Hero */}
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold">{hero.headline}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{hero.subheadline}</p>
            <p className="text-muted-foreground">{hero.supportingLine}</p>
          </div>

          {/* SECTION 2: What to Expect in the Demo */}
          <div className="mb-16 p-8 rounded-xl bg-card border border-primary/30">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{whatToExpect.title}</h2>
              <p className="text-muted-foreground mb-6">{whatToExpect.subtitle}</p>
              <div className="mb-6">
                <p className="text-sm font-semibold mb-4 text-muted-foreground">Demo Includes:</p>
                <ul className="space-y-3">
                  {whatToExpect.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-foreground font-medium italic">{whatToExpect.keyMessage}</p>
              </div>
            </div>
          </div>

          {/* SECTION 3: Who This Demo Is For */}
          <div className="mb-16">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold">{whoIsThisFor.title}</h2>
              <p className="text-muted-foreground">{whoIsThisFor.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <div className="p-8 rounded-xl bg-card border border-primary/30">
                <div className="flex items-center gap-3 mb-6">
                  <Check className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold">{whoIsThisFor.goodFit.title}</h3>
                </div>
                <ul className="space-y-3">
                  {whoIsThisFor.goodFit.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-8 rounded-xl bg-card border border-border/50">
                <div className="flex items-center gap-3 mb-6">
                  <X className="w-6 h-6 text-muted-foreground" />
                  <h3 className="text-xl font-bold">{whoIsThisFor.notRequired.title}</h3>
                </div>
                <ul className="space-y-3">
                  {whoIsThisFor.notRequired.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-muted-foreground mt-1">✗</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* SECTION 4: Contact / Demo Form */}
          <div id="interest" className="mb-16 p-8 rounded-xl bg-card border border-border/50">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold mb-2 text-center">Request a Demo</h2>
              <p className="text-muted-foreground mb-6 text-center">
                Fill out the form below and we'll get back to you to schedule a demo.
              </p>
              <InterestForm />
            </div>
          </div>

          {/* SECTION 5: Reassurance Section */}
          <div className="mb-16">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold">{reassurance.title}</h2>
              <p className="text-muted-foreground">{reassurance.subtitle}</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reassurance.points.map((point, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border/50">
                    <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 6: CTA (Reinforced) */}
          <div className="text-center p-12 rounded-xl bg-card border border-primary/30">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{cta.title}</h2>
            <div className="pt-4">
              <Link href="#interest">
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
