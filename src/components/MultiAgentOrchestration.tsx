import { Card } from "./ui/card";
import { Network, Users, Zap, Target, Brain, GitBranch, MessageSquare, Settings } from "lucide-react";

const orchestrationFeatures = [
  {
    icon: Network,
    title: "Agent Communication",
    description: "Fewer retries via reliable message routing",
    features: ["Message Routing", "Protocol Standards", "Event Broadcasting", "Response Coordination"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "Task Distribution",
    description: "Higher throughput with smart load balancing",
    features: ["Load Balancing", "Task Queuing", "Priority Management", "Resource Allocation"],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Brain,
    title: "Collaborative Problem Solving",
    description: "Better FCR via collective reasoning",
    features: ["Consensus Building", "Knowledge Sharing", "Collective Intelligence", "Solution Synthesis"],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Target,
    title: "Agent Specialization",
    description: "Faster answers with role‑based expertise",
    features: ["Domain Expertise", "Skill Matching", "Capability Routing", "Specialized Training"],
    color: "from-orange-500 to-red-500",
  },
];

const orchestrationCapabilities = [
  {
    icon: Zap,
    title: "Real-Time Coordination",
    description: "Instant agent coordination and response synchronization",
  },
  {
    icon: GitBranch,
    title: "Workflow Orchestration",
    description: "Visual agent coordination workflows and process management",
  },
  {
    icon: MessageSquare,
    title: "Communication Protocols",
    description: "Standardized communication patterns and message formats",
  },
  {
    icon: Settings,
    title: "Dynamic Configuration",
    description: "Runtime agent configuration and capability adjustment",
  },
];

export const MultiAgentOrchestration = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center space-y-4 mb-6 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold">
            Intelligent{" "}
            <span className="gradient-text-primary">
              Agent Orchestration
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Resolve complex requests in one flow with task distribution and real‑time coordination.
          </p>
        </div>

        <div className="text-center mb-10 text-sm text-muted-foreground">
          Outcomes: faster resolution, fewer escalations, higher throughput
        </div>

        {/* Core Orchestration Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          {orchestrationFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="p-8 bg-card/50 border-border/50 hover:border-primary/50 backdrop-blur-sm hover:shadow-card transition-all group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-6">
                  <div className={`p-4 rounded-xl icon-gradient w-fit group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                  </div>

                  <div className="space-y-2">
                    {feature.features.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Orchestration Capabilities */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-6xl mx-auto">
          {orchestrationCapabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <div
                key={capability.title}
                className="text-center space-y-3 animate-fade-in-up"
                style={{ animationDelay: `${(index + 4) * 0.1}s` }}
              >
                <div className="p-3 rounded-xl bg-gradient-glow w-fit mx-auto group-hover:shadow-glow-primary transition-all">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{capability.title}</h3>
                <p className="text-sm text-muted-foreground">{capability.description}</p>
              </div>
            );
          })}
        </div>

        {/* Agent Network Visualization */}
        <div className="mt-16 max-w-6xl mx-auto">
          <Card className="p-8 bg-card/30 border-primary/20 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Multi-Agent Network Architecture</h3>
              <p className="text-muted-foreground">Visual representation of agent coordination and communication</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-lg bg-card/50">
                <div className="p-4 rounded-full bg-primary/20 text-primary mx-auto mb-3 w-fit">
                  <Brain className="w-8 h-8" />
                </div>
                <h4 className="font-semibold mb-2">AI Coordinator</h4>
                <p className="text-sm text-muted-foreground">Central orchestration and decision making</p>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-card/50">
                <div className="p-4 rounded-full bg-secondary/20 text-secondary mx-auto mb-3 w-fit">
                  <Users className="w-8 h-8" />
                </div>
                <h4 className="font-semibold mb-2">Specialized Agents</h4>
                <p className="text-sm text-muted-foreground">Domain-specific AI agents with unique capabilities</p>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-card/50">
                <div className="p-4 rounded-full bg-green-500/20 text-green-500 mx-auto mb-3 w-fit">
                  <Network className="w-8 h-8" />
                </div>
                <h4 className="font-semibold mb-2">Communication Layer</h4>
                <p className="text-sm text-muted-foreground">Real-time messaging and coordination protocols</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
