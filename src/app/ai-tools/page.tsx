import Link from "next/link";
import { Channels } from "@/components/Channels";
import { MultiAgent } from "@/components/MultiAgent";
import { CustomTools } from "@/components/CustomTools";

export const metadata = {
  title: "AI & Tools",
  description: "Core AI capabilities and developer tools in mKcalling AI.",
};

export default function AiToolsPage() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">AI & Tools</span>
        </nav>

        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">AI & Tools</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Core AI capabilities and developer tools.
          </p>
        </div>

        <Channels />
        <MultiAgent />
        <CustomTools />
      </div>
    </section>
  );
}


