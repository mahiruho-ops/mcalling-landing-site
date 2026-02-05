
import { EnterpriseManagement } from "@/components/EnterpriseManagement";
import { MultiAgentOrchestration } from "@/components/MultiAgentOrchestration";
import { BusinessAutomation } from "@/components/BusinessAutomation";
import Link from "next/link";

export const metadata = {
  title: "Enterprise",
  description: "Management, orchestration, and automation for enterprises.",
};

export default function EnterprisePage() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        {/* <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Enterprise</span>
        </nav> */}

        <div className="text-center space-y-4 mb-12  flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold">From pilot to global rollout.</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Orchestrate specialized agents, automate processes and integrate securely-at enterprise scale.
          </p>
          <div className="text-sm text-muted-foreground">Who it’s for: CX leaders, Ops, IT and Platform teams.</div>
          <div className="pt-4">
            <Link href="/#interest" className="inline-flex items-center px-5 py-3 rounded-lg bg-gradient-primary text-primary-foreground hover:shadow-glow-primary transition-all">Request enterprise demo</Link>
          </div>
        </div>

        
        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-12">
            {[
              'Week 1–2: Use‑case design and integration plan',
              'Week 3–4: Build and pilot',
              'Week 5+: Scale and governance',
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-lg bg-card/50 border border-border/50 text-sm text-muted-foreground">
                {item}
              </div>
            ))}
          </div>
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
  );
}


