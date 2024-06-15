import { cardConfig } from "../../config/features";
import {
  CardContainer,
  CardContent,
  CardFeature,
  CardFeatureContainer,
  CardHeader,
  CardIcon,
  CardTitle,
} from "../../_components/card";
import { BentoGridDemo } from "./networkcards";

// import { Globe } from "./globe";

export function AffiliateNetworksCard() {
  const { icon, title, features } = cardConfig.networks;
  return (
    <CardContainer>
      <CardHeader>
        <CardIcon icon={icon} />
        <CardTitle>
          <p className="text-black">{title}</p>
        </CardTitle>
      </CardHeader>
      <BentoGridDemo />
    </CardContainer>
  );
}
