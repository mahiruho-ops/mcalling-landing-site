import { Shield, FileText, Globe, Eye, Heart, Lock } from "lucide-react";
import { homeContent } from "@/content/mkcalling/home";
import { BandHeader, SiteBand, featureCardClass } from "@/components/site/Atmosphere";

const iconMap = {
  "DNC Handling": Shield,
  "Recordings & Audit Logs": FileText,
  "India-Hosted Data": Globe,
  "AI Disclosure": Eye,
  "Ethical Practices": Heart,
  "Role-Based Access Control": Lock,
};

export const TrustSection = () => {
  const { trust } = homeContent;

  return (
    <SiteBand variant="soft">
      <BandHeader title={trust.title} support={trust.subtitle} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trust.points.map((point) => {
          const Icon = iconMap[point.title as keyof typeof iconMap] || Shield;
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
      <div className="mt-10">
        <a href="/trust-compliance" className="text-sm font-medium text-primary hover:underline">
          Learn more about Trust & Compliance →
        </a>
      </div>
    </SiteBand>
  );
};
