import { Metadata } from "next";
import { productContent } from "@/content/mkcalling/product";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2, X, MessageSquare, Phone, PhoneCall, Calendar, Hash, BarChart, Settings, Shield, Plug, Check } from "lucide-react";

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
    <section className="py-24 pt-32">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* SECTION 1: Product Hero */}
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold">{hero.headline}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{hero.subheadline}</p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              {hero.bullets.map((bullet, index) => (
                <div key={index} className="px-4 py-2 rounded-lg bg-card/50 border border-border/50 text-sm">
                  {bullet}
                </div>
              ))}
            </div>
            <div className="pt-4">
              <Link href="/schedule-demo">
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow-primary transition-all group">
                  {hero.primaryCTA}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          {/* SECTION 2: What mKcalling Is (and Is Not) */}
          <div className="mb-16">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">{whatItIs.title}</h2>
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
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">{capabilities.title}</h2>
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
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold">{managedService.title}</h2>
              <p className="text-muted-foreground">{managedService.subtitle}</p>
            </div>
            <p className="text-center text-lg text-foreground mb-8 max-w-3xl mx-auto">
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
              <div className="text-center space-y-4 mb-6">
                <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mx-auto">
                  <Shield className="w-6 h-6" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">{humanInLoop.title}</h2>
                <p className="text-muted-foreground">{humanInLoop.subtitle}</p>
              </div>
              <p className="text-center text-foreground mb-4 max-w-3xl mx-auto">
                {humanInLoop.description}
              </p>
              <p className="text-center text-sm text-muted-foreground italic">
                {humanInLoop.note}
              </p>
            </div>
          </div>

          {/* SECTION 6: Integrations & Extensibility */}
          <div className="mb-16">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">{integrations.title}</h2>
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
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">{whyChoose.title}</h2>
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
