import { ArrowRight } from "lucide-react";
import { homeContent } from "@/content/mkcalling/home";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const FinalCTASection = () => {
  const { finalCTA } = homeContent;

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              {finalCTA.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {finalCTA.subtitle}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/schedule-demo">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow-primary transition-all group">
                {finalCTA.primaryCTA}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-primary/30 hover:border-primary/60 hover:bg-card/50">
                {finalCTA.secondaryCTA}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
