import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pricingPageContent } from "@/content/mkcalling/pricingPage";

export function PricingFinalCTA() {
  const { finalCta } = pricingPageContent;

  return (
    <section className="py-20 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-30 pointer-events-none" aria-hidden />
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8 rounded-3xl border border-primary/20 bg-card/50 backdrop-blur-sm shadow-card px-6 py-12 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-balance">{finalCta.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{finalCta.subtitle}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
