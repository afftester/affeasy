import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

export function BentoGridDemo() {
  return (
    <BentoGrid className="max-w-4xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          imgSrc={item.imgSrc}
          className={""}
        />
      ))}
    </BentoGrid>
  );
}

const items = [
  {
    title: "Amazon Affiliate",
    imgSrc:
      "https://res.cloudinary.com/ds5quo9pr/image/upload/f_auto/v1703089442/Company%20Logos/Amazon.webp",
  },
  {
    title: "CJ",
    imgSrc: "/cj.webp",
  },
  {
    title: "Rakuten Affiliates",
    imgSrc: "/rakuten.webp",
  },
  {
    title: "SOVRN",
    imgSrc: "/sovrn.webp",
  },
  {
    title: "HOWL",
    imgSrc: "/howl.webp",
  },
  {
    title: "Share A Sale",
    imgSrc: "/shareasale.webp",
  },
  {
    title: "Impact",
    imgSrc: "/impact.webp",
  },
  {
    title: "AWIN",
    imgSrc: "/awin.webp",
  },
  {
    title: "EBay",
    imgSrc: "/ebay.webp",
  },
  {
    title: "PepperJam",
    imgSrc: "/pepperjam.webp",
  },
  {
    title: "FlexOffers",
    imgSrc: "/flexoffers.webp",
  },
  {
    title: "Refersion",
    imgSrc: "/refersion.webp",
  },
];
