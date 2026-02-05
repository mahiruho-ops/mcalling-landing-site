import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { homeContent } from "@/content/mkcalling/home";
import { Badge } from "@/components/ui/badge";

export const IndustriesSection = () => {
  const { industries } = homeContent;
  const highlightedIndustry = industries.items.find(item => item.highlighted);
  const regularIndustries = industries.items.filter(item => !item.highlighted);

  return (
    <section id="industries" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold">
            {industries.title}
          </h2>
          <p className="text-xl text-muted-foreground">
            {industries.subtitle}
          </p>
        </div>

        {/* Highlighted Industry - Banking DSA */}
        {highlightedIndustry && (
          <div className="max-w-4xl mx-auto mb-12">
            <Link
              href={`/industries/${highlightedIndustry.slug}`}
              className="group block p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/50 hover:border-primary transition-all hover:shadow-glow-primary animate-fade-in-up"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="bg-primary text-primary-foreground">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {highlightedIndustry.name}
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    {highlightedIndustry.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore Banking DSA solutions
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Regular Industries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {regularIndustries.map((industry, index) => (
            <Link
              key={industry.slug}
              href={`/industries/${industry.slug}`}
              className="group p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-card animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-3">
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {industry.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {industry.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/industries">
            <button className="px-6 py-3 rounded-lg border border-primary/30 hover:border-primary/60 hover:bg-card/50 transition-all text-sm font-medium">
              View All Industries
              <ArrowRight className="inline-block ml-2 w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
