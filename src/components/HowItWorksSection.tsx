import { CheckCircle2 } from "lucide-react";
import { homeContent } from "@/content/mkcalling/home";

export const HowItWorksSection = () => {
  const { howItWorks } = homeContent;

  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold">
            {howItWorks.title}
          </h2>
          <p className="text-xl text-muted-foreground">
            {howItWorks.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {howItWorks.steps.map((step, index) => (
            <div
              key={index}
              className="flex gap-6 items-start p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                {step.number}
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-lg text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="/how-it-works" className="text-primary hover:underline text-sm font-medium">
            Learn more about the process →
          </a>
        </div>
      </div>
    </section>
  );
};
