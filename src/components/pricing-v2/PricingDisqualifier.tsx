import { pricingPageContent } from "@/content/mkcalling/pricingPage";

export function PricingDisqualifier() {
  return (
    <div className="container mx-auto px-6 pb-8">
      <div className="max-w-3xl mx-auto">
        <p className="text-center text-sm text-muted-foreground leading-relaxed border border-dashed border-red-500/25 dark:border-red-500/20 rounded-xl px-4 py-3 bg-red-500/[0.06] dark:bg-red-950/35">
          {pricingPageContent.disqualifier.text}
        </p>
      </div>
    </div>
  );
}
