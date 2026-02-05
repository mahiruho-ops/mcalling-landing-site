import { Check, Sparkles, DollarSign, Settings, Globe, Users } from "lucide-react";
import { homeContent } from "@/content/mkcalling/home";

const iconMap = {
  "All-Inclusive Predictable Pricing": DollarSign,
  "No Billing on Failed Attempts": Check,
  "Managed Setup & Tuning": Settings,
  "India-First by Design": Globe,
  "Human-in-the-Loop": Users,
};

export const WhyMkcallingSection = () => {
  const { differentiators } = homeContent;

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-glow opacity-20" />
      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold">
            {differentiators.title}
          </h2>
          <p className="text-xl text-muted-foreground">
            {differentiators.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {differentiators.points.map((point, index) => {
            const Icon = iconMap[point.title as keyof typeof iconMap] || Sparkles;
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
      </div>
    </section>
  );
};
