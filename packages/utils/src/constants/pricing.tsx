import { nFormatter } from "../functions";

type PriceObject = {
  monthly: number;
  yearly: number;
  ids?: string[]; // Make ids optional
};

// Update the type definition for PLANS
type Plan = {
  name: string;
  tagline: string;
  price: PriceObject;
  limits: {
    links: number;
    clicks: number;
    domains: number;
    tags: number;
    users: number;
  };
  colors: {
    bg: string;
    text: string;
  };
  cta: {
    text: string;
    shortText?: string;
    href: string;
    color: string;
  };
  featureTitle: string;
  features: Array<{ text: string; footnote?: any }>;
  link?: string;
};

const BUSINESS_PLAN_MODIFIER = ({
  name = "Business",
  monthly = 49.99,
  yearly = 39.99,
  links = 5000,
  clicks = 150000,
  domains = 40,
  tags = 150,
  users = 15,
  ids = [],
}: {
  name: string;
  monthly: number;
  yearly: number;
  links: number;
  clicks: number;
  domains: number;
  users: number;
  tags: number;
  ids: string[];
}): Plan => ({
  name,
  tagline: "For larger teams with increased usage",
  link: "https://docs.affeasy.link/plans/business-plan",
  price: {
    monthly,
    yearly,
    ids,
  },
  limits: {
    links,
    clicks,
    domains,
    tags,
    users,
  },
  colors: {
    bg: "bg-emerald-800",
    text: "text-emerald-800",
  },
  cta: {
    text: "Get started with Business",
    shortText: "Get started",
    href: "https://app.affeasy.link/register",
    color: "bg-emerald-800",
  },
  featureTitle: "Everything in Pro, plus:",
  features: [
    { text: `${nFormatter(links, { full: true })} new links/mo` },
    {
      text: `${nFormatter(clicks)} tracked clicks/mo`,
    },
    { text: "2-year analytics retention" },
    { text: `${domains} custom domains` },
    { text: `${users} users` },
    {
      text: `${nFormatter(tags, { full: true })} tags`,
      footnote: {
        title: "Organize your links with tags.",
        cta: "Learn more.",
        href: "https://docs.affeasy.link/features/how-to-use-tags",
      },
    },
    { text: "Elevated support", footnote: "Email and chat support." },
    {
      text: "Custom branding",
      footnote: {
        title:
          "Set custom QR code logos, password-protected links logos, and more.",
        cta: "Learn more.",
        href: "https://docs.affeasy.link/features/custom-qr-codes",
      },
    },
  ],
});

export const PLANS: Plan[] = [
  {
    name: "Free",
    tagline: "For hobby & side projects",
    price: {
      monthly: 0,
      yearly: 0,
    },
    limits: {
      links: 25,
      clicks: 1000,
      domains: 3,
      tags: 5,
      users: 1,
    },
    colors: {
      bg: "bg-black",
      text: "text-black",
    },
    cta: {
      text: "Start for free",
      href: "https://app.affeasy.link/register",
      color: "bg-black border-black hover:text-black",
    },
    featureTitle: "What's included:",
    features: [
      { text: "25 new links/mo" },
      {
        text: "1K tracked clicks/mo",
      },
      { text: "30-day analytics retention" },
      { text: "3 custom domains" },
      { text: "1 user" },
      {
        text: "Community support",
      },
    ],
  },
  {
    name: "Pro",
    tagline: "For startups & small businesses",
    link: "https://docs.affeasy.link/plans/pro-plan",
    price: {
      monthly: 19.99,
      yearly: 14.99,
      ids: [
        "price_1PsYefBot5SAtbDCowyygG7f", // monthly test
        "price_1PnoUkBot5SAtbDCzdPwXFOA", // new monthly (prod)
        "price_1PnntoBot5SAtbDCAm4IVZhf", // new yearly (test)
        "price_1PnoVgBot5SAtbDCRV8mVqId", // new yearly (prod)
      ],
    },
    limits: {
      links: 1000,
      clicks: 50000,
      domains: 10,
      tags: 25,
      users: 5,
    },
    colors: {
      bg: "bg-blue-500",
      text: "text-blue-500",
    },
    cta: {
      text: "Get started with Pro",
      shortText: "Get started",
      href: "https://app.affeasy.link/register",
      color: "bg-blue-500 border-blue-500 hover:text-blue-500",
    },
    featureTitle: "Everything in Free, plus:",
    features: [
      { text: "1,000 new links/mo" },
      {
        text: "50K tracked clicks/mo",
      },
      { text: "1-year analytics retention" },
      { text: "10 custom domains" },
      { text: "5 users" },
      { text: "Basic support" },
    ],
  },
  BUSINESS_PLAN_MODIFIER({
    name: "Business",
    monthly: 49.99,
    yearly: 39.99,
    links: 5000,
    clicks: 150000,
    domains: 40,
    tags: 150,
    users: 15,
    ids: [
      "price_1PnoSSBot5SAtbDCIUHXGZKT", // new monthly (prod)
      "price_1PnoR6Bot5SAtbDCzCAbUkXI", // new yearly (prod)
      "price_1PsYn3Bot5SAtbDCgPu1XpoY", // business monthly (test)
      "price_1PsYnnBot5SAtbDCmRdPPFFs", // business yearly (prod)
    ],
  }),
];

export const FREE_PLAN = PLANS.find((plan) => plan.name === "Free")!;
export const PRO_PLAN = PLANS.find((plan) => plan.name === "Pro")!;
export const BUSINESS_PLAN = PLANS.find((plan) => plan.name === "Business")!;

export const PUBLIC_PLANS = [FREE_PLAN, PRO_PLAN, BUSINESS_PLAN];

export const SELF_SERVE_PAID_PLANS = PLANS.filter((p) => p.name !== "Free");

export const FREE_WORKSPACES_LIMIT = 2;

export const getPlanFromPriceId = (priceId: string): Plan | null => {
  return PLANS.find((plan) => plan.price.ids?.includes(priceId)) || null;
};

export const getPlanDetails = (plan: string) => {
  return SELF_SERVE_PAID_PLANS.find(
    (p) => p.name.toLowerCase() === plan.toLowerCase(),
  )!;
};

export const getNextPlan = (plan: string) => {
  return PLANS[
    PLANS.findIndex((p) => p.name.toLowerCase() === plan.toLowerCase()) + 1
  ];
};
