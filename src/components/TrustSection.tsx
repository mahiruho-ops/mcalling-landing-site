import { Shield, FileText, Globe, Eye, Heart } from "lucide-react";
import { homeContent } from "@/content/mkcalling/home";

const iconMap = {
  "DNC Handling": Shield,
  "Recordings & Audit Logs": FileText,
  "India-Hosted Data": Globe,
  "AI Disclosure": Eye,
  "Ethical Practices": Heart,
};

export const TrustSection = () => {
  const { trust } = homeContent;

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold">
            {trust.title}
          </h2>
          <p className="text-xl text-muted-foreground">
            {trust.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {trust.points.map((point, index) => {
            const Icon = iconMap[point.title as keyof typeof iconMap] || Shield;
            return (
              <div
                key={index}
                className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-card animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary w-fit">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground">{point.title}</h3>
                  <p className="text-sm text-muted-foreground">{point.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a href="/trust-compliance" className="text-primary hover:underline text-sm font-medium">
            Learn more about Trust & Compliance →
          </a>
        </div>
      </div>
    </section>
  );
};
