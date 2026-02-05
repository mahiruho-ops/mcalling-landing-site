import { Card } from "./ui/card";
import { Palette, Layers, Workflow, Eye, Download, Share2 } from "lucide-react";

const canvasTypes = [
  {
    icon: Palette,
    title: "Agent Canvas",
    description: "Design AI intelligence with personality configuration, memory management, and capability tuning",
    features: ["Personality Configuration", "Memory Management", "Tool Orchestration", "Guardrails Setup"],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Layers,
    title: "Bot Canvas", 
    description: "Deploy agents across multiple channels with channel-specific customizations and testing",
    features: ["Multi-Channel Deployment", "Channel Testing", "Bot Configuration", "Live Preview"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Workflow,
    title: "Workflow Canvas",
    description: "Automate post-conversation actions with visual business process automation",
    features: ["Action Automation", "Conditional Logic", "Integration Hub", "Process Optimization"],
    color: "from-green-500 to-emerald-500",
  },
];

const builderFeatures = [
  {
    icon: Eye,
    title: "Real-Time Preview",
    description: "See your chatbot in action as you build with live testing capabilities",
  },
  {
    icon: Download,
    title: "Template Library",
    description: "50+ pre-built templates for every industry and use case",
  },
  {
    icon: Share2,
    title: "Collaborative Editing",
    description: "Work together with your team on canvas development and deployment",
  },
];

export const VisualCanvasBuilder = () => {
  return (
    <section className="py-24 relative ">
      <div className="container mx-auto px-6 relative">
        <div className="text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold">
            Visual{" "}
            <span className="gradient-text-primary">
              Canvas Builder
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Build sophisticated AI chatbots with our no-code visual canvas system. 
            Drag, drop, and configure without writing a single line of code.
          </p>
        </div>

        {/* Canvas Types */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
          {canvasTypes.map((canvas, index) => {
            const Icon = canvas.icon;
            return (
              <Card
                key={canvas.title}
                className="p-8 bg-card/50 border-border/50 hover:border-primary/50 hover:shadow-card transition-all group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-6">
                  <div className={`p-4 rounded-xl icon-gradient w-fit group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold mb-3">{canvas.title}</h3>
                    <p className="text-muted-foreground mb-4">{canvas.description}</p>
                  </div>

                  <div className="space-y-2">
                    {canvas.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Builder Features */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {builderFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="text-center space-y-4 animate-fade-in-up"
                style={{ animationDelay: `${(index + 3) * 0.1}s` }}
              >
                <div className="p-4 rounded-xl bg-gradient-glow w-fit mx-auto group-hover:shadow-glow-primary transition-all">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        {/* <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-4">
            Ready to build your first AI chatbot?
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-white font-semibold">
            <Palette className="w-5 h-5" />
            Start Building Now
          </div>
        </div> */}
      </div>
    </section>
  );
};
