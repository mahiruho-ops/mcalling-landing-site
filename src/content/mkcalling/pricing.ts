export const pricingContent = {
  hero: {
    headline: "Simple, Transparent Pricing for AI Calling",
    subheadline: "All plans include AI models, telephony, speech processing, infrastructure, and managed setup — with no hidden costs.",
    supportingPoints: [
      "Pay only for connected talk time",
      "No charges for failed or unanswered calls",
      "Free calling minutes every month",
      "Unlimited AI agents"
    ]
  },
  billingRules: {
    title: "How Billing Works",
    subtitle: "Remove confusion before showing prices",
    rules: {
      title: "Billing Rules",
      points: [
        "Billing is calculated on **connected talk time only**",
        "If connected talk time is **1 min 01 sec**, it is billed as **2 minutes**",
        "**Unanswered, busy, or failed call attempts are not billed**",
        "Same billing rules apply to **inbound and outbound calls**",
        "Free minutes are **pooled at the account level**",
        "Unused free minutes **expire at the end of each monthly billing cycle**"
      ]
    },
    allInclusive: {
      title: "All-Inclusive Pricing",
      description: "Your per-minute rate already includes:",
      items: [
        "LLM (AI model) usage",
        "Speech-to-text (STT)",
        "Text-to-speech (TTS)",
        "Telephony charges",
        "Servers and infrastructure",
        "Platform maintenance"
      ],
      closing: "No additional AI or telephony bills."
    }
  },
  plans: {
    base: {
      name: "Base Plan",
      implementation: 50000,
      platformFee: {
        monthly: 25000,
        quarterly: 60000,
        halfYearly: 90000,
        annually: 120000
      },
      freeMinutes: 1500,
      slabs: [
        { min: 0, max: 1500, rate: 0.00 },
        { min: 1501, max: 5000, rate: 9.50 },
        { min: 5001, max: 15000, rate: 8.50 },
        { min: 15001, max: 20000, rate: 8.00 },
        { min: 20001, max: null, rate: 7.50 }
      ],
      included: {
        agents: "Unlimited AI agents",
        kbDocs: "Knowledge base documents: up to 3",
        kbAllocation: "Per-agent KB allocation: 1",
        dids: "Included DIDs: 1",
        channels: "Included concurrent calls (channels): 1"
      },
      addons: {
        additionalDID: {
          monthly: 1500,
          annually: 18000,
          description: "Additional DID: ₹1,500 / month (billed annually upfront = ₹18,000 / year)"
        },
        didPack: {
          price: 50000,
          description: "5 DID pack: ₹50,000 / year"
        },
        additionalChannel: {
          monthly: 12000,
          annually: 120000,
          description: "Additional channel: ₹12,000 / month or ₹1,20,000 / year if paid annually"
        }
      }
    },
    standard: {
      name: "Standard Plan",
      implementation: 85000,
      platformFee: {
        monthly: 25000,
        quarterly: 50000,
        halfYearly: 120000,
        annually: 180000
      },
      freeMinutes: 3000,
      slabs: [
        { min: 0, max: 3000, rate: 0.00 },
        { min: 3001, max: 5000, rate: 9.50 },
        { min: 5001, max: 10000, rate: 8.50 },
        { min: 10001, max: 20000, rate: 8.00 },
        { min: 20001, max: null, rate: 7.00 }
      ],
      included: {
        agents: "Unlimited AI agents",
        kbDocs: "Knowledge base documents: up to 5",
        kbAllocation: "Per-agent KB allocation: 1",
        dids: "Included DIDs: 1",
        channels: "Included concurrent calls (channels): 1"
      },
      addons: {
        additionalDID: {
          monthly: 1200,
          annually: 14400,
          description: "Additional DID: ₹1,200 / month (billed annually upfront = ₹14,400 / year)"
        },
        didPack: {
          price: 50000,
          description: "5 DID pack: ₹50,000 / year"
        },
        additionalChannel: {
          monthly: 10000,
          annually: 96000,
          description: "Additional channel: ₹10,000 / month or ₹96,000 / year if paid annually"
        }
      }
    },
    advanced: {
      name: "Advanced Plan",
      implementation: 150000,
      platformFee: {
        halfYearly: 150000,
        annually: 240000
      },
      freeMinutes: 5000,
      slabs: [
        { min: 0, max: 5000, rate: 0.00 },
        { min: 5001, max: 15000, rate: 8.50 },
        { min: 15001, max: 20000, rate: 7.50 },
        { min: 20001, max: null, rate: 7.00 }
      ],
      included: {
        agents: "Unlimited AI agents",
        kbDocs: "Knowledge base documents: up to 10",
        kbAllocation: "Per-agent KB allocation: 1",
        dids: "Included DIDs: 1",
        channels: "Included concurrent calls (channels): 1"
      },
      addons: {
        additionalDID: {
          monthly: 1000,
          annually: 12000,
          description: "Additional DID: ₹1,000 / month (billed annually upfront = ₹12,000 / year)"
        },
        didPack: {
          price: 50000,
          description: "5 DID pack: ₹50,000 / year"
        },
        additionalChannel: {
          monthly: 10000,
          annually: 96000,
          description: "Additional channel: ₹10,000 / month or ₹96,000 / year if paid annually"
        }
      }
    }
  },
  premium: {
    title: "Premium Voices & Languages (Advanced Plan Only)",
    subtitle: "Set expectations clearly",
    points: [
      "Premium voices and languages are available only in the Advanced plan",
      "Clients may use their own API keys (paid directly to provider), or use mKcalling API key with an additional **₹5.00 / minute** charge",
      "Default maximum call duration: **10 minutes**",
      "Long-duration or exceptional use cases can be custom priced"
    ]
  },
  managedService: {
    title: "Managed Service – What's Included",
    subtitle: "Justify implementation & platform fees",
    included: [
      "3–5 discovery workshops (plan dependent)",
      "Setup of 5–10 use cases",
      "Up to 10 AI agent personas included",
      "Knowledge base ingestion and QA",
      "Up to 5 iteration cycles",
      "Go-live support for active accounts",
      "2 revisions per month included",
      "Business-hours support (P1: 10 business hours, P2: 24 business hours)"
    ],
    additional: "Additional agent personas (if configured by us): ₹10,000 per agent."
  },
  fairUse: {
    title: "Fair Use & Responsible Usage",
    subtitle: "Protect platform without legal heaviness",
    points: [
      "Industry-standard fair-use policy applies",
      "Ethical and lawful usage expected",
      "Accounts violating usage policies may be temporarily or permanently suspended after review"
    ],
    note: "(Full policy to be linked later.)"
  },
  cta: {
    title: "Choose a Plan That Fits Your Calling Volume",
    buttonText: "Schedule a Demo"
  }
};
