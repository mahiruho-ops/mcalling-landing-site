import { Check, Sparkles, DollarSign, Settings, Globe, Users, Languages } from "lucide-react";
import { homeContent } from "@/content/mkcalling/home";
import { BandHeader, SiteBand, featureCardClass } from "@/components/site/Atmosphere";

const iconMap = {
  "All-Inclusive Predictable Pricing": DollarSign,
  "No Billing on Failed Attempts": Check,
  "Managed Setup & Tuning": Settings,
  "India-First by Design": Globe,
  "Human-in-the-Loop": Users,
  "Multilingual Indian Language Support": Languages,
};

export const WhyMkcallingSection = () => {
  const { differentiators } = homeContent;

  return (
    <SiteBand variant="mist">
      <BandHeader title={differentiators.title} support={differentiators.subtitle} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {differentiators.points.map((point) => {
          const Icon = iconMap[point.title as keyof typeof iconMap] || Sparkles;
          return (
            <div key={point.title} className={featureCardClass}>
              <div className="space-y-3">
                <div className="w-fit rounded-lg bg-primary/10 p-2 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{point.title}</h3>
                <p className="text-sm text-muted-foreground">{point.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </SiteBand>
  );
};
