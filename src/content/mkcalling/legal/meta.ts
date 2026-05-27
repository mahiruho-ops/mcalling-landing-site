/** Shared legal / compliance constants from Razorpay questionnaire (April 2026). */

export const legalMeta = {
  productName: "mKcalling",
  legalEntity: "Mahiruho Consulting Services Pvt. Ltd.",
  brandLine: "mKcalling, a product of Mahiruho Consulting Services Pvt. Ltd.",
  effectiveDate: "1 April 2026",
  lastUpdated: "1 April 2026",

  registeredAddress: {
    lines: ["P-30 Purbayan, #3 Rifle Range Road", "Belgharia", "Kolkata, West Bengal 700056", "India"],
    formatted:
      "P-30 Purbayan, #3 Rifle Range Road, Belgharia, Kolkata, West Bengal 700056, India",
  },

  websiteUrl: "https://mkcalling.mchatbot.ai",
  appDashboardUrl: "https://app.calling.mchatbot.ai",
  billingUrl: "https://app.calling.mchatbot.ai/dashboard/billing",
  parentCompanyUrl: "https://www.mahiruho.com",
  parentPrivacyPolicyUrl: "https://www.mahiruho.com",
  linkedInUrl: "https://www.linkedin.com/company/mahiruho-consulting-services",

  emails: {
    support: "support@mahiruho.com",
    sales: "sales@mahiruho.com",
    billing: "support@mahiruho.com",
    refunds: "refund.request@mahiruho.com",
    grievance: "grievance@mahiruho.com",
  },

  phone: "+91-7943446840",
  businessHours: "Monday to Friday, 10:00 AM to 7:00 PM IST",
  responseTime: "within 48 business hours",

  governingLaw: "the laws of India",
  jurisdiction: "the courts at Kolkata, West Bengal, India",

  currency: "INR",
  gstRate: "18%",
  pricesExclusiveGst: true,

  onboardingDays: "2 business days",
  refundResolutionDays: "15 business days",
  billingErrorReportDays: "30",
  freeTrialDays: "7",
  minimumAge: 18,
} as const;

export const legalFooterLinks = [
  { href: "/trust-compliance", label: "Trust & Compliance" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/shipping", label: "Shipping & Delivery" },
  { href: "/cancellation-refunds", label: "Cancellation & Refunds" },
  { href: "/contact", label: "Contact Us" },
] as const;
