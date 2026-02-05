import { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { industriesData } from "@/content/mkcalling/industries";
import { bankingDsaContent } from "@/content/mkcalling/industries/banking-dsa";
import { healthcareContent } from "@/content/mkcalling/industries/healthcare";
import { educationContent } from "@/content/mkcalling/industries/education";
import { realEstateContent } from "@/content/mkcalling/industries/real-estate";
import { bfsiFintechContent } from "@/content/mkcalling/industries/bfsi-fintech";
import { insuranceContent } from "@/content/mkcalling/industries/insurance";
import { hospitalityTravelContent } from "@/content/mkcalling/industries/hospitality-travel";
import { ecommerceD2cContent } from "@/content/mkcalling/industries/ecommerce-d2c";
import { logisticsContent } from "@/content/mkcalling/industries/logistics";
import { automotiveContent } from "@/content/mkcalling/industries/automotive";
import { fieldServiceMaintenanceContent } from "@/content/mkcalling/industries/field-service-maintenance";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Check, CheckCircle2, Phone, PhoneCall, FileText, Shield, TrendingUp } from "lucide-react";

type Params = { params: Promise<{ slug: string }> };

const industrySlugs = industriesData.map(industry => industry.slug);

export async function generateStaticParams() {
  return industrySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const industry = industriesData.find(ind => ind.slug === slug);
  
  if (!industry) {
    return {
      title: "Industry Not Found",
      description: "The requested industry page could not be found.",
    };
  }

  // Special metadata for Banking DSA
  if (slug === "banking-dsa") {
    return {
      title: "Banking DSA AI Calling | mKcalling",
      description: "Automate Banking DSA calling workflows — lead follow-ups, application status, document reminders, and payment follow-ups with mKcalling. Configured and managed for Indian businesses.",
      alternates: { canonical: `/industries/${slug}` },
      openGraph: {
        title: "Banking DSA AI Calling | mKcalling",
        description: "Automate Banking DSA calling workflows — lead follow-ups, application status, document reminders, and payment follow-ups with mKcalling. Configured and managed for Indian businesses.",
        type: "article",
        url: `https://mkcalling.mchatbot.ai/industries/${slug}`,
        images: ["/mKCalling_Logo.png"],
      },
      twitter: {
        card: "summary_large_image",
        title: "Banking DSA AI Calling | mKcalling",
        description: "Automate Banking DSA calling workflows — lead follow-ups, application status, document reminders, and payment follow-ups with mKcalling. Configured and managed for Indian businesses.",
        images: ["/mKCalling_Logo.png"],
      },
    };
  }

  // Special metadata for Healthcare
  if (slug === "healthcare") {
    return {
      title: "Healthcare AI Calling | mKcalling",
      description: "Automate healthcare appointment booking, reminders, and patient follow-ups with mKcalling. Configured and managed for Indian healthcare teams.",
      alternates: { canonical: `/industries/${slug}` },
      openGraph: {
        title: "Healthcare AI Calling | mKcalling",
        description: "Automate healthcare appointment booking, reminders, and patient follow-ups with mKcalling. Configured and managed for Indian healthcare teams.",
        type: "article",
        url: `https://mkcalling.mchatbot.ai/industries/${slug}`,
        images: ["/mKCalling_Logo.png"],
      },
      twitter: {
        card: "summary_large_image",
        title: "Healthcare AI Calling | mKcalling",
        description: "Automate healthcare appointment booking, reminders, and patient follow-ups with mKcalling. Configured and managed for Indian healthcare teams.",
        images: ["/mKCalling_Logo.png"],
      },
    };
  }

  // Special metadata for Education
  if (slug === "education") {
    return {
      title: "Education AI Calling | mKcalling",
      description: "Automate admissions follow-ups, counseling calls, and fee reminders with mKcalling — an AI calling platform configured and managed for Indian education providers.",
      alternates: { canonical: `/industries/${slug}` },
      openGraph: {
        title: "Education AI Calling | mKcalling",
        description: "Automate admissions follow-ups, counseling calls, and fee reminders with mKcalling — an AI calling platform configured and managed for Indian education providers.",
        type: "article",
        url: `https://mkcalling.mchatbot.ai/industries/${slug}`,
        images: ["/mKCalling_Logo.png"],
      },
      twitter: {
        card: "summary_large_image",
        title: "Education AI Calling | mKcalling",
        description: "Automate admissions follow-ups, counseling calls, and fee reminders with mKcalling — an AI calling platform configured and managed for Indian education providers.",
        images: ["/mKCalling_Logo.png"],
      },
    };
  }

  // Special metadata for Real Estate
  if (slug === "real-estate") {
    return {
      title: "Real Estate AI Calling | mKcalling",
      description: "Automate real estate lead follow-ups, site visit scheduling, and post-visit calls with mKcalling — configured and managed for Indian real estate teams.",
      alternates: { canonical: `/industries/${slug}` },
      openGraph: {
        title: "Real Estate AI Calling | mKcalling",
        description: "Automate real estate lead follow-ups, site visit scheduling, and post-visit calls with mKcalling — configured and managed for Indian real estate teams.",
        type: "article",
        url: `https://mkcalling.mchatbot.ai/industries/${slug}`,
        images: ["/mKCalling_Logo.png"],
      },
      twitter: {
        card: "summary_large_image",
        title: "Real Estate AI Calling | mKcalling",
        description: "Automate real estate lead follow-ups, site visit scheduling, and post-visit calls with mKcalling — configured and managed for Indian real estate teams.",
        images: ["/mKCalling_Logo.png"],
      },
    };
  }

  // Special metadata for BFSI & Fintech
  if (slug === "bfsi-fintech") {
    return {
      title: "BFSI & Fintech AI Calling | mKcalling",
      description: "Automate verification, reminders, and customer communication for BFSI and fintech teams with mKcalling — configured and managed for Indian businesses.",
      alternates: { canonical: `/industries/${slug}` },
      openGraph: {
        title: "BFSI & Fintech AI Calling | mKcalling",
        description: "Automate verification, reminders, and customer communication for BFSI and fintech teams with mKcalling — configured and managed for Indian businesses.",
        type: "article",
        url: `https://mkcalling.mchatbot.ai/industries/${slug}`,
        images: ["/mKCalling_Logo.png"],
      },
      twitter: {
        card: "summary_large_image",
        title: "BFSI & Fintech AI Calling | mKcalling",
        description: "Automate verification, reminders, and customer communication for BFSI and fintech teams with mKcalling — configured and managed for Indian businesses.",
        images: ["/mKCalling_Logo.png"],
      },
    };
  }

  // Special metadata for Insurance
  if (slug === "insurance") {
    return {
      title: "Insurance AI Calling | mKcalling",
      description: "Automate insurance renewal reminders, onboarding, and customer follow-ups with mKcalling — configured and managed for Indian insurance teams.",
      alternates: { canonical: `/industries/${slug}` },
      openGraph: {
        title: "Insurance AI Calling | mKcalling",
        description: "Automate insurance renewal reminders, onboarding, and customer follow-ups with mKcalling — configured and managed for Indian insurance teams.",
        type: "article",
        url: `https://mkcalling.mchatbot.ai/industries/${slug}`,
        images: ["/mKCalling_Logo.png"],
      },
      twitter: {
        card: "summary_large_image",
        title: "Insurance AI Calling | mKcalling",
        description: "Automate insurance renewal reminders, onboarding, and customer follow-ups with mKcalling — configured and managed for Indian insurance teams.",
        images: ["/mKCalling_Logo.png"],
      },
    };
  }

  // Special metadata for Hospitality & Travel
  if (slug === "hospitality-travel") {
    return {
      title: "Hospitality & Travel AI Calling | mKcalling",
      description: "Automate booking confirmations, reminders, guest support, and feedback calls with mKcalling — configured and managed for Indian hospitality and travel teams.",
      alternates: { canonical: `/industries/${slug}` },
      openGraph: {
        title: "Hospitality & Travel AI Calling | mKcalling",
        description: "Automate booking confirmations, reminders, guest support, and feedback calls with mKcalling — configured and managed for Indian hospitality and travel teams.",
        type: "article",
        url: `https://mkcalling.mchatbot.ai/industries/${slug}`,
        images: ["/mKCalling_Logo.png"],
      },
      twitter: {
        card: "summary_large_image",
        title: "Hospitality & Travel AI Calling | mKcalling",
        description: "Automate booking confirmations, reminders, guest support, and feedback calls with mKcalling — configured and managed for Indian hospitality and travel teams.",
        images: ["/mKCalling_Logo.png"],
      },
    };
  }

  // Special metadata for E-commerce & D2C
  if (slug === "ecommerce-d2c") {
    return {
      title: "E-commerce & D2C AI Calling | mKcalling",
      description: "Automate order confirmation, delivery coordination, customer support, and feedback calls with mKcalling — configured and managed for Indian e-commerce and D2C brands.",
      alternates: { canonical: `/industries/${slug}` },
      openGraph: {
        title: "E-commerce & D2C AI Calling | mKcalling",
        description: "Automate order confirmation, delivery coordination, customer support, and feedback calls with mKcalling — configured and managed for Indian e-commerce and D2C brands.",
        type: "article",
        url: `https://mkcalling.mchatbot.ai/industries/${slug}`,
        images: ["/mKCalling_Logo.png"],
      },
      twitter: {
        card: "summary_large_image",
        title: "E-commerce & D2C AI Calling | mKcalling",
        description: "Automate order confirmation, delivery coordination, customer support, and feedback calls with mKcalling — configured and managed for Indian e-commerce and D2C brands.",
        images: ["/mKCalling_Logo.png"],
      },
    };
  }

  // Special metadata for Logistics
  if (slug === "logistics") {
    return {
      title: "Logistics AI Calling | mKcalling",
      description: "Automate pickup coordination, delivery updates, and customer communication with mKcalling — configured and managed for Indian logistics teams.",
      alternates: { canonical: `/industries/${slug}` },
      openGraph: {
        title: "Logistics AI Calling | mKcalling",
        description: "Automate pickup coordination, delivery updates, and customer communication with mKcalling — configured and managed for Indian logistics teams.",
        type: "article",
        url: `https://mkcalling.mchatbot.ai/industries/${slug}`,
        images: ["/mKCalling_Logo.png"],
      },
      twitter: {
        card: "summary_large_image",
        title: "Logistics AI Calling | mKcalling",
        description: "Automate pickup coordination, delivery updates, and customer communication with mKcalling — configured and managed for Indian logistics teams.",
        images: ["/mKCalling_Logo.png"],
      },
    };
  }

  // Special metadata for Automotive
  if (slug === "automotive") {
    return {
      title: "Automotive AI Calling | mKcalling",
      description: "Automate sales follow-ups, test drive scheduling, service reminders, and customer communication with mKcalling — configured and managed for Indian automotive businesses.",
      alternates: { canonical: `/industries/${slug}` },
      openGraph: {
        title: "Automotive AI Calling | mKcalling",
        description: "Automate sales follow-ups, test drive scheduling, service reminders, and customer communication with mKcalling — configured and managed for Indian automotive businesses.",
        type: "article",
        url: `https://mkcalling.mchatbot.ai/industries/${slug}`,
        images: ["/mKCalling_Logo.png"],
      },
      twitter: {
        card: "summary_large_image",
        title: "Automotive AI Calling | mKcalling",
        description: "Automate sales follow-ups, test drive scheduling, service reminders, and customer communication with mKcalling — configured and managed for Indian automotive businesses.",
        images: ["/mKCalling_Logo.png"],
      },
    };
  }

  // Special metadata for Field Service & Maintenance
  if (slug === "field-service-maintenance") {
    return {
      title: "Field Service & Maintenance AI Calling | mKcalling",
      description: "Automate installation, maintenance, and AMC communication with mKcalling — configured and managed for Indian field service businesses.",
      alternates: { canonical: `/industries/${slug}` },
      openGraph: {
        title: "Field Service & Maintenance AI Calling | mKcalling",
        description: "Automate installation, maintenance, and AMC communication with mKcalling — configured and managed for Indian field service businesses.",
        type: "article",
        url: `https://mkcalling.mchatbot.ai/industries/${slug}`,
        images: ["/mKCalling_Logo.png"],
      },
      twitter: {
        card: "summary_large_image",
        title: "Field Service & Maintenance AI Calling | mKcalling",
        description: "Automate installation, maintenance, and AMC communication with mKcalling — configured and managed for Indian field service businesses.",
        images: ["/mKCalling_Logo.png"],
      },
    };
  }

  return {
    title: `${industry.name} | mKcalling`,
    description: `Learn how mKcalling automates calling for ${industry.name} businesses — configured and managed for Indian companies.`,
    alternates: { canonical: `/industries/${slug}` },
    openGraph: {
      title: `${industry.name} | mKcalling`,
      description: `Learn how mKcalling automates calling for ${industry.name} businesses — configured and managed for Indian companies.`,
      type: "article",
      url: `https://mkcalling.mchatbot.ai/industries/${slug}`,
      images: ["/mKCalling_Logo.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${industry.name} | mKcalling`,
      description: `Learn how mKcalling automates calling for ${industry.name} businesses — configured and managed for Indian companies.`,
      images: ["/mKCalling_Logo.png"],
    },
  };
}

export default async function IndustryPage({ params }: Params) {
  const { slug } = await params;
  
  // 301 redirect from old local-services route to new field-service-maintenance route
  if (slug === "local-services") {
    permanentRedirect("/industries/field-service-maintenance");
  }
  
  const industry = industriesData.find(ind => ind.slug === slug);

  if (!industry) {
    return (
      <section className="py-24 pt-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Industry Not Found</h1>
            <p className="text-muted-foreground mb-6">The requested industry page could not be found.</p>
            <Link href="/industries">
              <Button variant="outline">Back to Industries</Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Check if this is an industry with full content
  const isBankingDsa = slug === "banking-dsa";
  const isHealthcare = slug === "healthcare";
  const isEducation = slug === "education";
  const isRealEstate = slug === "real-estate";
  const isBfsiFintech = slug === "bfsi-fintech";
  const isInsurance = slug === "insurance";
  const isHospitalityTravel = slug === "hospitality-travel";
  const isEcommerceD2c = slug === "ecommerce-d2c";
  const isLogistics = slug === "logistics";
  const isAutomotive = slug === "automotive";
  const isFieldServiceMaintenance = slug === "field-service-maintenance";
  const content = isBankingDsa ? bankingDsaContent : isHealthcare ? healthcareContent : isEducation ? educationContent : isRealEstate ? realEstateContent : isBfsiFintech ? bfsiFintechContent : isInsurance ? insuranceContent : isHospitalityTravel ? hospitalityTravelContent : isEcommerceD2c ? ecommerceD2cContent : isLogistics ? logisticsContent : isAutomotive ? automotiveContent : isFieldServiceMaintenance ? fieldServiceMaintenanceContent : null;

  if ((isBankingDsa || isHealthcare || isEducation || isRealEstate || isBfsiFintech || isInsurance || isHospitalityTravel || isEcommerceD2c || isLogistics || isAutomotive || isFieldServiceMaintenance) && content) {
    const { hero, whyNeed, useCases, workflow, capabilities, whyChoose, cta } = content;
    const control = isBankingDsa || isRealEstate || isBfsiFintech || isInsurance || isHospitalityTravel || isEcommerceD2c || isLogistics || isAutomotive || isFieldServiceMaintenance ? (content as typeof bankingDsaContent | typeof realEstateContent | typeof bfsiFintechContent | typeof insuranceContent | typeof hospitalityTravelContent | typeof ecommerceD2cContent | typeof logisticsContent | typeof automotiveContent | typeof fieldServiceMaintenanceContent).control : undefined;
    const trust = isHealthcare || isEducation ? (content as typeof healthcareContent | typeof educationContent).trust : undefined;

    return (
      <section className="py-24 pt-32">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/industries" className="hover:text-foreground transition-colors">Industries</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{industry.name}</span>
            </nav>

            {/* SECTION 1: Hero */}
            <div className="mb-16">
              <Link href="/industries" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
                <ArrowLeft className="w-4 h-4" />
                Back to Industries
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{hero.headline}</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mb-6">{hero.subheadline}</p>
              <ul className="space-y-2 mb-6">
                {hero.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/schedule-demo">
                  <Button size="lg" className="bg-gradient-primary hover:shadow-glow-primary transition-all group">
                    {hero.primaryCTA}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="border-primary/30 hover:border-primary/60">
                    {hero.secondaryCTA}
                  </Button>
                </Link>
              </div>
            </div>

            {/* SECTION 2: Why [Industry] Needs AI Calling */}
            <div className="mb-16 p-8 rounded-xl bg-card border border-border/50">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{whyNeed.title}</h2>
                <p className="text-muted-foreground mb-6">{whyNeed.subtitle}</p>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="font-semibold mb-3 text-foreground">{whyNeed.dependsOn.title}</p>
                    <ul className="space-y-2">
                      {whyNeed.dependsOn.items.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-3 text-foreground">{whyNeed.challenges.title}</p>
                    <ul className="space-y-2">
                      {whyNeed.challenges.items.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-foreground font-medium">{whyNeed.bridgeLine}</p>
                </div>
              </div>
            </div>

            {/* SECTION 3: Key [Industry] Use Cases */}
            <div className="mb-16">
              <div className="text-center space-y-4 mb-8">
                <h2 className="text-3xl md:text-4xl font-bold">{useCases.title}</h2>
                <p className="text-muted-foreground">{useCases.subtitle}</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {useCases.items.map((useCase, index) => (
                  <div key={index} className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all">
                    {useCase.link ? (
                      <Link href={useCase.link} className="block group">
                        <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">
                          {useCase.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">{useCase.description}</p>
                        <div className="flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          Learn more
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </Link>
                    ) : (
                      <>
                        <h3 className="font-semibold text-lg mb-2 text-foreground">{useCase.title}</h3>
                        <p className="text-sm text-muted-foreground">{useCase.description}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 max-w-4xl mx-auto">
                <p className="text-foreground font-medium text-center">{useCases.note}</p>
              </div>
            </div>

            {/* SECTION 4: Example Workflow */}
            <div className="mb-16 p-8 rounded-xl bg-card border border-border/50">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{workflow.title}</h2>
                <p className="text-muted-foreground mb-6">{workflow.subtitle}</p>
                <div className="space-y-4 mb-6">
                  {workflow.steps.map((step, index) => (
                    <div key={index} className="flex gap-4 p-6 rounded-xl bg-background border border-border/50">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                        {step.step}
                      </div>
                      <p className="text-foreground pt-2">{step.description}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-foreground font-medium italic">{workflow.keyMessage}</p>
                </div>
              </div>
            </div>

            {/* SECTION 5: Platform Capabilities */}
            <div className="mb-16 p-8 rounded-xl bg-card border border-border/50">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{capabilities.title}</h2>
                <p className="text-muted-foreground mb-6">{capabilities.subtitle}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {capabilities.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SECTION 6: Control, Auditability & Responsible Communication (Banking DSA) or Trust, Respect & Patient Communication (Healthcare) */}
            {control && (
              <div className="mb-16 p-8 rounded-xl bg-card border border-primary/30">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl md:text-3xl font-bold">{control.title}</h2>
                  </div>
                  <p className="text-muted-foreground mb-6">{control.subtitle}</p>
                  <ul className="space-y-3 mb-6">
                    {control.points.map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-foreground font-medium">{control.closing}</p>
                  </div>
                </div>
              </div>
            )}
            {trust && (
              <div className="mb-16 p-8 rounded-xl bg-card border border-primary/30">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl md:text-3xl font-bold">{trust.title}</h2>
                  </div>
                  <p className="text-muted-foreground mb-6">{trust.subtitle}</p>
                  <ul className="space-y-3 mb-6">
                    {trust.points.map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <p className="text-foreground font-medium">{trust.closing}</p>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 7: Why [Industry] Chooses mKcalling */}
            <div className="mb-16">
              <div className="text-center space-y-4 mb-8">
                <h2 className="text-3xl md:text-4xl font-bold">{whyChoose.title}</h2>
                <p className="text-muted-foreground">{whyChoose.subtitle}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {whyChoose.reasons.map((reason, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border/50">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 8: CTA Band */}
            <div className="text-center p-12 rounded-xl bg-card border border-primary/30">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{cta.headline}</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">{cta.copy}</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/schedule-demo">
                  <Button size="lg" className="bg-gradient-primary hover:shadow-glow-primary transition-all group">
                    {cta.primaryCTA}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="border-primary/30 hover:border-primary/60">
                    {cta.secondaryCTA}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Default placeholder for other industries
  return (
    <section className="py-24 pt-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/industries" className="hover:text-foreground transition-colors">Industries</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{industry.name}</span>
          </nav>

          {/* Hero */}
          <div className="mb-12">
            <Link href="/industries" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Industries
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{industry.name}</h1>
            <p className="text-xl text-muted-foreground">
              Content coming soon. Learn how mKcalling automates calling for {industry.name} businesses.
            </p>
          </div>

          {/* Placeholder Content */}
          <div className="p-8 rounded-xl bg-card border border-border/50 mb-12">
            <h2 className="text-2xl font-bold mb-4">Use Cases for {industry.name}</h2>
            <ul className="space-y-3 mb-6">
              {industry.bullets.map((bullet, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-foreground">{bullet}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground mb-6">
              We're preparing detailed content for {industry.name}. In the meantime, schedule a demo to see how mKcalling can help your business automate calling operations.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center p-12 rounded-xl bg-card border border-primary/30">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">See How mKcalling Works for {industry.name}</h2>
            <p className="text-muted-foreground mb-6">
              Schedule a demo to learn how we can automate your calling operations.
            </p>
            <Link href="/schedule-demo">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow-primary transition-all group">
                Schedule a Demo
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
