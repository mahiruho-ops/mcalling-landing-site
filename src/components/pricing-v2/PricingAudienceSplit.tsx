"use client";

import { Building2, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { pricingPageContent } from "@/content/mkcalling/pricingPage";
import { cn } from "@/lib/utils";

export function PricingAudienceSplit() {
  const { audience } = pricingPageContent;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="pricing-paths" className="py-16 md:py-20 scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">{audience.title}</h2>
            <p className="text-muted-foreground text-lg">{audience.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:items-stretch">
            <Card
              className={cn(
                "h-full flex flex-col border-border/60 bg-card/50 backdrop-blur-sm shadow-card hover:border-primary/35 transition-colors",
              )}
            >
              <CardHeader className="space-y-0 flex flex-col p-5 pb-3">
                <div className="mb-3 flex items-start gap-2.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Rocket className="h-4 w-4" aria-hidden />
                  </span>
                  <CardTitle className="text-lg md:text-xl leading-snug">{audience.smb.title}</CardTitle>
                </div>
                <CardDescription className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {audience.smb.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto p-5 pt-0">
                <Button
                  type="button"
                  className="w-full bg-gradient-primary hover:shadow-glow-primary"
                  onClick={() => scrollTo("smb-configurator")}
                >
                  {audience.smb.cta}
                </Button>
              </CardContent>
            </Card>

            <Card
              className={cn(
                "h-full flex flex-col border-border/60 bg-card/50 backdrop-blur-sm shadow-card hover:border-cyan-500/30 transition-colors",
              )}
            >
              <CardHeader className="space-y-0 flex flex-col p-5 pb-3">
                <div className="mb-3 flex items-start gap-2.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                    <Building2 className="h-4 w-4" aria-hidden />
                  </span>
                  <CardTitle className="text-lg md:text-xl leading-snug">{audience.enterprise.title}</CardTitle>
                </div>
                <CardDescription className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {audience.enterprise.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto p-5 pt-0">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-cyan-500/40 hover:bg-cyan-500/5"
                  onClick={() => scrollTo("enterprise-configurator")}
                >
                  {audience.enterprise.cta}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
