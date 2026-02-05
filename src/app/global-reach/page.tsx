
import { Multilingual } from "@/components/Multilingual";
import { Security } from "@/components/Security";
import { Pricing } from "@/components/Pricing";

export const metadata = {
  title: "Global Reach",
  description: "Multilingual support, security, and pricing.",
};

export default function GlobalReachPage() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
      

        <div className="text-center space-y-4 mb-12  flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold">Serve customers in 10+ languages-consistently.</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Multilingual NLU, locale routing and translation memory reduce per‑locale maintenance.
          </p>
        </div>

        

        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-12">
          {["Reduce translation rework by 60%","Consistent tone and compliance across locales","Auto‑fallback and escalation routing"].map((b, i) => (
            <div key={i} className="p-4 rounded-lg bg-card/50 border border-border/50 text-center text-sm text-muted-foreground">{b}</div>
          ))}
        </div>
        <div className="text-center mb-10">
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
            <a href="#multilingual" className="hover:text-foreground transition-colors">Multilingual</a>
            <span>·</span>
            <a href="#security" className="hover:text-foreground transition-colors">Security</a>
            <span>·</span>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          </div>
        </div>
        <div id="multilingual">
          <Multilingual />
        </div>
        <div id="security">
          <Security />
        </div>
        <Pricing />
      </div>
    </section>
  );
}


