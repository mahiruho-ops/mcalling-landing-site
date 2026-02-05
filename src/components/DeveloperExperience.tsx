import { Card } from "./ui/card";
import { Code, Book, Terminal, Zap, Github, Globe, Wrench, Cpu } from "lucide-react";

const developerFeatures = [
  {
    icon: Book,
    title: "Comprehensive Documentation",
    description: "Interactive API documentation with live examples and code snippets",
    features: ["Interactive API Explorer", "Code Examples", "SDK Documentation", "Integration Guides"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Terminal,
    title: "Multi-Language SDKs",
    description: "Native SDKs for popular programming languages and frameworks",
    features: ["Python SDK", "Node.js SDK", "Java SDK", "Go SDK", "PHP SDK"],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Zap,
    title: "Webhook Management",
    description: "Event-driven integration capabilities with real-time notifications",
    features: ["Event Streaming", "Webhook Testing", "Retry Logic", "Security Validation"],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Wrench,
    title: "Custom Integration Builder",
    description: "Visual integration creation and custom tool development",
    features: ["Visual Builder", "Custom Tools", "API Gateway", "Testing Framework"],
    color: "from-orange-500 to-red-500",
  },
];

const developerTools = [
  {
    icon: Code,
    title: "Code Generation",
    description: "Auto-generate integration code from visual configurations",
  },
  {
    icon: Github,
    title: "Git Integration",
    description: "Version control and collaborative development workflows",
  },
  {
    icon: Globe,
    title: "Sandbox Environment",
    description: "Safe testing environment for development and experimentation",
  },
  {
    icon: Cpu,
    title: "Performance Monitoring",
    description: "Real-time performance monitoring and debugging tools",
  },
];

export const DeveloperExperience = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold">
            Developer-First{" "}
            <span className="gradient-text-primary">
              Platform
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built for developers with comprehensive APIs, SDKs, documentation, 
            and tools to create powerful custom integrations and applications.
          </p>
        </div>

        {/* Core Developer Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          {developerFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="p-8 bg-card/50 border-border/50 hover:border-primary/50 backdrop-blur-sm hover:shadow-card transition-all group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-6">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${feature.color} w-fit group-hover:scale-110 transition-transform`}>
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

        {/* Developer Tools */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-6xl mx-auto">
          {developerTools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.title}
                className="text-center space-y-3 animate-fade-in-up"
                style={{ animationDelay: `${(index + 4) * 0.1}s` }}
              >
                <div className="p-3 rounded-xl bg-gradient-glow w-fit mx-auto group-hover:shadow-glow-primary transition-all">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{tool.title}</h3>
                <p className="text-sm text-muted-foreground">{tool.description}</p>
              </div>
            );
          })}
        </div>

        {/* Code Example */}
        <div className="mt-16 max-w-6xl mx-auto">
          <Card className="p-8 bg-card/30 border-primary/20 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Quick Start Example</h3>
              <p className="text-muted-foreground">Get started with our API in minutes</p>
            </div>
            
            <div className="bg-slate-900 rounded-lg p-6 text-left overflow-x-auto">
              <pre className="text-sm text-green-400">
                <code>{`// Install the SDK
npm install @mchatbot/sdk

// Initialize the client
import { MchatBot } from '@mchatbot/sdk';

const client = new MchatBot({
  apiKey: 'your-api-key',
  environment: 'production'
});

// Create a new agent
const agent = await client.agents.create({
  name: 'Customer Support Bot',
  personality: 'helpful and professional',
  capabilities: ['knowledge_base', 'ticket_creation']
});

// Deploy to WhatsApp
const deployment = await client.deployments.create({
  agentId: agent.id,
  channel: 'whatsapp',
  config: {
    phoneNumber: '+1234567890'
  }
});

console.log('Agent deployed successfully!');`}</code>
              </pre>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
