import { Card } from "./ui/card";
import { BarChart3, TrendingUp, Users, Clock, Target, Brain, Zap, Shield } from "lucide-react";

const analyticsCategories = [
  {
    icon: BarChart3,
    title: "Conversation Analytics",
    description: "Deep insights into user interactions and conversation patterns",
    metrics: ["Response Time", "Success Rate", "User Satisfaction", "Intent Recognition"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: TrendingUp,
    title: "Performance Metrics",
    description: "Real-time monitoring of system performance and optimization opportunities",
    metrics: ["Uptime", "Response Time", "Throughput", "Error Rate"],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Users,
    title: "User Engagement",
    description: "Track user behavior, retention, and engagement across all channels",
    metrics: ["Active Users", "Session Duration", "Channel Performance", "Retention Rate"],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Brain,
    title: "AI Intelligence",
    description: "Monitor AI model performance and learning capabilities",
    metrics: ["Model Accuracy", "Learning Rate", "Prediction Quality", "Adaptation Speed"],
    color: "from-orange-500 to-red-500",
  },
];

const keyFeatures = [
  {
    icon: Clock,
    title: "Real-Time Monitoring",
    description: "Live dashboards with instant updates and alerts",
  },
  {
    icon: Target,
    title: "Predictive Analytics",
    description: "AI-powered insights and future trend predictions",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Automated recommendations for system improvements",
  },
  {
    icon: Shield,
    title: "Compliance Tracking",
    description: "Monitor data usage and ensure regulatory compliance",
  },
];

export const AdvancedAnalytics = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold">
            Intelligent{" "}
            <span className="gradient-text-primary">
              Analytics & Insights
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Make data-driven decisions with comprehensive analytics, real-time monitoring, 
            and AI-powered insights that help optimize your chatbot performance.
          </p>
        </div>

        {/* Analytics Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-6xl mx-auto">
          {analyticsCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.title}
                className="p-6 bg-card/50 border-border/50 hover:border-primary/50 backdrop-blur-sm hover:shadow-card transition-all group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4">
                  <div className={`p-3 rounded-xl icon-gradient w-fit group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                  
                  <div className="space-y-1">
                    {category.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <span className="text-xs text-muted-foreground">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {keyFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="text-center space-y-3 animate-fade-in-up"
                style={{ animationDelay: `${(index + 4) * 0.1}s` }}
              >
                <div className="p-3 rounded-xl bg-gradient-glow w-fit mx-auto group-hover:shadow-glow-primary transition-all">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Sample Metrics Display */}
        <div className="mt-16 max-w-6xl mx-auto">
          <Card className="p-8 bg-card/30 border-primary/20 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Sample Analytics Dashboard</h3>
              <p className="text-muted-foreground">Real-time metrics and insights</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 rounded-lg bg-card/50">
                <div className="text-3xl font-bold text-secondary mb-1">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card/50">
                <div className="text-3xl font-bold text-secondary mb-1">1.2s</div>
                <div className="text-sm text-muted-foreground">Avg Response Time</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-card/50">
                <div className="text-3xl font-bold text-secondary mb-1">94.7%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
