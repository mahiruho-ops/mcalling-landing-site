import { Card } from "./ui/card";
import { Wrench, Code, BarChart3, Puzzle } from "lucide-react";

const tools = [
  {
    icon: Wrench,
    title: "Tool Registry & Sandbox",
    description: "Secure execution environment for custom integrations",
    color: "from-slate-500 to-gray-600",
  },
  {
    icon: Code,
    title: "Custom Integrations",
    description: "Build and deploy your own tools with our SDK",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: BarChart3,
    title: "Usage Monitoring",
    description: "Track performance and optimize tool efficiency",
    color: "from-blue-500 to-indigo-500",
  },
  {
    icon: Puzzle,
    title: "API & SDK Support",
    description: "Comprehensive developer tools and documentation",
    color: "from-violet-500 to-purple-500",
  },
];

export const CustomTools = () => {
  return (
    <section id="tools" className="py-24 relative bg-card/30">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold">
            Integrate with Your Business. No Brittle Glue.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect CRMs, ERPs, billing and data sources with a secure tool sandbox and SDK. Track usage and performance for each tool.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Column - Visual Cards */}
          <div className="grid gap-6">
            {tools.slice(0, 2).map((tool, index) => {
              const Icon = tool.icon;
              return (
                <Card
                  key={tool.title}
                  className="p-6 bg-card border-border/50 hover:border-primary/50 hover:shadow-card transition-all group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-xl icon-gradient group-hover:scale-110 transition-transform`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{tool.title}</h3>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Right Column - Text Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Developer-Friendly Platform</h3>
              <p className="text-lg text-muted-foreground">
                Build, deploy, and scale custom integrations with our comprehensive toolkit 
                and extensive API support.
              </p>
            </div>
            
            <div className="space-y-4">
              {tools.slice(2).map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <div key={tool.title} className="flex items-start gap-4 animate-fade-in-up" style={{ animationDelay: `${(index + 2) * 0.1}s` }}>
                    <div className={`p-2 rounded-lg icon-gradient flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{tool.title}</h4>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </div>
                  </div>
                );
              })}
              <div className="pt-2 space-y-2">
                <div className="text-sm text-muted-foreground">Accelerate integration delivery by 50–70%.</div>
                <div className="text-sm text-muted-foreground">Hardened sandbox to protect systems of record.</div>
                <div className="text-sm text-muted-foreground">SDKs for TypeScript and Python.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
