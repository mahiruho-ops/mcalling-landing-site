import type { Metadata } from "next";
import Link from "next/link";
import { useCasesContent } from "@/content/mkcalling/useCases";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ArrowLeft, Phone, PhoneCall, Settings, Check } from "lucide-react";

type Params = { params: Promise<{ slug: string }> };

const useCaseSlugs = Object.keys(useCasesContent) as Array<keyof typeof useCasesContent>;

export async function generateStaticParams() {
  return useCaseSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const useCase = useCasesContent[slug as keyof typeof useCasesContent];
  
  if (!useCase) {
    return {
      title: "Use Case Not Found",
      description: "The requested use case could not be found.",
    };
  }

  // Special metadata for sales-lead-qualification
  if (slug === "sales-lead-qualification") {
    return {
      title: "AI Sales Calling & Lead Qualification | mKcalling",
      description: "Automate sales and lead qualification calls with mKcalling — an AI calling platform, configured and managed for Indian businesses.",
      alternates: { canonical: `/use-cases/${slug}` },
      openGraph: {
        title: "AI Sales Calling & Lead Qualification | mKcalling",
        description: "Automate sales and lead qualification calls with mKcalling — an AI calling platform, configured and managed for Indian businesses.",
        type: "article",
        url: `https://mkcalling.mchatbot.ai/use-cases/${slug}`,
        images: ["/mKCalling_Logo.png"],
      },
      twitter: {
        card: "summary_large_image",
        title: "AI Sales Calling & Lead Qualification | mKcalling",
        description: "Automate sales and lead qualification calls with mKcalling — an AI calling platform, configured and managed for Indian businesses.",
        images: ["/mKCalling_Logo.png"],
      },
    };
  }

  // Special metadata for appointment-booking-reminders
  if (slug === "appointment-booking-reminders") {
    return {
      title: "AI Appointment Booking & Reminder Calls | mKcalling",
      description: "Automate appointment booking and reminder calls with mKcalling — an AI calling platform, configured and managed for Indian businesses.",
      alternates: { canonical: `/use-cases/${slug}` },
      openGraph: {
        title: "AI Appointment Booking & Reminder Calls | mKcalling",
        description: "Automate appointment booking and reminder calls with mKcalling — an AI calling platform, configured and managed for Indian businesses.",
        type: "article",
        url: `https://mkcalling.mchatbot.ai/use-cases/${slug}`,
        images: ["/mKCalling_Logo.png"],
      },
      twitter: {
        card: "summary_large_image",
        title: "AI Appointment Booking & Reminder Calls | mKcalling",
        description: "Automate appointment booking and reminder calls with mKcalling — an AI calling platform, configured and managed for Indian businesses.",
        images: ["/mKCalling_Logo.png"],
      },
    };
  }

  // Special metadata for payment-reminders-collections
  if (slug === "payment-reminders-collections") {
    return {
      title: "AI Payment Reminder & Collection Calls | mKcalling",
      description: "Automate payment reminder and follow-up calls with mKcalling — an AI calling platform, configured and managed for Indian businesses.",
      alternates: { canonical: `/use-cases/${slug}` },
      openGraph: {
        title: "AI Payment Reminder & Collection Calls | mKcalling",
        description: "Automate payment reminder and follow-up calls with mKcalling — an AI calling platform, configured and managed for Indian businesses.",
        type: "article",
        url: `https://mkcalling.mchatbot.ai/use-cases/${slug}`,
        images: ["/mKCalling_Logo.png"],
      },
      twitter: {
        card: "summary_large_image",
        title: "AI Payment Reminder & Collection Calls | mKcalling",
        description: "Automate payment reminder and follow-up calls with mKcalling — an AI calling platform, configured and managed for Indian businesses.",
        images: ["/mKCalling_Logo.png"],
      },
    };
  }

  // Special metadata for customer-support-followups
  if (slug === "customer-support-followups") {
    return {
      title: "AI Customer Support & Follow-up Calls | mKcalling",
      description: "Handle inbound support and outbound follow-up calls using mKcalling — an AI calling platform, configured and managed for Indian businesses.",
      alternates: { canonical: `/use-cases/${slug}` },
      openGraph: {
        title: "AI Customer Support & Follow-up Calls | mKcalling",
        description: "Handle inbound support and outbound follow-up calls using mKcalling — an AI calling platform, configured and managed for Indian businesses.",
        type: "article",
        url: `https://mkcalling.mchatbot.ai/use-cases/${slug}`,
        images: ["/mKCalling_Logo.png"],
      },
      twitter: {
        card: "summary_large_image",
        title: "AI Customer Support & Follow-up Calls | mKcalling",
        description: "Handle inbound support and outbound follow-up calls using mKcalling — an AI calling platform, configured and managed for Indian businesses.",
        images: ["/mKCalling_Logo.png"],
      },
    };
  }

  // Special metadata for verification-onboarding
  if (slug === "verification-onboarding") {
    return {
      title: "AI Verification & Onboarding Calls | mKcalling",
      description: "Automate verification and onboarding calls with mKcalling — an AI calling platform, configured and managed for Indian businesses.",
      alternates: { canonical: `/use-cases/${slug}` },
      openGraph: {
        title: "AI Verification & Onboarding Calls | mKcalling",
        description: "Automate verification and onboarding calls with mKcalling — an AI calling platform, configured and managed for Indian businesses.",
        type: "article",
        url: `https://mkcalling.mchatbot.ai/use-cases/${slug}`,
        images: ["/mKCalling_Logo.png"],
      },
      twitter: {
        card: "summary_large_image",
        title: "AI Verification & Onboarding Calls | mKcalling",
        description: "Automate verification and onboarding calls with mKcalling — an AI calling platform, configured and managed for Indian businesses.",
        images: ["/mKCalling_Logo.png"],
      },
    };
  }

  // Special metadata for feedback-nps
  if (slug === "feedback-nps") {
    return {
      title: "AI Feedback & NPS Calling | mKcalling",
      description: "Collect customer feedback and NPS using AI voice agents with mKcalling — configured and managed for Indian businesses.",
      alternates: { canonical: `/use-cases/${slug}` },
      openGraph: {
        title: "AI Feedback & NPS Calling | mKcalling",
        description: "Collect customer feedback and NPS using AI voice agents with mKcalling — configured and managed for Indian businesses.",
        type: "article",
        url: `https://mkcalling.mchatbot.ai/use-cases/${slug}`,
        images: ["/mKCalling_Logo.png"],
      },
      twitter: {
        card: "summary_large_image",
        title: "AI Feedback & NPS Calling | mKcalling",
        description: "Collect customer feedback and NPS using AI voice agents with mKcalling — configured and managed for Indian businesses.",
        images: ["/mKCalling_Logo.png"],
      },
    };
  }

  return {
    title: `${useCase.title} | mKcalling`,
    description: useCase.description,
    alternates: { canonical: `/use-cases/${slug}` },
    openGraph: {
      title: `${useCase.title} | mKcalling`,
      description: useCase.description,
      type: "article",
      url: `https://mkcalling.mchatbot.ai/use-cases/${slug}`,
      images: ["/mKCalling_Logo.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${useCase.title} | mKcalling`,
      description: useCase.description,
      images: ["/mKCalling_Logo.png"],
    },
  };
}

export default async function UseCasePage({ params }: Params) {
  const { slug } = await params;
  const useCase = useCasesContent[slug as keyof typeof useCasesContent];

  if (!useCase) {
    return (
      <section className="py-24 pt-32">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Use case not found</h1>
            <Link href="/use-cases" className="text-primary underline">
              Back to Use Cases
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Check if this is the new structure (has hero, whatYouGet, and either inboundOutbound, reminders, ethical, consistency, or insights)
  const hasNewStructure = 'hero' in useCase && 'whatYouGet' in useCase && ('inboundOutbound' in useCase || 'reminders' in useCase || 'ethical' in useCase || 'consistency' in useCase || 'insights' in useCase);

  return (
    <section className="py-24 pt-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="mx-2">/</span>
            <Link href="/use-cases" className="hover:text-foreground transition-colors">Use Cases</Link>
          <span className="mx-2">/</span>
            <span className="text-foreground">{hasNewStructure ? (useCase as any).hero.headline : (useCase as any).title}</span>
        </nav>

          {hasNewStructure ? (
            // New structure for sales-lead-qualification
            <>
              {/* SECTION 1: Hero */}
              <div className="mb-12">
                <Link href="/use-cases" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Use Cases
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{(useCase as any).hero.headline}</h1>
                <p className="text-xl text-muted-foreground mb-2">{(useCase as any).hero.subheadline}</p>
                <p className="text-muted-foreground mb-6">{(useCase as any).hero.supportingLine}</p>
                <Link href="/schedule-demo">
                  <Button size="lg" className="bg-gradient-primary hover:shadow-glow-primary transition-all group">
                    {(useCase as any).hero.primaryCTA}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* SECTION 2: Problem */}
              <div className="mb-12 p-8 rounded-xl bg-card border border-border/50">
                <h2 className="text-2xl font-bold mb-4">{useCase.problem.title}</h2>
                <p className="text-muted-foreground mb-6">{(useCase.problem as any).description}</p>
                <ul className="space-y-3 mb-4">
                  {useCase.problem.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-destructive mt-1">•</span>
                      <span className="text-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
                {(useCase.problem as any).closing && (
                  <p className="text-foreground font-medium">{(useCase.problem as any).closing}</p>
                )}
              </div>

              {/* SECTION 3: Solution */}
              <div className="mb-12 p-8 rounded-xl bg-card border border-primary/30">
                <h2 className="text-2xl font-bold mb-4">{(useCase.solution as any).title}</h2>
                <p className="text-muted-foreground mb-6">{(useCase.solution as any).description}</p>
                <div className="space-y-3 mb-6">
                  {((useCase.solution as any).capabilities || (useCase.solution as any).features || []).map((item: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                {(useCase.solution as any).keyMessage && (
                  <p className="text-foreground font-medium italic">{(useCase.solution as any).keyMessage}</p>
                )}
              </div>

              {/* SECTION 4: Workflow */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-2">{(useCase.workflow as any).title}</h2>
                <p className="text-muted-foreground mb-6">{(useCase.workflow as any).description}</p>
                <div className="space-y-4">
                  {useCase.workflow.steps.map((step, index) => (
                    <div key={index} className="flex gap-4 p-6 rounded-xl bg-card border border-border/50">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                      <p className="text-foreground pt-2">{step.description}</p>
                    </div>
                  ))}
                </div>
                {(useCase.workflow as any).note && (
                  <p className="text-sm text-muted-foreground italic mt-4">{(useCase.workflow as any).note}</p>
                )}
              </div>

              {/* SECTION 5: Inbound & Outbound OR Reminders */}
              {(useCase as any).inboundOutbound && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-2">{(useCase as any).inboundOutbound.title}</h2>
                  <p className="text-muted-foreground mb-6">{(useCase as any).inboundOutbound.description}</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-xl bg-card border border-primary/30">
                      <div className="flex items-center gap-3 mb-4">
                        <Phone className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-semibold">{(useCase as any).inboundOutbound.inbound.title}</h3>
                      </div>
                      <ul className="space-y-2">
                        {(useCase as any).inboundOutbound.inbound.features.map((feature: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-6 rounded-xl bg-card border border-border/50">
                      <div className="flex items-center gap-3 mb-4">
                        <PhoneCall className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-semibold">{(useCase as any).inboundOutbound.outbound.title}</h3>
                      </div>
                      <ul className="space-y-2">
                        {(useCase as any).inboundOutbound.outbound.features.map((feature: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {(useCase as any).inboundOutbound.note && (
                    <p className="text-sm text-muted-foreground mt-4">{(useCase as any).inboundOutbound.note}</p>
                  )}
                </div>
              )}
              {/* SECTION 5 Alternative: Reminders (for appointment-booking-reminders) */}
              {(useCase as any).reminders && (
                <div className="mb-12 p-8 rounded-xl bg-card border border-primary/30">
                  <h2 className="text-2xl font-bold mb-2">{(useCase as any).reminders.title}</h2>
                  <p className="text-muted-foreground mb-6">{(useCase as any).reminders.description}</p>
                  <div className="space-y-3 mb-4">
                    {(useCase as any).reminders.capabilities.map((capability: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{capability}</span>
                      </div>
                    ))}
                  </div>
                  {(useCase as any).reminders.closing && (
                    <p className="text-foreground font-medium">{(useCase as any).reminders.closing}</p>
                  )}
                </div>
              )}
              {/* SECTION 5 Alternative: Ethical & Controlled Communication (for payment-reminders-collections) */}
              {(useCase as any).ethical && (
                <div className="mb-12 p-8 rounded-xl bg-card border border-primary/30">
                  <h2 className="text-2xl font-bold mb-2">{(useCase as any).ethical.title}</h2>
                  <p className="text-muted-foreground mb-6">{(useCase as any).ethical.description}</p>
                  <div className="space-y-3 mb-4">
                    {(useCase as any).ethical.points.map((point: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{point}</span>
                      </div>
                    ))}
                  </div>
                  {(useCase as any).ethical.closing && (
                    <p className="text-foreground font-medium">{(useCase as any).ethical.closing}</p>
                  )}
                </div>
              )}
              {/* SECTION 5 Alternative: Consistency, Control & Auditability (for verification-onboarding) */}
              {(useCase as any).consistency && (
                <div className="mb-12 p-8 rounded-xl bg-card border border-primary/30">
                  <h2 className="text-2xl font-bold mb-2">{(useCase as any).consistency.title}</h2>
                  <p className="text-muted-foreground mb-6">{(useCase as any).consistency.description}</p>
                  <div className="space-y-3 mb-4">
                    {(useCase as any).consistency.points.map((point: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{point}</span>
                      </div>
                    ))}
                  </div>
                  {(useCase as any).consistency.closing && (
                    <p className="text-foreground font-medium">{(useCase as any).consistency.closing}</p>
                  )}
                </div>
              )}
              {/* SECTION 5 Alternative: Structured Insights & Visibility (for feedback-nps) */}
              {(useCase as any).insights && (
                <div className="mb-12 p-8 rounded-xl bg-card border border-primary/30">
                  <h2 className="text-2xl font-bold mb-2">{(useCase as any).insights.title}</h2>
                  <p className="text-muted-foreground mb-6">{(useCase as any).insights.description}</p>
                  <div className="space-y-3 mb-4">
                    {(useCase as any).insights.points.map((point: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{point}</span>
                      </div>
                    ))}
                  </div>
                  {(useCase as any).insights.closing && (
                    <p className="text-foreground font-medium">{(useCase as any).insights.closing}</p>
                  )}
                </div>
              )}

              {/* SECTION 6: What You Get */}
              {(useCase as any).whatYouGet && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-2">{(useCase as any).whatYouGet.title}</h2>
                  <p className="text-muted-foreground mb-6">{(useCase as any).whatYouGet.description}</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-xl bg-card border border-primary/30">
                      <h3 className="text-lg font-semibold mb-4">{(useCase as any).whatYouGet.platform.title}</h3>
                      <ul className="space-y-2">
                        {(useCase as any).whatYouGet.platform.items.map((item: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-6 rounded-xl bg-card border border-border/50">
                      <h3 className="text-lg font-semibold mb-4">{(useCase as any).whatYouGet.managed.title}</h3>
                      <ul className="space-y-2">
                        {(useCase as any).whatYouGet.managed.items.map((item: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <Settings className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {(useCase as any).whatYouGet.keyMessage && (
                    <p className="text-foreground font-medium mt-4">{(useCase as any).whatYouGet.keyMessage}</p>
                  )}
                </div>
              )}

              {/* SECTION 7: Where This Use Case Works Best */}
              {(useCase as any).whereItWorks && (
                <div className="mb-12 p-8 rounded-xl bg-card border border-border/50">
                  <h2 className="text-2xl font-bold mb-2">{(useCase as any).whereItWorks.title}</h2>
                  <p className="text-muted-foreground mb-6">{(useCase as any).whereItWorks.description}</p>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {(useCase as any).whereItWorks.industries.map((industry: string, index: number) => (
                      <div key={index} className="px-4 py-2 rounded-lg bg-background border border-border/50 text-sm">
                        {industry}
                      </div>
                    ))}
                  </div>
                  {(useCase as any).whereItWorks.note && (
                    <p className="text-sm text-muted-foreground italic">{(useCase as any).whereItWorks.note}</p>
                  )}
                </div>
              )}

              {/* SECTION 8: Why Sales Teams Choose mKcalling */}
              {(useCase as any).whyChoose && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-2">{(useCase as any).whyChoose.title}</h2>
                  <p className="text-muted-foreground mb-6">{(useCase as any).whyChoose.description}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {(useCase as any).whyChoose.reasons.map((reason: string, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border/50">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SECTION 9: CTA */}
              <div className="text-center p-8 rounded-xl bg-card border border-primary/30">
                <h2 className="text-2xl font-bold mb-4">{(useCase as any).cta.title}</h2>
                <div className="pt-4">
                  <Link href="/schedule-demo">
                    <Button size="lg" className="bg-gradient-primary hover:shadow-glow-primary transition-all group">
                      {(useCase as any).cta.buttonText}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            // Old structure for other use cases
            <>
              {/* Hero */}
              <div className="mb-12">
                <Link href="/use-cases" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Use Cases
                </Link>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{(useCase as any).title}</h1>
                <p className="text-xl text-muted-foreground">{(useCase as any).description}</p>
              </div>

              {/* Problem */}
              <div className="mb-12 p-8 rounded-xl bg-card border border-border/50">
                <h2 className="text-2xl font-bold mb-4">{(useCase as any).problem.title}</h2>
                <p className="text-muted-foreground mb-6">{(useCase as any).problem.description}</p>
                <ul className="space-y-3">
                  {(useCase as any).problem.points.map((point: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-destructive mt-1">•</span>
                      <span className="text-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solution */}
              <div className="mb-12 p-8 rounded-xl bg-card border border-primary/30">
                <h2 className="text-2xl font-bold mb-4">{(useCase as any).solution.title}</h2>
                <p className="text-muted-foreground mb-6">{(useCase as any).solution.description}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {(useCase as any).solution.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Workflow */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">{(useCase as any).workflow.title}</h2>
                <div className="space-y-4">
                  {(useCase as any).workflow.steps.map((step: any, index: number) => (
                    <div key={index} className="flex gap-4 p-6 rounded-xl bg-card border border-border/50">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                      <p className="text-foreground pt-2">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Integrations */}
              <div className="mb-12 p-8 rounded-xl bg-card border border-border/50">
                <h2 className="text-2xl font-bold mb-4">Integrations</h2>
                <p className="text-muted-foreground mb-4">
                  mKcalling integrates with your existing systems for seamless workflows.
                </p>
                <div className="flex flex-wrap gap-3">
                  {(useCase as any).integrations.map((integration: string, index: number) => (
                    <div key={index} className="px-4 py-2 rounded-lg bg-background border border-border/50 text-sm">
                      {integration}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="text-center p-8 rounded-xl bg-card border border-primary/30">
                <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
                <p className="text-muted-foreground mb-6">
                  See how mKcalling can help with {(useCase as any).title.toLowerCase()}.
                </p>
                <div className="inline-flex flex-col sm:flex-row gap-4">
                  <Link href="/schedule-demo">
                    <Button size="lg" className="bg-gradient-primary hover:shadow-glow-primary transition-all group">
                      Schedule a Demo
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button size="lg" variant="outline" className="border-primary/30 hover:border-primary/60">
                      View Pricing
                    </Button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}


