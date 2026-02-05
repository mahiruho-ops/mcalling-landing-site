import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { homeContent } from "@/content/mkcalling/home";
import { Button } from "@/components/ui/button";

export const UseCasesSection = () => {
  const { useCases } = homeContent;

  return (
    <section id="use-cases" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold">
            {useCases.title}
          </h2>
          <p className="text-xl text-muted-foreground">
            {useCases.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {useCases.items.map((item, index) => (
            <Link
              key={item.slug}
              href={`/use-cases/${item.slug}`}
              className="group p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-card animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-3">
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
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
          <Link href="/use-cases">
            <Button variant="outline" size="lg" className="border-primary/30 hover:border-primary/60">
              View All Use Cases
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
