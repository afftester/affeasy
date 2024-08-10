import Image from "next/image";

const networkLogos = [
  { name: "Amazon Affiliate", logo: "/path/to/amazon-logo.png" },
  { name: "CJ", logo: "/path/to/cj-logo.png" },
  { name: "Rakuten Affiliates", logo: "/path/to/rakuten-logo.png" },
  { name: "SOVRN", logo: "/path/to/sovrn-logo.png", comingSoon: true },
  { name: "HOWL", logo: "/path/to/howl-logo.png" },
  { name: "Share A Sale", logo: "/path/to/shareasale-logo.png" },
  { name: "Impact", logo: "/path/to/impact-logo.png" },
  { name: "AWIN", logo: "/path/to/awin-logo.png" },
  { name: "EBay", logo: "/path/to/ebay-logo.png" },
  { name: "PepperJam", logo: "/path/to/pepperjam-logo.png" },
  { name: "FlexOffers", logo: "/path/to/flexoffers-logo.png" },
  { name: "Refersion", logo: "/path/to/refersion-logo.png" },
];

const AffiliateNetworkGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {networkLogos.map((network) => (
        <div
          key={network.name}
          className="flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow"
        >
          <div className="relative mb-2 h-16 w-16">
            <Image
              src={network.logo}
              alt={network.name}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <p className="text-center text-sm">{network.name}</p>
          {network.comingSoon && (
            <span className="text-xs text-gray-500">Coming Soon</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default AffiliateNetworkGrid;
