import Amazon from "./networks/amazon";
import { Documenso } from "./networks/documenso"; // Import your SVG components
// import RakutenLogo from "@/components/svg/rakuten";
// import EBayLogo from "@/components/svg/ebay";
// import HOWLLogo from "@/components/svg/howl";
// import PepperJamLogo from "@/components/svg/pepperjam";
// import SOVRNLogo from "@/components/svg/sovrn";
// import ShareASaleLogo from "@/components/svg/shareasale";
// import ImpactLogo from "@/components/svg/impact";
// import AWINLogo from "@/components/svg/awin";
// import FlexOffersLogo from "@/components/svg/flexoffers";
// import RefersionLogo from "@/components/svg/refersion";

const statisticsData = [
  { label: "Amazon", logo: Amazon },
  { label: "CJ", logo: Documenso },
  { label: "Rakuten", logo: Documenso },
  { label: "EBay", logo: Documenso },
  { label: "HOWL", logo: Documenso },
  { label: "PepperJam", logo: Documenso },
  { label: "SOVRN", logo: Documenso },
  { label: "Share A Sale", logo: Documenso },
  { label: "Impact", logo: Documenso },
  { label: "AWIN", logo: Documenso },
  { label: "FlexOffers", logo: Documenso },
  { label: "Refersion", logo: Documenso },
];

export default function AffiliateNetworksCard() {
  return (
    <div className="mx-auto max-w-6xl">
      <p className="mb-6 mt-2 text-center text-sm text-gray-500 md:mt-10 md:text-lg">
        Supported Networks
      </p>
      <div className="grid grid-cols-3 gap-x-8 gap-y-10 md:grid-cols-4">
        {statisticsData.map((stat) => {
          const LogoComponent = stat.logo;
          return (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center"
            >
              <LogoComponent className="h-24 w-24 sm:h-32 sm:w-32" />{" "}
              <span className="md:text-l mt-2 text-sm text-gray-500">
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

{
  /* <Documenso className="h-6 w-24 sm:h-8 sm:w-32" /> */
}
