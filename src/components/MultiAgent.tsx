import { Card } from "./ui/card";
import { Brain, GitBranch, Shield, Languages, Search, Zap } from "lucide-react";

const features = [
  {
    icon: GitBranch,
    title: "Multi-Agent Execution",
    description: "Sequential and parallel agent coordination for complex workflows",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Brain,
    title: "Memory Management",
    description: "Context-aware conversations with intelligent memory handling",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Shield,
    title: "Guardrails & Self-Reflection",
    description: "Built-in safety measures and response validation",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Languages,
    title: "Multi-Language Support",
    description: "Seamless communication in 100+ languages",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Search,
    title: "Hybrid Search",
    description: "Advanced retrieval with citations and context",
    color: "from-indigo-500 to-purple-500",
  },
  {
    icon: Zap,
    title: "Real-Time Processing",
    description: "Lightning-fast responses with edge computing",
    color: "from-yellow-500 to-orange-500",
  },
];

export const MultiAgent = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />
      
      <div className="container mx-auto px-6 relative">
          <div className="text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold">
            AI-Powered{" "}
            <span className="gradient-text-primary">
              Multi-Agentic System
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            What you get: faster time‑to‑resolution, fewer escalations, lower handle time
          </p>
        </div>
        {/* Outcomes one-liner above grid */}
        <div className="text-center mb-8 text-sm text-muted-foreground">
          Outcomes: faster time‑to‑resolution, fewer escalations, lower handle time
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Column - Text Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">What you get</h3>
              <p className="text-lg text-muted-foreground">
                Resolve complex requests in one flow and deliver safer, faster answers with global coverage.
              </p>
            </div>
            
            <div className="space-y-4">
              {features.slice(0, 3).map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex items-start gap-4 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className={`p-2 rounded-lg icon-gradient flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.title === "Multi-Agent Execution" ? "Resolve complex requests in one flow (sequential/parallel orchestration)." :
                        feature.title === "Memory Management" ? "Higher first-contact resolution via context retention and retrieval." :
                        feature.title === "Guardrails & Self-Reflection" ? "Safer responses with built-in validation and red-teaming." :
                        feature.title === "Multi-Language Support" ? "Serve 100+ languages to grow global CS coverage." :
                        feature.title === "Hybrid Search" ? "Reduce hallucinations with retrieval + citations." :
                        feature.title === "Real-Time Processing" ? "Under 1s p95 response on enterprise workloads." : feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Visual Cards */}
          <div className="grid gap-4">
            {features.slice(3).map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="p-6 bg-card/50 border-border/50 hover:border-primary/50 backdrop-blur-sm hover:shadow-card transition-all group animate-fade-in-up"
                  style={{ animationDelay: `${(index + 3) * 0.1}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl icon-gradient group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{
                        feature.title === "Multi-Language Support" ? "Serve 100+ languages to grow global CS coverage." :
                        feature.title === "Hybrid Search" ? "Reduce hallucinations with retrieval + citations." :
                        feature.title === "Real-Time Processing" ? "Under 1s p95 response on enterprise workloads." : feature.description
                      }</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
