import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { pricingPageContent } from "@/content/mkcalling/pricingPage";

export function PricingHero() {
  const { hero } = pricingPageContent;

  return (
    <section className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-25 pointer-events-none" aria-hidden />
      <div className="container mx-auto px-6 relative">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <p className="text-sm font-medium text-primary/90 uppercase tracking-wide">Pricing</p>
          <h1 className="text-4xl md:text-5xl lg:text-[2.75rem] font-bold leading-tight text-balance">{hero.headline}</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">{hero.subheadline}</p>
          <p className="text-sm md:text-base text-foreground/90 font-medium">{hero.qualifier}</p>
          <div className="rounded-2xl border border-primary/25 bg-card/60 backdrop-blur-sm shadow-card px-5 py-4 max-w-2xl mx-auto">
            <p className="text-sm md:text-base text-muted-foreground">
              <span className="text-foreground font-medium">Typical investment: </span>
              {hero.investmentAnchor}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button asChild size="lg" className="bg-gradient-primary hover:shadow-glow-primary transition-all w-full sm:w-auto">
              <Link href="#pricing-paths">
                {hero.primaryCta}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/30 hover:bg-card/80 w-full sm:w-auto">
              <Link href="/schedule-demo">{hero.secondaryCta}</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-muted-foreground hover:text-foreground w-full sm:w-auto">
              <Link href="#how-pricing-works">{hero.tertiaryCta}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
