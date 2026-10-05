import { Check } from "lucide-react";
import { homeContent } from "@/content/mkcalling/home";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BandHeader, SiteBand } from "@/components/site/Atmosphere";

export const PricingTeaserSection = () => {
  const { pricingTeaser } = homeContent;

  return (
    <SiteBand id="pricing" variant="mist">
      <BandHeader title={pricingTeaser.title} support={pricingTeaser.subtitle} />
      <div className="max-w-3xl rounded-2xl border border-border bg-card p-8 shadow-card">
        <div className="mb-8 grid gap-4 md:grid-cols-2">
          {pricingTeaser.features.map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <Check className="h-5 w-5 flex-shrink-0 text-primary" />
              <span className="text-sm text-foreground">{feature}</span>
            </div>
          ))}
        </div>
        <Link href="/pricing">
          <Button size="lg" className="bg-gradient-primary transition-all hover:shadow-glow-primary">
            View Detailed Pricing
          </Button>
        </Link>
      </div>
    </SiteBand>
  );
};
