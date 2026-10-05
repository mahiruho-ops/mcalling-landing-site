import { X, Clock, Users, AlertCircle, TrendingUp, DollarSign, Calendar } from "lucide-react";
import { homeContent } from "@/content/mkcalling/home";
import { BandHeader, SiteBand, featureCardClass } from "@/components/site/Atmosphere";

const iconMap = {
  "Missed Calls & Delays": Clock,
  "High Attrition": Users,
  "Inconsistent Quality": AlertCircle,
  "Limited Scalability": TrendingUp,
  "High Effective Cost": DollarSign,
  "Weekends & Holidays Gap": Calendar,
};

export const ProblemSection = () => {
  const { problem } = homeContent;

  return (
    <SiteBand variant="soft">
      <BandHeader title={problem.title} support={problem.description} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {problem.points.map((point) => {
          const Icon = iconMap[point.title as keyof typeof iconMap] || X;
          return (
            <div key={point.title} className={featureCardClass}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 rounded-lg bg-destructive/10 p-2 text-destructive">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">{point.title}</h3>
                  <p className="text-sm text-muted-foreground">{point.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SiteBand>
  );
};
