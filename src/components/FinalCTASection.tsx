import { ArrowRight } from "lucide-react";
import { homeContent } from "@/content/mkcalling/home";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BandHeader, SiteBand } from "@/components/site/Atmosphere";

export const FinalCTASection = () => {
  const { finalCTA } = homeContent;

  return (
    <SiteBand variant="mist">
      <BandHeader title={finalCTA.title} support={finalCTA.subtitle} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link href="/schedule-demo">
          <Button size="lg" className="bg-gradient-primary transition-all hover:shadow-glow-primary group">
            {finalCTA.primaryCTA}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
        <Link href="/pricing">
          <Button size="lg" variant="outline" className="border-primary/30 hover:border-primary/60 hover:bg-card/50">
            {finalCTA.secondaryCTA}
          </Button>
        </Link>
      </div>
    </SiteBand>
  );
};
