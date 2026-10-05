
import { Multilingual } from "@/components/Multilingual";
import { Security } from "@/components/Security";
import { Pricing } from "@/components/Pricing";
import { Atmosphere } from "@/components/site/Atmosphere";
import { ChildPageHero } from "@/components/site/ChildPageHero";
import { PhraseTiles } from "@/components/site/HeroStages";

export const metadata = {
  title: "Global Reach",
  description: "Multilingual support, security, and pricing.",
};

const points = [
  "Reduce translation rework by 60%",
  "Consistent tone and compliance across locales",
  "Auto‑fallback and escalation routing",
];

export default function GlobalReachPage() {
  return (
    <>
      <ChildPageHero
        eyebrow="Global reach"
        title="Serve customers in 10+ languages-consistently."
        support="Multilingual NLU, locale routing and translation memory reduce per‑locale maintenance."
        stageLabel="locales"
        stage={<PhraseTiles items={points} />}
      />
      <section className="relative overflow-hidden border-b border-border py-16 md:py-20">
        <Atmosphere variant="mist" />
        <div className="relative container mx-auto px-6">
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
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
    </>
  );
}


