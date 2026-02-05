export interface Industry {
  name: string;
  slug: string;
  bullets: string[];
  highlight?: boolean;
  badge?: string;
}

export const industriesData: Industry[] = [
  {
    name: "Healthcare",
    slug: "healthcare",
    bullets: [
      "Appointment booking & reminders",
      "Follow-ups after visits",
      "Patient support calls"
    ]
  },
  {
    name: "Education",
    slug: "education",
    bullets: [
      "Admissions follow-ups",
      "Fee reminders",
      "Student/parent support"
    ]
  },
  {
    name: "Real Estate",
    slug: "real-estate",
    bullets: [
      "Lead qualification",
      "Site visit scheduling",
      "Post-visit follow-ups"
    ]
  },
  {
    name: "Banking DSA",
    slug: "banking-dsa",
    bullets: [
      "Lead follow-ups & qualification",
      "Application status & document reminders",
      "Payment and EMI follow-ups"
    ],
    highlight: true,
    badge: "High Volume"
  },
  {
    name: "BFSI & Fintech",
    slug: "bfsi-fintech",
    bullets: [
      "KYC/verification calls",
      "Reminders & renewals",
      "Support follow-ups"
    ]
  },
  {
    name: "Insurance",
    slug: "insurance",
    bullets: [
      "Policy renewals",
      "Verification & onboarding",
      "Claim status follow-ups"
    ]
  },
  {
    name: "Hospitality & Travel",
    slug: "hospitality-travel",
    bullets: [
      "Booking confirmations",
      "Pre-check-in/out reminders",
      "Feedback calls"
    ]
  },
  {
    name: "E-commerce & D2C",
    slug: "ecommerce-d2c",
    bullets: [
      "COD/order confirmation",
      "Delivery coordination",
      "Post-delivery feedback"
    ]
  },
  {
    name: "Logistics",
    slug: "logistics",
    bullets: [
      "Pickup/delivery coordination",
      "Address confirmation",
      "Status updates"
    ]
  },
  {
    name: "Automotive",
    slug: "automotive",
    bullets: [
      "Service appointment reminders",
      "Lead follow-ups",
      "Feedback calls"
    ]
  },
  {
    name: "Field Service & Maintenance",
    slug: "field-service-maintenance",
    bullets: [
      "Installation & service coordination",
      "AMC & scheduled service reminders",
      "Technician visit confirmations"
    ],
    highlight: false
  }
];

export const industriesIndexContent = {
  hero: {
    headline: "Industries We Serve",
    subheadline: "mKcalling helps Indian businesses automate inbound and outbound calls across sales, support, reminders, and follow-ups — configured and managed for you.",
    primaryCTA: "Schedule a Demo",
    secondaryCTA: "View Use Cases"
  },
  whyFits: {
    title: "Why mKcalling fits across industries",
    subtitle: "Keep this section compact and repeat the universal differentiators",
    points: [
      "All-inclusive pricing (no hidden LLM/STT/TTS/telephony costs)",
      "Billing only for connected talk time",
      "No charge for failed/unanswered calls",
      "Indian numbers, Indian languages, low latency",
      "Managed setup and tuning (no AI expertise needed)",
      "Human escalation via callback when required"
    ]
  },
  cta: {
    headline: "Not sure which industry page fits best?",
    copy: "Tell us your use case and calling volume — we'll recommend the right setup.",
    primaryCTA: "Schedule a Demo",
    secondaryCTA: "Explore Use Cases"
  }
};
