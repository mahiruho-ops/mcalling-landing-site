export const pricingPageContent = {
  gst: {
    shortLine: "All prices on this page are exclusive of GST unless stated. GST @ 18% applies additionally on taxable supplies as per applicable law.",
    suffixExGst: "(ex-GST)",
  },
  hero: {
    headline: "AI Calling Pricing for Businesses That Need Reliable Call Handling at Scale",
    subheadline:
      "Designed for businesses where delayed response, missed calls, and limited calling capacity affect revenue or service quality.",
    qualifier: "Best suited for businesses handling 100+ calls daily.",
    investmentAnchor:
      "Most growing teams invest roughly ₹25K–₹75K per month (ex-GST) depending on workflow complexity and usage — plus GST as applicable.",
    primaryCta: "Cost Estimation Calculator",
    secondaryCta: "Talk to Our Team",
    tertiaryCta: "See How Pricing Works",
  },
  audience: {
    title: "Choose How You Want to Explore Pricing",
    subtitle: "Same platform — different paths depending on your scale and buying process.",
    smb: {
      title: "For SMB / Growing Teams",
      description: "Predictable use cases, faster understanding, and an estimated monthly investment tailored to your inputs.",
      cta: "Start SMB Setup",
    },
    enterprise: {
      title: "For Enterprise / High-Volume Teams",
      description: "Multi-team, high-volume, or integration-heavy environments where architecture and service scope drive pricing.",
      cta: "Start Enterprise Discovery",
    },
  },
  howItWorks: {
    title: "How Pricing Works",
    subtitle: "A few dimensions determine investment — described in business terms, not telephony jargon.",
    cards: [
      {
        key: "complexity",
        title: "Workflow complexity",
        body: "Basic flows need less tuning. Standard and advanced setups involve more branching, testing, and optimization.",
        icon: "workflow" as const,
      },
      {
        key: "capacity",
        title: "Call capacity",
        body: "How many calls need to be handled at the same time drives platform capacity — without you sizing raw infrastructure.",
        icon: "phone" as const,
      },
      {
        key: "usage",
        title: "Usage volume",
        body: "Daily call volume and average call duration help estimate connected minutes and usage-based cost for your tier.",
        icon: "timer" as const,
      },
      {
        key: "service",
        title: "Service level",
        body: "Managed setup, iteration cycles, integrations, and ongoing optimization depth all influence scope.",
        icon: "headset" as const,
      },
    ],
  },
  disqualifier: {
    text:
      "If your business handles very low call volumes or you are only looking to replace a single telecaller at minimum cost, this may not be the best fit yet.",
  },
  smb: {
    sectionTitle: "SMB - Setup & Operational Estimate",
    sectionSubtitle: "Answer a few questions. We will suggest a plan tier and an investment range — not a final quote.",
    fields: {
      dailyVolume: {
        label: "Daily call volume (approx.)",
        options: [
          { value: "lt100" as const, label: "Less than 100" },
          { value: "v100_250" as const, label: "100 – 250" },
          { value: "v250_500" as const, label: "250 – 500" },
          { value: "v500p" as const, label: "500+" },
        ],
      },
      useCases: {
        label: "Use cases to automate",
        sublabel: "Select all that apply — one-time setup scales with the number of workflows you enable.",
        options: [
          { value: "lead_qual", label: "Lead qualification / sales calls" },
          { value: "inbound_support", label: "Inbound support / reception" },
          { value: "missed_followup", label: "Missed call follow-up" },
          { value: "collections", label: "Payment reminders / collections" },
          { value: "appointments", label: "Appointment booking / reminders" },
          { value: "other", label: "Other" },
        ],
      },
      concurrency: {
        label: "Concurrent calls needed",
        options: [
          { value: "1" as const, label: "1" },
          { value: "2" as const, label: "2" },
          { value: "3" as const, label: "3" },
          { value: "4" as const, label: "4" },
          { value: "unsure" as const, label: "Not sure" },
        ],
        hint: "Each concurrent path includes one channel and one DID (bundled). If you are not sure, we infer a starting point from your daily volume.",
      },
      callDuration: {
        label: "Average connected call duration (estimate)",
        hint: "Drag to adjust (1–15 min, 30 sec steps). Default 3 min if you are unsure. Monthly minutes are estimated as: your daily call range × this duration × 30 days.",
        estimatedMinutesTitle: "Estimated monthly connected minutes (indicative range)",
        connectedTimeNote:
          "Note: Each Call is calculated based on actual connected call time, rather than rounding up.",
        durationInputLabel: "Selected duration (minutes)",
      },
      complexity: {
        label: "Workflow complexity",
        options: [
          { value: "basic" as const, label: "Basic", description: "One simple workflow, limited branching." },
          { value: "standard" as const, label: "Standard", description: "Two to three workflows, moderate branching, more tuning." },
          { value: "advanced" as const, label: "Advanced", description: "Multi-step flows, heavier tuning, nuanced handling." },
        ],
      },
      addons: {
        label: "Optional add-ons",
        sublabel: "Select all that apply.",
        options: [
          { id: "crm", label: "CRM integration" },
          { id: "multilang", label: "Multi-language support" },
          { id: "reporting", label: "Advanced reporting" },
          { id: "custom_workflow", label: "Custom workflow design" },
          { id: "priority", label: "Priority support" },
          { id: "org_ai_consultation", label: "Organization Level AI Consultation" },
        ],
      },
    },
    submit: "Show My Estimate",
    result: {
      planLabel: "Recommended plan",
      breakdownTitle: "How this estimate breaks down (ex-GST)",
      setupLabel: "One-time setup & workflow enablement",
      setupUsageCreditTitle: "Included usage credit (from setup)",
      setupUsageCreditLine:
        "{minutes} connected minutes of usage credit, calculated as one-time setup (ex-GST) ÷ your tier rate of ₹{rate}/min (ex-GST).",
      setupUsageCreditValidity:
        "Credit applies to metered connected talk time at your plan rate (ex-GST), for {months} months from go-live.",
      setupUsageCreditFootnote:
        "Indicative totals below are before netting this credit against usage. Final terms are confirmed in your order.",
      channelLabel: "Bundled channel + DID capacity",
      channelSub: "Each concurrent path = 1 channel + 1 DID. Annual charge (ex-GST); monthly figure is an equivalent for comparison.",
      channelBilledAnnually: "Billed annually — monthly equivalent shown for planning only.",
      usageLabel: "Usage (connected talk time)",
      usageSub: "Estimated minutes use your daily call range × average duration × 30 days. Rate depends on recommended plan tier.",
      typicalMonthlyTitle: "Typical all-in monthly view (ex-GST)",
      typicalMonthlyHint: "Channel/DID shown as monthly equivalent + estimated usage for the month.",
      firstYearTitle: "Indicative first year (ex-GST)",
      firstYearHint: "Includes one-time setup, annual bundled capacity, and 12 months of usage at the estimated range.",
      ongoingYearTitle: "Indicative yearly thereafter (ex-GST)",
      ongoingYearHint: "Annual bundled capacity plus 12 months of usage — no repeat of the one-time setup.",
      gstNote: "GST @ 18% is additional on taxable amounts as per applicable law. This is not a binding quote.",
      summaryTitle: "Recommended setup summary",
      useCaseValidation: "Select at least one use case to see an estimate.",
      guidanceTitle: "Guidance",
      guidanceBody:
        "Figures are indicative for planning. Final pricing depends on discovery, voice and language choices, integrations, and production tuning. We will confirm taxes and billing terms before you commit.",
      lowVolumeNote:
        "mKcalling is optimized for meaningful daily call volumes. If your volume is lower, we can still discuss fit — expectations on ROI and setup effort may differ.",
      integrationNote: "Custom integration or heavier workflow design may add scope during implementation.",
      ctas: {
        consultation: "Schedule a Consultation",
      },
    },
  },
  enterprise: {
    sectionTitle: "Enterprise Discovery",
    sectionSubtitle: "Tell us how you operate. We will confirm fit and follow up with a scoped conversation — no instant public quote.",
    fields: {
      scale: {
        label: "Organization scale",
        options: [
          { value: "300_500", label: "300 – 500 calls / day" },
          { value: "500_1000", label: "500 – 1,000 calls / day" },
          { value: "1000p", label: "1,000+ calls / day" },
          { value: "multi", label: "Multi-team / multi-location operations" },
        ],
      },
      domain: {
        label: "Use case domains",
        sublabel: "Select all that apply.",
        options: [
          { value: "sales", label: "Sales operations" },
          { value: "support", label: "Support / reception" },
          { value: "collections", label: "Collections / reminders" },
          { value: "verification", label: "Verification / onboarding" },
          { value: "mixed", label: "Mixed / multi-use-case operations" },
        ],
      },
      currentSetup: {
        label: "Current setup",
        options: [
          { value: "human", label: "Human team only" },
          { value: "outsourced", label: "Call center / outsourced team" },
          { value: "crm_manual", label: "Existing CRM + manual calling" },
          { value: "telephony", label: "Existing telephony stack" },
          { value: "ai_tools", label: "Already using AI calling tools" },
        ],
      },
      integrations: {
        label: "Integration needs",
        sublabel: "Select all that apply.",
        options: [
          { id: "crm", label: "CRM integration" },
          { id: "erp", label: "ERP / internal tools" },
          { id: "webhook", label: "Webhook / API integration" },
          { id: "dashboards", label: "Custom dashboards / reporting" },
          { id: "audit", label: "Role-based access or audit needs" },
        ],
      },
      service: {
        label: "Service expectations",
        sublabel: "Select all that apply.",
        options: [
          { value: "managed_launch", label: "Managed setup and launch" },
          { value: "ongoing", label: "Ongoing optimization and monitoring" },
          { value: "dedicated", label: "Dedicated environment" },
          { value: "define", label: "Need consultation to define scope" },
        ],
      },
    },
    submit: "Show Enterprise Summary",
    result: {
      banner: "Your requirements likely need a custom enterprise setup.",
      pricingFramingTitle: "How enterprise pricing works",
      pricingFramingBody:
        "Enterprise implementations start from ₹2,50,000 (ex-GST). Monthly and consumption billing depends on architecture, usage, security, and support scope — confirmed after discovery. GST @ 18% applies additionally as applicable.",
      featuresTitle: "What enterprise engagements typically include",
      features: [
        "Dedicated or isolated deployment options where required",
        "Advanced knowledge base ingestion and QA",
        "Custom integrations with CRM, ERP, and internal systems",
        "Monitoring, iteration, and optimization cadence",
        "Priority support and named solution alignment",
        "Use-case workshops and compliance-oriented planning",
      ],
      ctas: {
        discovery: "Schedule Enterprise Discovery Call",
      },
    },
  },
  differentiators: {
    title: "Why mKcalling vs Typical Alternatives",
    subtitle:
      "When revenue depends on answered calls, brittle integrations and unmaintained experiments get expensive fast—missed opportunities, compliance exposure, and pilots that stall right after go-live.",
    mahiruhoCard: {
      eyebrow: "Developed & operated by",
      title: "Mahiruho Consulting Services Pvt. Ltd.",
      websiteUrl: "https://www.mahiruho.com",
      lead:
        "12+ years delivering and supporting software solutions for government and private-sector clients—across procurement, delivery discipline, and long-term operations.",
      body:
        "That track record shapes mKcalling: governed rollouts, clear ownership, and a product mindset—not a one-off integration that nobody maintains when traffic doubles or policy questions show up.",
      highlights: [
        "Structured implementation and stakeholder alignment familiar to large public and private programs",
        "Sustained optimization and support—not throwaway scripts when requirements evolve",
      ],
    },
    rows: [
      {
        category: "DIY AI tools",
        contrast:
          "When production breaks—or regulations shift—you still own prompts, telephony edge cases, and tuning. Connectors don’t replace accountability; they move the problem.",
        mkcalling:
          "mKcalling owns the path to production: workflows, voice stack, QA, and tuning for Indian numbers and real traffic—so your team isn’t debugging prompts and carriers when volume spikes.",
      },
      {
        category: "Freelancer-built automations",
        contrast:
          "Knowledge often lives with individuals; handoffs are risky. When call volume jumps or audits arrive, bespoke scripts rarely come with a service contract, documentation, or a roadmap.",
        mkcalling:
          "Documented delivery, named accountability, and ongoing optimization—mKcalling runs as a managed operations system, not a one-time build that goes stale.",
      },
      {
        category: "Raw API platforms",
        contrast:
          "Powerful for engineering-led prototypes—heavy lift for business teams who need stable personas, monitoring, change control, and a repeatable path from pilot to full production load.",
        mkcalling:
          "mKcalling delivers a business-aware rollout: agent design, QA, observability, and managed iteration cycles—so voice stays governable, measurable, and improvable as you scale.",
      },
    ],
  },
  finalCta: {
    title: "Ready to scope AI calling for your operation?",
    subtitle: "Share your context — we will respond with a clear next step, not a generic brochure.",
    primary: "Schedule a Consultation",
    secondary: "Explore the Product",
    secondaryHref: "/product",
  },
} as const;
