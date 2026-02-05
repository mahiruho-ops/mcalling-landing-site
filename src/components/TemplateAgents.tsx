import { Card } from "./ui/card";
import Link from "next/link";
import { Hotel, ShoppingCart, Heart, GraduationCap, Building2,Banknote, Brain, Package,Factory, ArrowRight } from "lucide-react";


const templates = [
  { icon: Heart, sector: "Healthcare", slug: "healthcare", color: "from-red-500 to-orange-500", description: "Triage, appointment booking, and HIPAA‑aligned handoffs." },
  { icon: Hotel, sector: "Hospitality", slug: "hospitality-travel", color: "from-purple-500 to-pink-500", description: "Reservations, concierge FAQs, and upsell workflows." },
  { icon: Package, sector: "Retail", slug: "retail", color: "from-pink-500 to-fuchsia-500", description: "Order lookup, returns, and store inventory checks." },
  { icon: ShoppingCart, sector: "E-commerce", slug: "ecommerce", color: "from-blue-500 to-cyan-500", description: "Cart recovery, order status, and shipping updates." },
  { icon: Brain, sector: "Technology", slug: "technology-software", color: "from-cyan-500 to-blue-600", description: "Tier‑1 troubleshooting and product documentation guidance." },
  { icon: GraduationCap, sector: "Education", slug: "education", color: "from-green-500 to-teal-500", description: "Admissions Q&A, course info, and campus services." },
  { icon: Factory, sector: "Manufacturing", slug: "manufacturing", color: "from-yellow-600 to-amber-400", description: "Warranty, spare parts lookup, and dealer support." },
  { icon: Banknote, sector: "BFSI & Finance", slug: "banking-financial-services", color: "from-green-600 to-teal-400", description: "KYC, account FAQs, and dispute triage." },
  { icon: Building2, sector: "e-Govt. / Citizen Services", slug: "egov-citizen-services", color: "from-lime-500 to-green-500", description: "Service eligibility, application status, and guidance." },
];

export const TemplateAgents = () => {
  return (
    <section className="py-24 relative bg-card/20">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold">
            Prebuilt Agents for{" "}
            <span className="gradient-text-primary">
              Every Sector
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Launch in minutes with industry-specific templates
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {templates.map((template, index) => {
            const Icon = template.icon;
            return (
              <Link href={`/use-cases/${template.slug}`} className="block group h-full" aria-label={`Explore ${template.sector} use case`} title={`${template.sector} use case`} key={template.sector}
              >
              <Card
                className="p-8 bg-card border-border/50 hover:border-primary/50 hover:shadow-card transition-all group animate-fade-in-up h-full"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-4 text-center flex flex-col h-full">
                  <div className={`p-4 rounded-xl icon-gradient w-fit mx-auto group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{template.sector}</h3>
                  <p className="text-sm text-muted-foreground">
                    {template.description}
                  </p>
                  <div className="pt-2 mt-auto">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm text-foreground bg-card/60 group-hover:border-primary/50 group-hover:bg-card/80 transition-colors select-none" role="presentation">
                      Explore {template.sector} Use Cases
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Card>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Customize via our <span className="text-primary font-semibold">visual canvas system</span> - no code required
          </p>
        </div>
      </div>
    </section>
  );
};
