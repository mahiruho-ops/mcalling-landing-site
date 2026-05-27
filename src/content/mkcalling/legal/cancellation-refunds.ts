import type { LegalDocument } from "./types";
import { legalMeta } from "./meta";

const m = legalMeta;

export const cancellationRefundsDocument: LegalDocument = {
  slug: "cancellation-refunds",
  title: "Cancellation & Refunds Policy",
  description: "Cancellation, refunds, and billing dispute procedures for mKcalling.",
  effectiveDate: m.effectiveDate,
  lastUpdated: m.lastUpdated,
  intro: [
    `This policy applies to fees paid for ${m.productName} through our billing portal (${m.billingUrl}) or Razorpay payment links issued by ${m.legalEntity}.`,
    "Enterprise or custom contracts may include additional terms in a signed agreement; where they conflict, the signed agreement prevails.",
  ],
  sections: [
    {
      id: "cancellation",
      title: "1. Cancellation",
      list: [
        "To cancel a subscription or service, email support with your account and order details. Self-serve cancellation in the dashboard may not be available for all plans.",
        "Upon approved cancellation, your subscription is cancelled immediately for renewal purposes. Platform access generally continues until the end of your current prepaid or annual billing period unless we agree otherwise or suspend access for breach or non-payment.",
        "Cancellation does not automatically entitle you to a cash refund for the current period (see below).",
      ],
    },
    {
      id: "setup-fee",
      title: "2. Setup and implementation fees",
      paragraphs: [
        "One-time setup or implementation fees cover discovery, configuration, and onboarding work. Refund eligibility depends on work performed and is assessed by our Finance team.",
        "Submit requests to the refund contact below with your payment reference and reason. Fees are generally non-refundable once onboarding work has commenced, unless otherwise required by law or agreed in writing.",
      ],
    },
    {
      id: "subscription",
      title: "3. Platform subscription fees",
      paragraphs: [
        "Annual platform subscriptions are prepaid for the subscription term. We do not provide pro-rata cash refunds for unused months within a prepaid annual term upon cancellation, except where required by law or explicitly agreed in writing.",
        "If you cancel, you may retain access through the end of the paid term subject to these Terms and acceptable use.",
      ],
    },
    {
      id: "usage-credits",
      title: "4. Usage credits and free minutes",
      list: [
        "Prepaid usage balances or minute packs credited to your account are non-refundable once credited, except where required by law.",
        "Free minutes included in your plan expire at the end of each billing cycle and are not refundable or convertible to cash.",
      ],
    },
    {
      id: "addons",
      title: "5. Add-ons",
      paragraphs: [
        "Add-ons such as additional DIDs or concurrent channels are non-refundable after provisioning (including carrier or number assignment), except where required by law.",
      ],
    },
    {
      id: "trial",
      title: "6. Free trial",
      paragraphs: [
        `Where a ${m.freeTrialDays}-day trial is offered, conversion to a paid plan is intentional. Fees charged after trial conversion are not refundable on the basis of mistaken conversion.`,
      ],
    },
    {
      id: "billing-errors",
      title: "7. Billing errors and duplicate charges",
      list: [
        `Report suspected duplicate or erroneous charges to ${m.emails.refunds} within ${m.billingErrorReportDays} days of the transaction, including payment ID, date, amount, and description.`,
        "Verified billing errors will be refunded or credited as appropriate, typically to the original payment method via Razorpay.",
        `Target resolution timeline: up to ${m.refundResolutionDays} business days after we confirm the error, subject to payment-network processing times.`,
      ],
    },
    {
      id: "refund-process",
      title: "8. Refund request process",
      list: [
        `Email: ${m.emails.refunds}`,
        "Include: Razorpay payment ID, transaction date, amount, registered email, company name, and reason.",
        "Approved refunds are processed by our Finance team to the original payment method where possible.",
        `Allow up to ${m.refundResolutionDays} business days for internal review and initiation; bank or card settlement may take additional time.`,
      ],
    },
    {
      id: "chargebacks",
      title: "9. Payment disputes and chargebacks",
      paragraphs: [
        "Please contact us before initiating a bank or card chargeback so we can investigate. Accounts may be restricted during an open payment dispute.",
        "Razorpay and your bank's dispute processes may apply where applicable.",
      ],
    },
    {
      id: "contact",
      title: "10. Contact",
      paragraphs: [
        `Support: ${m.emails.support} | Refunds: ${m.emails.refunds} | ${m.phone}`,
        `${m.businessHours}.`,
      ],
    },
  ],
};
