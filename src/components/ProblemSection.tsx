import { X, Clock, Users, AlertCircle, TrendingUp, DollarSign, Calendar } from "lucide-react";
import { homeContent } from "@/content/mkcalling/home";

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
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold">
            {problem.title}
          </h2>
          <p className="text-xl text-muted-foreground">
            {problem.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {problem.points.map((point, index) => {
            const Icon = iconMap[point.title as keyof typeof iconMap] || X;
            return (
              <div
                key={index}
                className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-card animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-destructive/10 text-destructive flex-shrink-0">
                    <Icon className="w-5 h-5" />
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
      </div>
    </section>
  );
};
