import Image from "next/image";

const statisticsData = [
  { label: "Amazon", logo: "/amazon.svg" },
  { label: "Commission Junction", logo: "/cj.svg" },
  { label: "Rakuten", logo: "/rakuten.webp" },
  { label: "EBay", logo: "/ebay.webp", comingSoon: true },
  { label: "HOWL", logo: "/howl.svg", comingSoon: true },
  { label: "PepperJam", logo: "/pepperjam.webp", comingSoon: true },
  { label: "SOVRN", logo: "/sovrn.svg", comingSoon: true },
  { label: "Share A Sale", logo: "/shareasale.webp", comingSoon: true },
  { label: "Impact", logo: "/impact.webp", comingSoon: true },
  { label: "AWIN", logo: "/awin.webp", comingSoon: true },
  { label: "FlexOffers", logo: "/flexoffers.webp", comingSoon: true },
  { label: "Refersion", logo: "/refersion.svg", comingSoon: true },
];

export default function AffiliateNetworksCard() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mt-12 flex w-full max-w-6xl items-center justify-center gap-1">
        <h2 className="text-foreground mb-5 text-center text-2xl font-semibold md:text-4xl">
          All Major Networks Supported
        </h2>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-4 md:gap-x-8 md:gap-y-10">
        {statisticsData.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center">
            <div className="relative aspect-square w-full max-w-[150px] sm:max-w-[180px] md:max-w-[180px]">
              <Image
                src={stat.logo}
                alt={stat.label}
                fill
                sizes="(max-width: 768px) 120px, (max-width: 1024px) 150px, 192px"
                style={{ objectFit: "contain" }}
              />
              {/* {stat.comingSoon && (
                <span className="absolute right-0 top-0 text-xl text-black">
                  *
                </span>
              )} */}
            </div>
            <span className="mt-2 text-center text-sm md:text-lg">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-gray-500">
        * Support Coming Soon for some networks
      </p>
    </div>
  );
}
