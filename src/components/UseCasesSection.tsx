import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeContent } from "@/content/mkcalling/home";
import { Button } from "@/components/ui/button";
import { BandHeader, SiteBand, featureCardClass } from "@/components/site/Atmosphere";

export const UseCasesSection = () => {
  const { useCases } = homeContent;

  return (
    <SiteBand id="use-cases" variant="mist">
      <BandHeader title={useCases.title} support={useCases.subtitle} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {useCases.items.map((item) => (
          <Link key={item.slug} href={`/use-cases/${item.slug}`} className={`group ${featureCardClass}`}>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <div className="flex items-center gap-2 text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Learn more
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-10">
        <Link href="/use-cases">
          <Button variant="outline" size="lg" className="border-primary/30 hover:border-primary/60">
            View All Use Cases
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </SiteBand>
  );
};
