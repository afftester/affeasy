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
        {/* Shutdown Banner */}
        <div className="mb-8 w-full rounded-lg bg-gradient-to-r from-red-600 to-red-500 p-6 shadow-lg">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-2 text-xl font-bold text-white">
              ⚠️ Important Update ⚠️
            </h2>
            <p className="text-red-100">
              AffEasy has now been permanently shut down. We truly appreciate
              your support and are grateful to have been part of your journey.
            </p>
            <p className="mt-2 font-medium text-white">
              Thank you for being with us! 🙏
            </p>
          </div>
        </div>

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
