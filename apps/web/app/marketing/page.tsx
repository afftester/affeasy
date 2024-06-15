"use client";

// import { AlertCard } from "@/components/marketing/alert/card";
import { Hero } from "./marketing-components/hero";
import { BenefitsCard } from "./marketing-components/benefits";
import { AffiliateNetworksCard } from "./marketing-components/networks/card";
import { MarketingLayout } from "./marketing-components/marketing-layout";

export default function Page() {
  return (
    <MarketingLayout>
      <div className="grid gap-8">
        <Hero />
        <BenefitsCard />
        <AffiliateNetworksCard />
      </div>
    </MarketingLayout>
  );
}
