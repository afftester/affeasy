import Link from "next/link";

import { MarketingButton as Button } from "@dub/ui/src/button-marketing";

import { cardConfig } from "../config/features";
import {
  CardContainer,
  CardContent,
  CardFeature,
  CardFeatureContainer,
  CardHeader,
  CardIcon,
  CardTitle,
} from "../_components/card";

// import { Globe } from "./globe";

export function BenefitsCard() {
  const { icon, title, features } = cardConfig.monitors;
  return (
    <CardContainer>
      <CardHeader>
        <CardIcon icon={icon} />
        <CardTitle>
          <p className="text-black">{title}</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardFeatureContainer>
          {features?.map((feature, i) => <CardFeature key={i} {...feature} />)}
          <div className="order-first text-center md:order-none"></div>
        </CardFeatureContainer>
      </CardContent>
    </CardContainer>
  );
}
