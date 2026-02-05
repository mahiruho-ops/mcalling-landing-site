import { Check } from "lucide-react";
import { homeContent } from "@/content/mkcalling/home";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const PricingTeaserSection = () => {
  const { pricingTeaser } = homeContent;

  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-glow opacity-20" />
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold">
            {pricingTeaser.title}
          </h2>
          <p className="text-xl text-muted-foreground">
            {pricingTeaser.subtitle}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="p-8 rounded-2xl bg-card border border-primary/30 backdrop-blur-sm">
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {pricingTeaser.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground">{feature}</span>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Link href="/pricing">
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow-primary transition-all">
                  View Detailed Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
