"use client";

import { APP_DOMAIN, PUBLIC_PLANS } from "@dub/utils";
import { CheckIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { MarketingLayout } from "../marketing-components/marketing-layout";

interface PricingTierProps {
  plan: any;
  isAnnual: boolean;
}

const PricingTier: React.FC<PricingTierProps> = ({ plan, isAnnual }) => (
  <div
    className={`rounded-lg bg-white p-6 ${
      plan.name === "Pro" ? "relative ring-2 ring-blue-500" : "border"
    }`}
  >
    {plan.name === "Pro" && (
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 transform">
        <span className="whitespace-nowrap rounded-full bg-blue-500 px-4 py-1 text-sm font-semibold text-white">
          Popular
        </span>
      </div>
    )}
    <div className="mb-4 flex items-center">
      <div className={`mr-2 h-4 w-4 rounded-full ${plan.colors.bg}`}></div>
      <h3 className="text-xl font-bold">{plan.name}</h3>
    </div>
    <p className="mb-4 text-gray-600">{plan.tagline}</p>
    <div className="mb-4">
      <span className="text-4xl font-bold">
        ${isAnnual ? plan.price.yearly : plan.price.monthly}
      </span>
      <span className="text-gray-600">/month</span>
    </div>
    <p className="mb-4 text-gray-600">
      {plan.name === "Free"
        ? "Free forever"
        : isAnnual
          ? "Billed yearly"
          : "Billed monthly"}
    </p>
    <div className="-mx-6 mb-6">
      <div className="bg-gray-100 px-6 py-4">
        <Link href={`${APP_DOMAIN}/login`}>
          <button className={`w-full rounded-full py-2 ${plan.colors.bg}`}>
            <span className="text-white">{plan.cta.text}</span>
          </button>
        </Link>
      </div>
    </div>
    <p className="mb-2 font-semibold">{plan.featureTitle}</p>
    <ul className="space-y-2">
      {plan.features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <CheckIcon
            className={`mr-2 h-5 w-5 flex-shrink-0 ${plan.colors.text}`}
          />
          <span>{feature.text}</span>
        </li>
      ))}
    </ul>
  </div>
);

const getBgColor = (bgClass: string) => {
  switch (bgClass) {
    case "bg-black":
      return "black";
    case "bg-blue-500":
      return "#3B82F6";
    case "bg-emerald-800":
      return "#065F46";
    default:
      return "black"; // fallback color
  }
};

const getTextColor = (textClass: string) => {
  switch (textClass) {
    case "text-black":
      return "black";
    case "text-blue-500":
      return "#3B82F6";
    case "text-emerald-800":
      return "#065F46";
    default:
      return "black"; // fallback color
  }
};

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

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
          {PUBLIC_PLANS.map((plan, index) => (
            <PricingTier key={plan.name} plan={plan} isAnnual={isAnnual} />
          ))}
        </div>
      </div>
    </MarketingLayout>
  );
}
