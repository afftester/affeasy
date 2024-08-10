import { FAQ } from "./marketing-components/FAQ";
import VideoPreview from "./marketing-components/VideoPreview";
import { BenefitsCard } from "./marketing-components/benefits";
import { Hero } from "./marketing-components/hero";
import { Hero2 } from "./marketing-components/hero2";
import { MarketingLayout } from "./marketing-components/marketing-layout";
import AffiliateNetworksCard from "./marketing-components/networks-card";
export default function Page() {
  return (
    <MarketingLayout>
      <div className="mx-auto flex flex-col items-center">
        <div className="grid w-full gap-8">
          <Hero />
          <VideoPreview />
          <BenefitsCard />
          <AffiliateNetworksCard />
          <Hero2 />
          {/* <StatsCard /> */}
        </div>
        <div className="w-full max-w-4xl">
          <FAQ />
        </div>
      </div>
    </MarketingLayout>
  );
}
