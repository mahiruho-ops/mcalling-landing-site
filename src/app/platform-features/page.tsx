
import { TemplateAgents } from "@/components/TemplateAgents";
import { VisualCanvasBuilder } from "@/components/VisualCanvasBuilder";
import { AdvancedAnalytics } from "@/components/AdvancedAnalytics";

export const metadata = {
  title: "Platform Features",
  description: "Templates, builders, and analytics in mKcalling AI.",
};

export default function PlatformFeaturesPage() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
      

        <div className="text-center space-y-4 mb-12  flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold">Platform Features</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Design once, orchestrate anywhere. Build multi‑agent flows, reuse components, and monitor outcomes.
          </p>
        </div>
          <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-12">
            {[
              'Template agents to accelerate common use cases',
              'Visual canvas for rapid, governed changes',
              'Analytics to optimize quality, cost and SLAs',
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-lg bg-card/50 border border-border/50 text-sm text-muted-foreground">
                {item}
              </div>
            ))}
          </div>
        <div className="text-center mb-10">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <a href="#templates" className="hover:text-foreground transition-colors">Templates</a>
            <span>·</span>
            <a href="#builder" className="hover:text-foreground transition-colors">Builder</a>
            <span>·</span>
            <a href="#analytics" className="hover:text-foreground transition-colors">Analytics</a>
          </div>
        </div>

        <div id="templates">
          <TemplateAgents />
        </div>
        <div id="builder">
          <VisualCanvasBuilder />
        </div>
        <div id="analytics">
          <AdvancedAnalytics />
        </div>
      </div>
    </section>
  );
}


