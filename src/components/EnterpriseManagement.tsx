import { Card } from "./ui/card";
import { GitBranch, Users, Shield, History, Archive, Settings, CheckCircle, Clock } from "lucide-react";

const managementFeatures = [
  {
    icon: GitBranch,
    title: "Version Control",
    description: "Ship confidently with full rollback and complete change history",
    features: ["Canvas Versioning", "Rollback Capabilities", "Change Tracking", "Branch Management"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "Collaborative Editing",
    description: "Cut handoffs with real-time reviews, approvals and role-based access",
    features: ["Real-time Collaboration", "Role-based Access", "Comment System", "Approval Workflows"],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Shield,
    title: "Audit Trail",
    description: "Meet internal control needs with end-to-end traceability",
    features: ["Activity Logging", "Compliance Tracking", "Security Monitoring", "Access Control"],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: History,
    title: "Lifecycle Management",
    description: "Standardize Draft → Review → Publish with automated gates and governance",
    features: ["Workflow Automation", "Approval Gates", "Status Tracking", "Automated Deployment"],
    color: "from-orange-500 to-red-500",
  },
];

const governanceFeatures = [
  {
    icon: CheckCircle,
    title: "Quality Gates",
    description: "Automated quality checks and validation before deployment",
  },
  {
    icon: Clock,
    title: "Scheduled Deployments",
    description: "Plan and schedule canvas deployments with zero-downtime updates",
  },
  {
    icon: Archive,
    title: "Bulk Operations",
    description: "Mass canvas management, archiving, and deployment operations",
  },
  {
    icon: Settings,
    title: "Policy Management",
    description: "Define and enforce organizational policies across all canvases",
  },
];

export const EnterpriseManagement = () => {
  return (
    <section className="py-24 relative bg-card/20">
      <div className="container mx-auto px-6 relative">
        <div className="text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold">
            Enterprise{" "}
            <span className="gradient-text-primary">
              Canvas Governance
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Reduce release risk and speed rollouts with version control, approvals and audit trails.
          </p>
        </div>

        {/* Core Management Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-6xl mx-auto">
          {managementFeatures.map((feature, index) => {
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

        {/* Governance Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-6xl mx-auto">
          {governanceFeatures.map((feature, index) => {
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

        {/* Workflow Example */}
        <div className="mt-16 max-w-6xl mx-auto">
          <Card className="p-8 bg-card/30 border-primary/20 backdrop-blur-sm">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Canvas Lifecycle Workflow</h3>
              <p className="text-muted-foreground">From development to production deployment</p>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
              <div className="flex flex-col items-center space-y-2">
                <div className="p-3 rounded-full bg-primary/20 text-primary">
                  <GitBranch className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">Draft</span>
              </div>
              
              <div className="text-muted-foreground">→</div>
              
              <div className="flex flex-col items-center space-y-2">
                <div className="p-3 rounded-full bg-secondary/20 text-secondary">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">Review</span>
              </div>
              
              <div className="text-muted-foreground">→</div>
              
              <div className="flex flex-col items-center space-y-2">
                <div className="p-3 rounded-full bg-green-500/20 text-green-500">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">Publish</span>
              </div>
              
              <div className="text-muted-foreground">→</div>
              
              <div className="flex flex-col items-center space-y-2">
                <div className="p-3 rounded-full bg-orange-500/20 text-orange-500">
                  <Archive className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium">Archive</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
