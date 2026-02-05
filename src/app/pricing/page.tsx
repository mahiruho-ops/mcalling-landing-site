import { Metadata } from "next";
import { pricingContent } from "@/content/mkcalling/pricing";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Check, Info } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Pricing | mKcalling AI Calling Platform",
  description: "Transparent pricing for AI calling with mKcalling. Free minutes, no hidden AI costs, and managed setup for Indian businesses.",
};

function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

function formatSlab(slab: { min: number; max: number | null; rate: number }): string {
  if (slab.max === null) {
    return `${slab.min.toLocaleString('en-IN')}+ min`;
  }
  return `${slab.min.toLocaleString('en-IN')} – ${slab.max.toLocaleString('en-IN')} min`;
}

export default function PricingPage() {
  const { hero, billingRules, plans, premium, managedService, fairUse, cta } = pricingContent;

  return (
    <section className="py-24 pt-32">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* SECTION 1: Pricing Hero */}
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold">{hero.headline}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{hero.subheadline}</p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              {hero.supportingPoints.map((point, index) => (
                <div key={index} className="px-4 py-2 rounded-lg bg-card/50 border border-border/50 text-sm">
                  {point}
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2: How Billing Works */}
          <div className="mb-16">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">{billingRules.title}</h2>
              <p className="text-muted-foreground">{billingRules.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="p-6 rounded-xl bg-card border border-border/50">
                <h3 className="text-xl font-semibold mb-4">{billingRules.rules.title}</h3>
                <ul className="space-y-3">
                  {billingRules.rules.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm">
                      <span className="text-primary mt-1">•</span>
                      <span className="text-foreground" dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 rounded-xl bg-card border border-primary/30">
                <h3 className="text-xl font-semibold mb-4">{billingRules.allInclusive.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{billingRules.allInclusive.description}</p>
                <ul className="space-y-2 mb-4">
                  {billingRules.allInclusive.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm font-medium text-foreground">{billingRules.allInclusive.closing}</p>
              </div>
            </div>
          </div>

          {/* SECTION 3: Plan Comparison */}
          <div className="mb-16">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold">Plan Comparison</h2>
              <p className="text-muted-foreground">Choose the plan that fits your calling volume</p>
            </div>
            
            {/* Key Terms Explanation */}
            <div className="mb-8 p-6 rounded-xl bg-card border border-border/50 max-w-4xl mx-auto">
              <h3 className="text-lg font-semibold mb-4">Understanding Key Terms</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium mb-1">DID (Direct Inward Dialing)</p>
                  <p className="text-muted-foreground">A phone number assigned to your account. You can add more DIDs as you scale.</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Channel (Concurrent Calls)</p>
                  <p className="text-muted-foreground">The number of simultaneous calls your account can handle. Add more channels to increase capacity.</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Base Plan */}
              <div className="p-6 rounded-xl bg-card border border-border/50 flex flex-col">
                <h3 className="text-2xl font-bold mb-4">{plans.base.name}</h3>
                <div className="space-y-4 mb-6 flex-grow">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Implementation (One-time)</p>
                    <p className="text-xl font-bold">{formatCurrency(plans.base.implementation)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Platform Fee</p>
                    <ul className="space-y-1 text-sm">
                      <li>Monthly: {formatCurrency(plans.base.platformFee.monthly)}</li>
                      <li>Quarterly: {formatCurrency(plans.base.platformFee.quarterly)}</li>
                      <li>Half-Yearly: {formatCurrency(plans.base.platformFee.halfYearly)}</li>
                      <li>Annually: {formatCurrency(plans.base.platformFee.annually)}</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Free Calling Minutes / Month</p>
                    <p className="text-lg font-semibold">{plans.base.freeMinutes.toLocaleString('en-IN')} minutes</p>
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-sm font-semibold mb-2">Call Rate Slabs</p>
                  <div className="space-y-1.5 text-xs">
                    {plans.base.slabs.map((slab, index) => (
                      <div key={index} className="flex justify-between items-center py-1">
                        <span className="text-muted-foreground">{formatSlab(slab)}</span>
                        <span className="font-medium text-foreground">{slab.rate === 0 ? 'Free' : `₹${slab.rate.toFixed(2)} / min`}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-sm font-semibold mb-2">Included</p>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                      <span>{plans.base.included.agents}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                      <span>{plans.base.included.kbDocs}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                      <span>{plans.base.included.kbAllocation}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                      <span>{plans.base.included.dids}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                      <span>{plans.base.included.channels}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-2">Add-ons</p>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    <li>• {plans.base.addons.additionalDID.description}</li>
                    <li>• {plans.base.addons.didPack.description}</li>
                    <li>• {plans.base.addons.additionalChannel.description}</li>
                  </ul>
                </div>
              </div>

              {/* Standard Plan */}
              <div className="p-6 rounded-xl bg-card border border-primary/30 flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-2xl font-bold">{plans.standard.name}</h3>
                  <span className="px-2 py-1 rounded text-xs bg-primary/10 text-primary font-medium">Popular</span>
                </div>
                <div className="space-y-4 mb-6 flex-grow">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Implementation (One-time)</p>
                    <p className="text-xl font-bold">{formatCurrency(plans.standard.implementation)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Platform Fee</p>
                    <ul className="space-y-1 text-sm">
                      <li>Monthly: {formatCurrency(plans.standard.platformFee.monthly)}</li>
                      <li>Quarterly: {formatCurrency(plans.standard.platformFee.quarterly)}</li>
                      <li>Half-Yearly: {formatCurrency(plans.standard.platformFee.halfYearly)}</li>
                      <li>Annually: {formatCurrency(plans.standard.platformFee.annually)}</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Free Calling Minutes / Month</p>
                    <p className="text-lg font-semibold">{plans.standard.freeMinutes.toLocaleString('en-IN')} minutes</p>
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-sm font-semibold mb-2">Call Rate Slabs</p>
                  <div className="space-y-1.5 text-xs">
                    {plans.standard.slabs.map((slab, index) => (
                      <div key={index} className="flex justify-between items-center py-1">
                        <span className="text-muted-foreground">{formatSlab(slab)}</span>
                        <span className="font-medium text-foreground">{slab.rate === 0 ? 'Free' : `₹${slab.rate.toFixed(2)} / min`}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-sm font-semibold mb-2">Included</p>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                      <span>{plans.standard.included.agents}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                      <span>{plans.standard.included.kbDocs}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                      <span>{plans.standard.included.kbAllocation}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                      <span>{plans.standard.included.dids}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                      <span>{plans.standard.included.channels}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-2">Add-ons</p>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    <li>• {plans.standard.addons.additionalDID.description}</li>
                    <li>• {plans.standard.addons.didPack.description}</li>
                    <li>• {plans.standard.addons.additionalChannel.description}</li>
                  </ul>
                </div>
              </div>

              {/* Advanced Plan */}
              <div className="p-6 rounded-xl bg-card border border-border/50 flex flex-col">
                <h3 className="text-2xl font-bold mb-4">{plans.advanced.name}</h3>
                <div className="space-y-4 mb-6 flex-grow">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Implementation (One-time)</p>
                    <p className="text-xl font-bold">{formatCurrency(plans.advanced.implementation)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Platform Fee</p>
                    <ul className="space-y-1 text-sm">
                      <li>Half-Yearly: {formatCurrency(plans.advanced.platformFee.halfYearly)}</li>
                      <li>Annually: {formatCurrency(plans.advanced.platformFee.annually)}</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Free Calling Minutes / Month</p>
                    <p className="text-lg font-semibold">{plans.advanced.freeMinutes.toLocaleString('en-IN')} minutes</p>
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-sm font-semibold mb-2">Call Rate Slabs</p>
                  <div className="space-y-1.5 text-xs">
                    {plans.advanced.slabs.map((slab, index) => (
                      <div key={index} className="flex justify-between items-center py-1">
                        <span className="text-muted-foreground">{formatSlab(slab)}</span>
                        <span className="font-medium text-foreground">{slab.rate === 0 ? 'Free' : `₹${slab.rate.toFixed(2)} / min`}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <p className="text-sm font-semibold mb-2">Included</p>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                      <span>{plans.advanced.included.agents}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                      <span>{plans.advanced.included.kbDocs}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                      <span>{plans.advanced.included.kbAllocation}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                      <span>{plans.advanced.included.dids}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                      <span>{plans.advanced.included.channels}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold mb-2">Add-ons</p>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    <li>• {plans.advanced.addons.additionalDID.description}</li>
                    <li>• {plans.advanced.addons.didPack.description}</li>
                    <li>• {plans.advanced.addons.additionalChannel.description}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4: Premium Voices & Languages */}
          <div className="mb-16 p-8 rounded-xl bg-card border border-border/50">
            <div className="text-center space-y-4 mb-6">
              <h2 className="text-2xl font-bold">{premium.title}</h2>
              <p className="text-muted-foreground">{premium.subtitle}</p>
            </div>
            <ul className="space-y-3 max-w-3xl mx-auto">
              {premium.points.map((point, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground" dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </li>
              ))}
            </ul>
          </div>

          {/* SECTION 5: Managed Service */}
          <div className="mb-16">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold">{managedService.title}</h2>
              <p className="text-muted-foreground">{managedService.subtitle}</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="p-8 rounded-xl bg-card border border-primary/30 mb-4">
                <h3 className="text-xl font-semibold mb-4">Included Services</h3>
                <ul className="space-y-3">
                  {managedService.included.map((service, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-muted-foreground text-center">{managedService.additional}</p>
            </div>
          </div>

          {/* SECTION 6: Fair Use */}
          <div className="mb-16 p-8 rounded-xl bg-card border border-border/50">
            <div className="text-center space-y-4 mb-6">
              <h2 className="text-2xl font-bold">{fairUse.title}</h2>
              <p className="text-muted-foreground">{fairUse.subtitle}</p>
            </div>
            <ul className="space-y-3 max-w-3xl mx-auto mb-4">
              {fairUse.points.map((point, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground">{point}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground italic text-center">{fairUse.note}</p>
          </div>

          {/* SECTION 7: CTA */}
          <div className="text-center p-12 rounded-xl bg-card border border-primary/30">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{cta.title}</h2>
            <div className="pt-4">
              <Link href="/schedule-demo">
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow-primary transition-all group">
                  {cta.buttonText}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
