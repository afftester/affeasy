import type { ValidIcon } from "../_components/icons";

export type Feature = {
  icon: ValidIcon;
  title: string;
  // description?: string;
  features?: FeatureDescription[];
};

export type FeatureDescription = {
  icon: ValidIcon;
  catchline: string;
  description: string;
  badge?: "Coming soon" | "New";
};

export type SpecialFeature = {
  icon: ValidIcon;
  title: string;
  catchline: string;
  description: string;
};

export const specialCardConfig = {
  icon: "toy-brick",
  title: "Integrations",
  catchline: "Connect.",
  description: "Build or use existing integrations to automate your workflow.",
} satisfies SpecialFeature;

export const cardConfig = {
  monitors: {
    icon: "bicepsflexed",
    title: "Affiliate Marketing Made Easy",
    features: [
      {
        icon: "globe",
        catchline: "Unified Network Access",
        description:
          "Access a multitude of affiliate networks from a single dashboard",
      },
      {
        icon: "link",
        catchline: "Rapid Link Creation",
        description:
          "Say goodbye to the hassle of manually creating affiliate links. Produce affiliate links from one location in a matter of seconds!",
      },
      {
        icon: "areachart",
        catchline: "Analytics",
        description:
          "AffEasy provides powerful analytics for your links. See how well your links are performing easily",
      },
    ],
  },
  pages: {
    icon: "panel-top",
    title: "Status Pages",
    features: [
      {
        icon: "puzzle",
        catchline: "Build trust",
        description:
          "Showcase your reliability to your users, and reduce the numbers of customers service tickets.",
      },
      {
        icon: "globe",
        catchline: "Custom domain.",
        description:
          "Bring your own domain, give the status page a personal touch.",
      },
      {
        icon: "image",
        catchline: "Subscription",
        description:
          "Let your users subscribe to your status page, to automatically receive updates about the status of your services.",
      },
    ],
  },
  networks: {
    icon: "thumbsup",
    title: "Major Affiliate Networks Supported",
    features: [
      {
        icon: "sparkles",
        catchline: "Connect.",
        description:
          "Aggregate alerts from all your monitoring services (Grafana, Datadog) and use our AI to make them actionable.",
        badge: "Coming soon",
      },
      {
        icon: "zap",
        catchline: "Escalation.",
        description: "Notify and escalate an alert to the right team member.",
        badge: "Coming soon",
      },
      {
        icon: "bell",
        catchline: "Get alerted.",
        description:
          "Get notified via Email, SMS, Slack, Discord,... before your users do.",
      },
    ],
  },
} satisfies Record<string, Feature>;
