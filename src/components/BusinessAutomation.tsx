import { Card } from "./ui/card";
import { Workflow, Zap, Target, TrendingUp, Settings, BarChart3, Link, Clock } from "lucide-react";

const automationFeatures = [
  {
    icon: Workflow,
    title: "Workflow Orchestration",
    description: "Reduce time-to-automation with drag-and-drop flows",
    features: ["Visual Workflow Builder", "Process Automation", "Conditional Logic", "Error Handling"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Link,
    title: "Integration Hub",
    description: "Connect CRMs/ERPs faster and avoid brittle scripts",
    features: ["API Integrations", "Webhook Support", "Data Synchronization", "Real-time Updates"],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Target,
    title: "Process Optimization",
    description: "Find bottlenecks and improve SLAs automatically",
    features: ["Performance Analysis", "Optimization Suggestions", "Bottleneck Detection", "Efficiency Metrics"],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: BarChart3,
    title: "Automation Analytics",
    description: "Track ROI, efficiency and cost per process",
    features: ["ROI Tracking", "Efficiency Metrics", "Cost Analysis", "Performance Reports"],
    color: "from-orange-500 to-red-500",
  },
];

const integrationCapabilities = [
  {
    icon: Zap,
    title: "Real-Time Processing",
    description: "Instant workflow execution and real-time data processing",
  },
  {
    icon: Settings,
    title: "Custom Business Logic",
    description: "Visual business rule configuration and custom automation logic",
  },
  {
    icon: Clock,
    title: "Scheduled Automation",
    description: "Time-based and event-driven automation triggers",
  },
  {
    icon: TrendingUp,
    title: "Scalable Architecture",
    description: "Handle high-volume automation with enterprise-grade scalability",
  },
];

export const BusinessAutomation = () => {
  return (
    <section className="py-24 relative bg-card/20">
      <div className="container mx-auto px-6 relative">
        <div className="text-center space-y-4 mb-4 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold">
            Intelligent{" "}
            <span className="gradient-text-primary">
              Business Automation
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cut manual work and errors with visual workflows and deep integrations.
          </p>
          <p className="text-sm text-muted-foreground">Pilots report 25–40% faster process cycle times.</p>
        </div>

        {/* Core Automation Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          {automationFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="p-8 bg-card/50 border-border/50 hover:border-primary/50 hover:shadow-card transition-all group animate-fade-in-up"
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

        {/* Integration Capabilities */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-6xl mx-auto">
          {integrationCapabilities.map((capability, index) => {
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

        {/* Integration Examples */}
        <div className="mt-16 max-w-6xl mx-auto">
          <Card className="p-8 bg-card/30 border-primary/20 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Popular Integrations</h3>
              <p className="text-muted-foreground">Connect with your favorite business tools</p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { name: "Salesforce", category: "CRM" },
                { name: "HubSpot", category: "Marketing" },
                { name: "Slack", category: "Communication" },
                { name: "Zapier", category: "Automation" },
                { name: "Google Workspace", category: "Productivity" },
                { name: "Microsoft 365", category: "Business" },
                { name: "Stripe", category: "Payments" },
                { name: "Mailchimp", category: "Email" },
              ].map((integration) => (
                <div key={integration.name} className="p-4 rounded-lg bg-card/50 text-center hover:bg-card/70 transition-colors">
                  <div className="font-semibold text-sm mb-1">{integration.name}</div>
                  <div className="text-xs text-muted-foreground">{integration.category}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
