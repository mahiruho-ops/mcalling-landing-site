import { Shield, Globe, BarChart, Users } from "lucide-react";

export const Security = () => {
  return (
<section className="py-24 px-6 bg-card/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-2">Enterprise‑grade security, governance and uptime</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Protect your data, govern access and track performance.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'RBAC & audit trails', desc: 'Meet internal control and compliance needs.', color: 'from-blue-500 to-cyan-500' },
              { icon: BarChart, title: 'Real-time analytics', desc: 'Track quality, cost and SLA adherence.', color: 'from-purple-500 to-pink-500' },
              { icon: Users, title: 'Audit logging', desc: 'Complete activity tracking.', color: 'from-green-500 to-emerald-500' },
              { icon: Globe, title: '99.9% uptime', desc: 'Global, redundant infrastructure.', color: 'from-orange-500 to-red-500' }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-card/50 rounded-xl border border-border/50 text-center hover:border-primary/50 transition-all group">
                <div className={`p-3 rounded-xl icon-gradient w-fit mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}