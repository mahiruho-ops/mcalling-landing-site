import type { LegalDocument } from "./types";
import { legalMeta } from "./meta";

const m = legalMeta;

export const shippingDocument: LegalDocument = {
  slug: "shipping",
  title: "Shipping & Delivery Policy",
  description: "How mKcalling digital services are delivered after purchase.",
  effectiveDate: m.effectiveDate,
  lastUpdated: m.lastUpdated,
  intro: [
    `${m.productName} is a digital software and managed services offering. No physical goods are shipped.`,
    "This policy describes how service activation and platform access are delivered electronically.",
  ],
  sections: [
    {
      id: "delivery-method",
      title: "1. Delivery method",
      paragraphs: [
        "Digital delivery only — no physical goods are shipped.",
        "Service activation and platform access are provided electronically through our customer application and onboarding process.",
      ],
    },
    {
      id: "what-is-delivered",
      title: "2. What is delivered",
      list: [
        "Platform login and dashboard access at the customer application.",
        "AI agent configuration and managed setup (as per your plan or statement of work).",
        "Telephone number (DID) provisioning where included in your order.",
        "Knowledge-base ingestion and related implementation work.",
        "Training or handover sessions as agreed during onboarding.",
      ],
    },
    {
      id: "activation",
      title: "3. Activation timeline",
      paragraphs: [
        `After successful payment, production access typically begins following onboarding and implementation. Our target timeline to commence onboarding is within ${m.onboardingDays} of payment confirmation, subject to your timely provision of required information, approvals, and integrations.`,
        "Partial or staging access may be provided earlier where agreed. Full production go-live depends on completion of configuration, testing, and any carrier or compliance steps applicable to your use case.",
        "Payments are accepted through ${m.billingUrl} after account authentication.",
      ],
    },
    {
      id: "geography",
      title: "4. Geographic availability",
      paragraphs: [
        "Services are designed primarily for businesses operating in India. International deployment may be available on request and subject to separate agreement, regulatory review, and technical feasibility.",
      ],
    },
    {
      id: "delays",
      title: "5. Delays",
      paragraphs: [
        "If onboarding is delayed beyond the committed timeline for reasons within our control, we will notify you by email with a revised estimated timeline.",
        "Extended delays or exceptional circumstances are handled case-by-case. Please contact support for assistance.",
      ],
    },
    {
      id: "contact",
      title: "6. Contact",
      paragraphs: [
        `Delivery or activation questions: ${m.emails.support} | ${m.phone}`,
        `${m.businessHours}. We aim to respond ${m.responseTime}.`,
      ],
    },
  ],
};
