import {
  CardContainer,
  CardContent,
  CardFeature,
  CardFeatureContainer,
  CardHeader,
  CardIcon,
  CardTitle,
} from "../_components/card";
import { cardConfig } from "../config/features";

// import { Globe } from "./globe";

export function BenefitsCard() {
  const { icon, title, features } = cardConfig.monitors;
  return (
    <CardContainer>
      <CardHeader>
        <CardIcon icon={icon} />
        <CardTitle>
          <h3 className="text-foreground font-semibold text-black">{title}</h3>
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
