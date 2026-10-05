import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { homeContent } from "@/content/mkcalling/home";
import { Badge } from "@/components/ui/badge";
import { BandHeader, SiteBand, featureCardClass } from "@/components/site/Atmosphere";

export const IndustriesSection = () => {
  const { industries } = homeContent;
  const highlightedIndustry = industries.items.find((item) => item.highlighted);
  const regularIndustries = industries.items.filter((item) => !item.highlighted);

  return (
    <SiteBand id="industries" variant="soft">
      <BandHeader title={industries.title} support={industries.subtitle} />

      {highlightedIndustry && (
        <div className="mb-8 max-w-3xl">
          <Link
            href={`/industries/${highlightedIndustry.slug}`}
            className="group block rounded-2xl border border-primary/40 bg-card p-8 shadow-card transition duration-300 hover:-translate-y-1 hover:border-primary/70"
          >
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="default" className="bg-primary text-primary-foreground">
                  <Star className="mr-1 h-3 w-3" />
                  Featured
                </Badge>
                <h3 className="text-2xl font-semibold text-foreground transition-colors group-hover:text-primary">
                  {highlightedIndustry.name}
                </h3>
              </div>
              <p className="text-muted-foreground">{highlightedIndustry.description}</p>
              <div className="flex items-center gap-2 text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Explore Banking DSA solutions
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {regularIndustries.map((industry) => (
          <Link key={industry.slug} href={`/industries/${industry.slug}`} className={`group ${featureCardClass}`}>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                {industry.name}
              </h3>
              <p className="text-sm text-muted-foreground">{industry.description}</p>
              <div className="flex items-center gap-2 text-sm text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Learn more
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <Link href="/industries">
          <span className="inline-flex items-center rounded-md border border-primary/30 px-6 py-3 text-sm font-medium transition-all hover:border-primary/60 hover:bg-card/50">
            View All Industries
            <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        </Link>
      </div>
    </SiteBand>
  );
};
