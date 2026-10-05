import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { pricingPageContent } from "@/content/mkcalling/pricingPage";
import { ChildPageHero } from "@/components/site/ChildPageHero";

export function PricingHero() {
  const { hero, audience } = pricingPageContent;

  return (
    <ChildPageHero
      eyebrow="Pricing"
      title={hero.headline}
      support={
        <>
          <p>{hero.subheadline}</p>
          <p className="text-sm font-medium text-foreground/90 md:text-base">{hero.qualifier}</p>
        </>
      }
      stageLabel="investment"
      stage={
        <>
          <div className="border-b border-border px-5 py-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-primary">Typical investment</p>
            <p className="mt-2 text-base font-semibold leading-snug tracking-tight">{hero.investmentAnchor}</p>
          </div>
          <div className="grid sm:grid-cols-2 sm:divide-x sm:divide-border">
            <Link href="#smb-configurator" className="group block px-5 py-4 transition hover:bg-muted/40">
              <p className="text-sm font-semibold tracking-tight group-hover:text-primary">{audience.smb.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{audience.smb.description}</p>
              <p className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                {audience.smb.cta}
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </p>
            </Link>
            <Link href="#enterprise-configurator" className="group block border-t border-border px-5 py-4 transition hover:bg-muted/40 sm:border-t-0">
              <p className="text-sm font-semibold tracking-tight group-hover:text-primary">{audience.enterprise.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{audience.enterprise.description}</p>
              <p className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                {audience.enterprise.cta}
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </p>
            </Link>
          </div>
        </>
      }
      actions={
        <>
          <Button asChild size="lg" className="bg-gradient-primary transition-all hover:shadow-glow-primary">
            <Link href="#pricing-paths">
              {hero.primaryCta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary/30 hover:bg-card/80">
            <Link href="/schedule-demo">{hero.secondaryCta}</Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="text-muted-foreground hover:text-foreground">
            <Link href="#how-pricing-works">{hero.tertiaryCta}</Link>
          </Button>
        </>
      }
    />
  );
}
