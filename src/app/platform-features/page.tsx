
import { TemplateAgents } from "@/components/TemplateAgents";
import { VisualCanvasBuilder } from "@/components/VisualCanvasBuilder";
import { AdvancedAnalytics } from "@/components/AdvancedAnalytics";
import { Atmosphere } from "@/components/site/Atmosphere";
import { ChildPageHero } from "@/components/site/ChildPageHero";
import { PhraseTiles } from "@/components/site/HeroStages";

export const metadata = {
  title: "Platform Features",
  description: "Templates, builders, and analytics in mKcalling AI.",
};

const points = [
  "Template agents to accelerate common use cases",
  "Visual canvas for rapid, governed changes",
  "Analytics to optimize quality, cost and SLAs",
];

export default function PlatformFeaturesPage() {
  return (
    <>
      <ChildPageHero
        eyebrow="Platform"
        title="Platform Features"
        support="Design once, orchestrate anywhere. Build multi‑agent flows, reuse components, and monitor outcomes."
        stageLabel="platform"
        stage={<PhraseTiles items={points} />}
      />
      <section className="relative overflow-hidden border-b border-border py-16 md:py-20">
        <Atmosphere variant="mist" />
        <div className="relative container mx-auto px-6">
        <div className="mb-10 text-left">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
    </>
  );
}


