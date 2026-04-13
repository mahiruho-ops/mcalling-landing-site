import { Metadata } from "next";
import { PricingAudienceSplit } from "@/components/pricing-v2/PricingAudienceSplit";
import { PricingDisqualifier } from "@/components/pricing-v2/PricingDisqualifier";
import { PricingDifferentiators } from "@/components/pricing-v2/PricingDifferentiators";
import { PricingFinalCTA } from "@/components/pricing-v2/PricingFinalCTA";
import { PricingHero } from "@/components/pricing-v2/PricingHero";
import { PricingGstNotice } from "@/components/pricing-v2/PricingGstNotice";
import { PricingHowItWorks } from "@/components/pricing-v2/PricingHowItWorks";
import { EnterpriseConfigurator } from "@/components/pricing-v2/EnterpriseConfigurator";
import { SMBConfigurator } from "@/components/pricing-v2/SMBConfigurator";

export const metadata: Metadata = {
  title: "AI Calling Pricing for Indian Businesses",
  description:
    "Explore AI calling pricing with a guided setup for SMB and enterprise. Managed service, transparent investment ranges for growing teams, and custom scope for high-volume operations.",
};

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <PricingGstNotice />
      <PricingAudienceSplit />
      <PricingHowItWorks />
      <PricingDisqualifier />
      <SMBConfigurator />
      <EnterpriseConfigurator />
      <PricingDifferentiators />
      <PricingFinalCTA />
    </>
  );
}
