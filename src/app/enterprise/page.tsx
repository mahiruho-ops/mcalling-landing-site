
import { EnterpriseManagement } from "@/components/EnterpriseManagement";
import { MultiAgentOrchestration } from "@/components/MultiAgentOrchestration";
import { BusinessAutomation } from "@/components/BusinessAutomation";
import Link from "next/link";
import { Atmosphere } from "@/components/site/Atmosphere";
import { ChildPageHero } from "@/components/site/ChildPageHero";
import { StepFlow } from "@/components/site/HeroStages";

export const metadata = {
  title: "Enterprise",
  description: "Management, orchestration, and automation for enterprises.",
};

const rollout = [
  "Week 1–2: Use‑case design and integration plan",
  "Week 3–4: Build and pilot",
  "Week 5+: Scale and governance",
];

export default function EnterprisePage() {
  return (
    <>
      <ChildPageHero
        eyebrow="Enterprise"
        title="From pilot to global rollout."
        support="Orchestrate specialized agents, automate processes and integrate securely-at enterprise scale."
        stageLabel="rollout"
        stage={<StepFlow steps={rollout} />}
        actions={
          <Link href="/#interest" className="inline-flex items-center rounded-lg bg-gradient-primary px-5 py-3 text-primary-foreground transition-all hover:shadow-glow-primary">
            Request enterprise demo
          </Link>
        }
      />
      <section className="relative overflow-hidden border-b border-border py-16 md:py-20">
        <Atmosphere variant="mist" />
        <div className="relative container mx-auto px-6">
        <p className="mb-10 max-w-2xl text-sm text-muted-foreground">Who it’s for: CX leaders, Ops, IT and Platform teams.</p>
          <div className="text-center mb-10">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <a href="#management" className="hover:text-foreground transition-colors">Management</a>
            <span>·</span>
            <a href="#orchestration" className="hover:text-foreground transition-colors">Orchestration</a>
            <span>·</span>
            <a href="#automation" className="hover:text-foreground transition-colors">Automation</a>
          </div>
        </div>
        {/* <div className="max-w-3xl mx-auto mb-12">
          <div className="p-6 rounded-xl bg-card/50 border border-border/50">
            <h2 className="text-lg font-semibold mb-3">Implementation timeline</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>Week 1–2: Use‑case design and integration plan</div>
              <div>Week 3–4: Build and pilot</div>
              <div>Week 5+: Scale and governance</div>
            </div>
          </div>
        </div> */}

        <div id="management">
          <EnterpriseManagement />
        </div>
        <div id="orchestration">
          <MultiAgentOrchestration />
        </div>
        <div id="automation">
          <BusinessAutomation />
        </div>
      </div>
    </section>
    </>
  );
}


