import { Headphones, Phone, Timer, Workflow } from "lucide-react";
import { pricingPageContent } from "@/content/mkcalling/pricingPage";
import { cn } from "@/lib/utils";

const icons = {
  workflow: Workflow,
  phone: Phone,
  timer: Timer,
  headset: Headphones,
} as const;

export function PricingHowItWorks() {
  const { howItWorks } = pricingPageContent;

  return (
    <section id="how-pricing-works" className="py-16 md:py-20 scroll-mt-28 border-y border-border/40 bg-card/20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">{howItWorks.title}</h2>
            <p className="text-muted-foreground text-lg">{howItWorks.subtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {howItWorks.cards.map((card) => {
              const Icon = icons[card.icon];
              return (
                <div
                  key={card.key}
                  className={cn(
                    "rounded-2xl border border-border/50 bg-card/60 p-5 shadow-card backdrop-blur-sm",
                    "flex flex-col gap-3",
                  )}
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="font-semibold text-lg leading-snug">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
