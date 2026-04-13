import { pricingPageContent } from "@/content/mkcalling/pricingPage";

export function PricingGstNotice() {
  const { gst } = pricingPageContent;

  return (
    <div className="border-y border-border/60 bg-muted/20">
      <div className="container mx-auto px-6 py-3">
        <p className="text-center text-xs sm:text-sm text-muted-foreground max-w-4xl mx-auto leading-relaxed">
          {gst.shortLine}
        </p>
      </div>
    </div>
  );
}
