import {
  CardContainer,
  CardHeader,
  CardIcon,
  CardTitle,
} from "../../_components/card";
import { cardConfig } from "../../config/features";
import { BentoGridDemo } from "./networkcards";

// import { Globe } from "./globe";

export function AffiliateNetworksCard() {
  const { icon, title, features } = cardConfig.networks;
  return (
    <CardContainer>
      <CardHeader>
        <CardIcon icon={icon} />
        <CardTitle>
          <p className="text-foreground font-semibold text-black">{title}</p>
        </CardTitle>
      </CardHeader>
      <BentoGridDemo />
    </CardContainer>
  );
}
