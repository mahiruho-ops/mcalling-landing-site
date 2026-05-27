import type { LegalDocument } from "./types";
import { legalMeta } from "./meta";

const m = legalMeta;

export const privacyDocument: LegalDocument = {
  slug: "privacy",
  title: "Privacy Policy",
  description: "How mKcalling collects, uses, and protects personal data.",
  effectiveDate: m.effectiveDate,
  lastUpdated: m.lastUpdated,
  intro: [
    `${m.brandLine} ("we", "us") operates ${m.productName} and this website (${m.websiteUrl}). This Privacy Policy explains how we handle personal data when you visit our site, book a demo, create an account, or use our calling platform.`,
    `Mahiruho group practices may also be described at ${m.parentPrivacyPolicyUrl}. This policy focuses on ${m.productName} and supersedes general statements where they conflict for this product.`,
  ],
  sections: [
    {
      id: "scope",
      title: "1. Scope",
      paragraphs: [
        "This policy applies to personal data processed in connection with mKcalling marketing, sales, onboarding, billing, and platform operations. It does not apply to third-party websites you link to from our services.",
      ],
    },
    {
      id: "data-we-collect",
      title: "2. Personal data we collect",
      list: [
        "Identity and contact: name, email, phone, company name, job role.",
        "Account and billing: billing address, GSTIN (optional), order and invoice details.",
        "Payment: transactions are processed by our payment processor; we do not store full card numbers or CVV.",
        "Platform usage: call metadata, recordings, transcripts, connected-time usage, configuration, and audit logs.",
        "Communications: demo scheduling, support tickets, and email correspondence.",
        "Technical: IP address, browser type, device identifiers, cookies, and similar technologies.",
      ],
    },
    {
      id: "how-we-use",
      title: "3. How we use personal data",
      list: [
        "Provide, operate, and improve the mKcalling platform and managed services.",
        "Process orders, payments, invoicing, and account administration.",
        "Onboard customers, configure agents, and deliver support.",
        "Send service, billing, and security-related communications.",
        "Comply with law, enforce terms, and protect rights and safety.",
        "Analyze website usage and marketing performance (where permitted and, for non-essential cookies, with your consent).",
      ],
    },
    {
      id: "legal-bases",
      title: "4. Legal bases",
      paragraphs: [
        "We process personal data as necessary to perform contracts, comply with legal obligations, pursue legitimate interests (such as security and product improvement), and, where required, based on your consent (for example, certain marketing cookies).",
      ],
    },
    {
      id: "location",
      title: "5. Data location and transfers",
      paragraphs: [
        "We design our platform for Indian businesses. Core call handling data, recordings, and operational logs are stored and processed in India where practicable.",
        "Some subprocessors may process data in other regions. For example, certain large-language-model services may use global infrastructure (such as United States regions). We apply contractual and technical safeguards appropriate to the processing.",
      ],
    },
    {
      id: "retention",
      title: "6. Retention",
      list: [
        "Call recordings and related call logs: up to 12 months, unless a longer period is required by contract or law.",
        "Account and profile data: up to 7 years after account closure or last activity, as needed for legal and business records.",
        "Billing and invoice records: up to 7 years for tax and accounting compliance.",
        "Marketing and lead-form data: up to 7 years unless you opt out earlier where applicable.",
        "Cookies and analytics identifiers: up to 12 months or as described in our cookie notice.",
      ],
    },
    {
      id: "sharing",
      title: "7. Sharing and subprocessors",
      paragraphs: [
        "We share personal data with service providers who assist us under confidentiality and data-protection obligations, including categories such as payment processors, telephony providers, speech and language-model providers, cloud hosting, email and calendar services, and security or analytics providers.",
        "We do not sell personal data. We may disclose data if required by law, court order, or to protect rights and safety.",
      ],
    },
    {
      id: "security",
      title: "8. Security",
      paragraphs: [
        "We implement administrative, technical, and organizational measures appropriate to the nature of the data, including access controls and audit logging. No method of transmission or storage is completely secure.",
      ],
    },
    {
      id: "rights",
      title: "9. Your rights",
      list: [
        "Request access to or correction of personal data we hold about you, subject to verification and legal exceptions.",
        "Contact us regarding privacy questions or complaints.",
      ],
      paragraphs: [
        `Privacy and grievance contact: ${m.emails.grievance}`,
        "We will respond within a reasonable period in accordance with applicable law.",
      ],
    },
    {
      id: "children",
      title: "10. Children",
      paragraphs: [
        `Our services are not directed to individuals under ${m.minimumAge}. We do not knowingly collect personal data from children.`,
      ],
    },
    {
      id: "cookies",
      title: "11. Cookies and tracking",
      paragraphs: [
        "We use essential cookies for site functionality. With your consent, we may use analytics and marketing technologies (such as Meta Pixel) to measure campaigns.",
        "You can manage preferences through our cookie banner. See your browser settings to limit cookies; some features may not work if essential cookies are disabled.",
      ],
    },
    {
      id: "changes",
      title: "12. Changes",
      paragraphs: [
        "We may update this policy. Material changes will be communicated by email and/or notice on our website. The “Last updated” date reflects the latest revision.",
      ],
    },
    {
      id: "contact",
      title: "13. Contact",
      paragraphs: [
        `${m.legalEntity}`,
        m.registeredAddress.formatted,
        `Email: ${m.emails.grievance} | Support: ${m.emails.support} | ${m.phone}`,
      ],
    },
  ],
};
