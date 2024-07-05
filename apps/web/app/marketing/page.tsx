"use client";

// import { AlertCard } from "@/components/marketing/alert/card";
import { FAQ } from "./marketing-components/FAQ";
import { BenefitsCard } from "./marketing-components/benefits";
import { Hero } from "./marketing-components/hero";
import { MarketingLayout } from "./marketing-components/marketing-layout";
import { AffiliateNetworksCard } from "./marketing-components/networks/card";

export default function Page() {
  return (
    <MarketingLayout>
      <div className="grid gap-8">
        <Hero />
        <div className="bg-[#FFFFFF]">
          <BenefitsCard />
        </div>

        <AffiliateNetworksCard />
      </div>
      <FAQ />
    </MarketingLayout>
  );
}
