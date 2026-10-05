import { homeContent } from "@/content/mkcalling/home";
import { BandHeader, SiteBand, featureCardClass } from "@/components/site/Atmosphere";

export const HowItWorksSection = () => {
  const { howItWorks } = homeContent;

  return (
    <SiteBand id="how-it-works" variant="soft">
      <BandHeader title={howItWorks.title} support={howItWorks.subtitle} />
      <div className="max-w-3xl space-y-4">
        {howItWorks.steps.map((step) => (
          <div key={step.number} className={`${featureCardClass} flex items-start gap-6`}>
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
              {step.number}
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <a href="/how-it-works" className="text-sm font-medium text-primary hover:underline">
          Learn more about the process →
        </a>
      </div>
    </SiteBand>
  );
};
