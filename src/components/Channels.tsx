import { MessageSquare, Globe, Smartphone, Send, Slack, MessageCircle, Phone, Building } from "lucide-react";

const channels = [
  { name: "WhatsApp", icon: MessageCircle, category: "Global", color: "from-green-500 to-emerald-500" },
  { name: "Web Chat", icon: Globe, category: "Global", color: "from-blue-500 to-cyan-500" },
  { name: "SMS", icon: Smartphone, category: "Regional", color: "from-purple-500 to-pink-500" },
  { name: "Telegram", icon: Send, category: "Global", color: "from-sky-500 to-blue-500" },
  { name: "Slack", icon: Slack, category: "Professional", color: "from-violet-500 to-purple-500" },
  { name: "MS Teams", icon: MessageSquare, category: "Professional", color: "from-indigo-500 to-blue-500" },
  { name: "Messenger", icon: MessageSquare, category: "Global", color: "from-blue-500 to-indigo-500" },
  { name: "Voice/IVR", icon: Phone, category: "Regional", color: "from-orange-500 to-red-500" },
  { name: "Google Business", icon: Building, category: "Professional", color: "from-yellow-500 to-orange-500" },
];

export const Channels = () => {
  return (
    <section id="channels" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold">
            Deploy Once, Reach{" "}
            <span className="gradient-text-primary">
              Every Channel
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Eliminate per‑channel rework. Configure once, reuse across WhatsApp, Web, SMS, Slack, Teams, and Voice.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {channels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <div
                key={channel.name}
                className="group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-card animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className={`p-3 rounded-xl icon-gradient group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{channel.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{channel.category}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-6">Bring-your-own accounts. Enterprise routing and compliance supported.</p>
      </div>
    </section>
  );
};
