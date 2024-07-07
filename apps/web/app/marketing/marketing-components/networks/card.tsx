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
          <h3 className="text-foreground font-semibold text-black">{title}</h3>
        </CardTitle>
      </CardHeader>
      <BentoGridDemo />
    </CardContainer>
  );
}
