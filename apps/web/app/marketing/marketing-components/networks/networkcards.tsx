import React from "react";
import { BentoGrid, BentoGridItem } from "./bento-grid";

export function BentoGridDemo() {
  return (
    <BentoGrid className="mx-auto max-w-4xl">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          imgSrc={item.imgSrc}
          className={""}
          badge={item.badge}
        />
      ))}
    </BentoGrid>
  );
}

const items = [
  {
    title: "Amazon Affiliate",
    imgSrc: "/amazon.webp",
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
    badge: "Coming Soon",
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
