import Link from "next/link";
import { Channels } from "@/components/Channels";
import { MultiAgent } from "@/components/MultiAgent";
import { CustomTools } from "@/components/CustomTools";
import { Atmosphere } from "@/components/site/Atmosphere";
import { ChildPageHero } from "@/components/site/ChildPageHero";
import { ShelfRows } from "@/components/site/HeroStages";

export const metadata = {
  title: "AI & Tools",
  description: "Core AI capabilities and developer tools in mKcalling AI.",
};

export default function AiToolsPage() {
  return (
    <>
      <ChildPageHero
        eyebrow="AI & tools"
        title="AI & Tools"
        support="Core AI capabilities and developer tools."
        stageLabel="tools"
        stage={
          <ShelfRows
            rows={[
              { title: "Deploy Once, Reach Every Channel" },
              { title: "AI-Powered Multi-Agentic System" },
              { title: "Integrate with Your Business. No Brittle Glue." },
            ]}
          />
        }
        lead={
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">AI & Tools</span>
          </nav>
        }
      />
      <section className="relative overflow-hidden border-b border-border py-16 md:py-20">
        <Atmosphere variant="mist" />
        <div className="relative container mx-auto px-6">
        <Channels />
        <MultiAgent />
        <CustomTools />
      </div>
    </section>
    </>
  );
}


