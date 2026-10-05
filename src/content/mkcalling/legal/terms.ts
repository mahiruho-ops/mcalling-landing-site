import type { LegalDocument } from "./types";
import { legalMeta } from "./meta";

const m = legalMeta;

export const termsDocument: LegalDocument = {
  slug: "terms",
  title: "Terms & Conditions",
  description: "Terms governing use of the mKcalling AI calling platform and related services.",
  effectiveDate: m.effectiveDate,
  lastUpdated: m.lastUpdated,
  intro: [
    `These Terms & Conditions ("Terms") govern access to and use of ${m.productName}, ${m.brandLine} ("we", "us", "our"). By creating an account, requesting a demo, or making a payment through our billing portal, you agree to these Terms.`,
    `Our website is ${m.websiteUrl}. Subscription and usage payments are completed at ${m.billingUrl} (authentication required).`,
  ],
  sections: [
    {
      id: "eligibility",
      title: "1. Eligibility and accounts",
      paragraphs: [
        "Services are offered primarily to businesses and authorized representatives. Individuals may register if they are at least 18 years old and legally able to enter a binding contract.",
        "You must provide accurate registration information, including company name, authorized contact details, email, and phone number. GSTIN may be collected for Indian B2B invoicing where applicable.",
        "We may require business verification or KYC before activating production calling. We may refuse or suspend accounts that fail verification or breach these Terms.",
      ],
    },
    {
      id: "services",
      title: "2. Services",
      paragraphs: [
        `${m.productName} is a software-as-a-service (SaaS) platform for AI-assisted inbound and outbound business calling, including managed configuration, telephony, and related features as described on our website and in your order or statement of work.`,
        "Service scope, plan limits, and commercial terms are defined in your selected plan, quote, order confirmation, or signed agreement. We do not guarantee specific business outcomes from automated calling.",
      ],
    },
    {
      id: "commercial",
      title: "3. Fees, billing, and taxes",
      list: [
        `Fees are quoted in ${m.currency} unless otherwise stated. Published prices are exclusive of GST unless explicitly marked inclusive; applicable GST (currently ${m.gstRate}) is added at invoice or checkout.`,
        "Charges may include one-time setup or implementation fees, annual platform subscriptions, prepaid usage or connected-time packs, and add-ons such as DIDs or concurrent channels.",
        "Usage is metered on connected talk time billed in exact seconds. Failed, unanswered, or busy call attempts are not billed unless otherwise agreed in writing.",
        "Account-level free minutes, where included in your plan, expire at the end of each billing cycle and do not carry forward.",
        "Payment is processed through Razorpay or other methods we designate. By paying, you authorize us and our payment partners to charge the applicable amounts.",
        "You are responsible for applicable taxes, withholdings, and providing valid billing details. Invoices are issued in accordance with Indian tax laws where applicable.",
      ],
    },
    {
      id: "acceptable-use",
      title: "4. Acceptable use",
      paragraphs: [
        "You agree to use the platform lawfully and responsibly. Without limitation, you must not:",
      ],
      list: [
        "Violate applicable laws, including telecom and TRAI-related requirements.",
        "Place calls without appropriate consent, or in violation of Do-Not-Call (DND) or similar registries.",
        "Engage in spam, harassment, fraud, or deceptive practices.",
        "Resell or sublicense platform access without our written consent.",
        "Attempt to disrupt, reverse engineer, or circumvent security or usage limits.",
      ],
    },
    {
      id: "acceptable-use-responsibility",
      title: "4.1 Your compliance responsibility",
      paragraphs: [
        "You are solely responsible for call scripts, campaigns, and compliance with regulations applicable to your industry. We may suspend or terminate access for misuse, as described in our Trust & Compliance materials.",
      ],
    },
    {
      id: "ip",
      title: "5. Intellectual property",
      list: [
        "You retain ownership of your data, scripts, knowledge-base content, and materials you provide.",
        "We retain ownership of the platform, software, documentation, templates, and pre-built components. We grant you a limited, non-exclusive license to use the platform during an active subscription or agreed term.",
      ],
    },
    {
      id: "availability",
      title: "6. Availability",
      paragraphs: [
        "Standard plans are provided on a best-effort basis. We do not guarantee uninterrupted uptime unless a separate enterprise SLA applies in writing.",
        "Scheduled maintenance, third-party carrier or cloud outages, and force majeure events may affect availability. We will use reasonable efforts to restore service.",
      ],
    },
    {
      id: "price-changes",
      title: "7. Price changes",
      paragraphs: [
        "We may change plan prices, usage rates, or fees with at least thirty (30) days' notice by email and/or notice on the platform or website, except where a fixed-term contract states otherwise.",
        "Changes apply from your next renewal or billing cycle unless you are on a prepaid term that we honor until expiry.",
      ],
    },
    {
      id: "termination",
      title: "8. Suspension and termination",
      paragraphs: [
        "We may suspend or terminate your access, with notice where practicable, for reasons including non-payment, breach of these Terms, regulatory requirements, extended inactivity, or security risk.",
        "You may request cancellation as described in our Cancellation & Refunds Policy. Provisions that by nature should survive termination (including payment obligations, confidentiality, liability limits, and governing law) will survive.",
      ],
    },
    {
      id: "liability",
      title: "9. Disclaimer and limitation of liability",
      paragraphs: [
        'The platform and services are provided "as is" and "as available" to the fullest extent permitted by law. We disclaim implied warranties of merchantability, fitness for a particular purpose, and non-infringement where permissible.',
        "To the maximum extent permitted by applicable law, our aggregate liability arising out of or related to these Terms or the services shall not exceed the total fees paid by you to us in the twelve (12) months preceding the event giving rise to the claim.",
        "We shall not be liable for indirect, incidental, special, consequential, or punitive damages, or for lost profits, revenue, or data, even if advised of the possibility.",
      ],
    },
    {
      id: "force-majeure",
      title: "10. Force majeure",
      paragraphs: [
        "We are not liable for delay or failure to perform due to events beyond our reasonable control, including natural disasters, war, government actions, labor disputes, internet or telecom failures, or failures of third-party providers.",
      ],
    },
    {
      id: "law",
      title: "11. Governing law and disputes",
      paragraphs: [
        `These Terms are governed by ${m.governingLaw}. Subject to applicable law, courts in ${m.jurisdiction} shall have exclusive jurisdiction.`,
        "Before initiating formal proceedings, parties agree to attempt good-faith resolution by contacting support.",
      ],
    },
    {
      id: "changes",
      title: "12. Changes to these Terms",
      paragraphs: [
        "We may update these Terms from time to time. Material changes will be communicated by email and/or prominent notice on our website. Continued use after the effective date constitutes acceptance.",
      ],
    },
    {
      id: "contact",
      title: "13. Contact",
      paragraphs: [
        `Questions about these Terms: ${m.emails.support} | ${m.phone}`,
        `Registered office: ${m.registeredAddress.formatted}`,
      ],
    },
  ],
};
