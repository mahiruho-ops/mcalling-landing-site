import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { UseCasesSection } from "@/components/UseCasesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { WhyMkcallingSection } from "@/components/WhyMkcallingSection";
import { IndustriesSection } from "@/components/IndustriesSection";
import { PricingTeaserSection } from "@/components/PricingTeaserSection";
import { TrustSection } from "@/components/TrustSection";
import { FinalCTASection } from "@/components/FinalCTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <UseCasesSection />
      <HowItWorksSection />
      <WhyMkcallingSection />
      <IndustriesSection />
      <PricingTeaserSection />
      <TrustSection />
      <FinalCTASection />
    </>
  );
}