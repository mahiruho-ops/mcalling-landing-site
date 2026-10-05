import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pricingPageContent } from "@/content/mkcalling/pricingPage";
import { Atmosphere } from "@/components/site/Atmosphere";

export function PricingFinalCTA() {
  const { finalCta } = pricingPageContent;

  return (
    <section className="relative overflow-hidden border-b border-border py-16 md:py-20">
      <Atmosphere variant="mist" />
      <div className="container relative mx-auto px-6">
        <div className="max-w-2xl space-y-8 rounded-3xl border border-primary/20 bg-card/50 px-6 py-12 shadow-card backdrop-blur-sm md:px-12">
          <h2 className="text-2xl font-semibold tracking-tight text-balance md:text-3xl">{finalCta.title}</h2>
          <p className="max-w-2xl text-lg text-muted-foreground">{finalCta.subtitle}</p>
          <div className="flex flex-col items-start gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-gradient-primary hover:shadow-glow-primary transition-all group w-full sm:w-auto">
              <Link href="/schedule-demo">
                {finalCta.primary}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/30 hover:bg-card/50 w-full sm:w-auto">
              <Link href={finalCta.secondaryHref}>{finalCta.secondary}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
