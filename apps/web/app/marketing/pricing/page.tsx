"use client";
import { APP_DOMAIN } from "@dub/utils";
import { CheckIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { MarketingLayout } from "../marketing-components/marketing-layout";

interface PricingTierProps {
  title: string;
  subtitle: string;
  price: string;
  period: string;
  buttonText: string;
  features: string[];
  isPopular?: boolean;
  color: string;
  isAnnual: boolean;
}

const PricingTier: React.FC<PricingTierProps> = ({
  title,
  subtitle,
  price,
  period,
  buttonText,
  features,
  isPopular,
  color,
  isAnnual,
}) => (
  <div
    className={`rounded-lg bg-white p-6 ${isPopular ? "relative ring-2 ring-blue-500" : "border"}`}
  >
    {isPopular && (
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 transform">
        <span className="whitespace-nowrap rounded-full bg-blue-500 px-4 py-1 text-sm font-semibold text-white">
          Popular
        </span>
      </div>
    )}
    <div className="mb-4 flex items-center">
      <div className={`mr-2 h-4 w-4 rounded-full ${color}`}></div>
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
    <p className="mb-4 text-gray-600">{subtitle}</p>
    <div className="mb-4">
      <span className="text-4xl font-bold">${price}</span>
      <span className="text-gray-600">/{period}</span>
    </div>
    <p className="mb-4 text-gray-600">
      {title === "Free"
        ? "Free forever"
        : isAnnual
          ? "Billed yearly"
          : "Billed monthly"}
    </p>
    <div className="-mx-6 mb-6">
      <div className="bg-gray-100 px-6 py-4">
        <Link href={`${APP_DOMAIN}/login`}>
          <button
            className={`w-full rounded-full py-2 ${
              color === "bg-black"
                ? "bg-black text-white"
                : color === "bg-blue-500"
                  ? "bg-blue-500 text-white"
                  : "bg-teal-800 text-white"
            }`}
          >
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
    <p className="mb-2 font-semibold">
      {title === "Free"
        ? "What's included:"
        : `Everything in ${title === "Pro" ? "Free" : "Pro"}, plus:`}
    </p>
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <CheckIcon
            className={`mr-2 h-5 w-5 flex-shrink-0 ${
              color === "bg-black"
                ? "text-black"
                : color === "bg-blue-500"
                  ? "text-blue-500"
                  : "text-teal-800"
            }`}
          />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  const tiers = [
    {
      title: "Free",
      subtitle: "For hobby & side projects",
      price: "0",
      period: "month",
      buttonText: "Start for free",
      color: "bg-black",
      features: [
        "25 new links/mo",
        "1K tracked clicks/mo",
        "30-day analytics retention",
        "3 custom domains",
        "1 user",
        "Community support",
        "API Access",
      ],
    },
    {
      title: "Pro",
      subtitle: "For startups & small businesses",
      price: isAnnual ? "15" : "19",
      period: "month",
      buttonText: "Get started with Pro",
      isPopular: true,
      color: "bg-blue-500",
      features: [
        "1,000 new links/mo",
        "50K tracked clicks/mo",
        "1-year analytics retention",
        "10 custom domains",
        "5 users",
        "Basic support",
        "Root domain redirect",
        "Advanced link features",
      ],
    },
    {
      title: "Business",
      subtitle: "For larger teams with increased usage",
      price: isAnnual ? "39" : "49",
      period: "month",
      buttonText: "Get started with Business",
      color: "bg-teal-800",
      features: [
        "5,000 new links/mo",
        "150K tracked clicks/mo",
        "2-year analytics retention",
        "40 custom domains",
        "15 users",
        "150 tags",
        "Elevated support",
        "Custom branding",
      ],
    },
  ];

  return (
    <MarketingLayout>
      <div className="my-10 w-full text-center md:my-20">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Simple, transparent pricing
        </h2>
        <p className="mt-4 text-xl text-gray-600">
          Choose the plan that's right for you
        </p>
        <div className="mt-8 flex justify-center">
          <div className="relative inline-flex rounded-full bg-gray-100 p-1">
            <button
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                !isAnnual ? "bg-white shadow-sm" : ""
              }`}
              onClick={() => setIsAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                isAnnual ? "bg-white shadow-sm" : ""
              }`}
              onClick={() => setIsAnnual(true)}
            >
              Annual
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <PricingTier key={index} {...tier} isAnnual={isAnnual} />
          ))}
        </div>
      </div>
    </MarketingLayout>
  );
}
