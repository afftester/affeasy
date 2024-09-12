export * from "./cctlds";
export * from "./countries";
export * from "./domains";
export * from "./framer-motion";
export * from "./layout";
export * from "./localhost";
export * from "./middleware";
export * from "./misc";
export * from "./pricing";
export * from "./saml";

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "AffEasy";

export const SHORT_DOMAIN =
  process.env.NEXT_PUBLIC_APP_SHORT_DOMAIN || "offrs.us";

export const HOME_DOMAIN = `https://${process.env.NEXT_PUBLIC_APP_DOMAIN}`;

export const APP_HOSTNAMES = new Set([
  `app.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  `preview.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  "localhost:8888",
  "localhost",
]);

export const APP_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `https://app.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
      ? `https://preview.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
      : "http://localhost:8888";

export const APP_DOMAIN_WITH_NGROK =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `https://app.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
      ? `https://preview.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
      : process.env.NGROK_URL || "http://localhost:8888";

export const API_HOSTNAMES = new Set([
  `api.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  `api-staging.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  `api.${SHORT_DOMAIN}`,
  "api.localhost:8888",
]);

export const API_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? `https://api.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
      ? `https://api-staging.${process.env.NEXT_PUBLIC_APP_DOMAIN}`
      : "http://api.localhost:8888";

export const ADMIN_HOSTNAMES = new Set([
  `admin.${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
  "admin.localhost:8888",
]);

export const DUB_LOGO = "https://affeasy.link/android-chrome-512x512.png";
export const DUB_THUMBNAIL = "https://affeasy.link/_static/thumbnail.jpg";

export const DUB_WORKSPACE_ID = "clvirnje30000xojz1b1hlpar";
export const LEGAL_WORKSPACE_ID = "clrflia0j0000vs7sqfhz9c7q";
export const LEGAL_USER_ID = "clqei1lgc0000vsnzi01pbf47";

export const DUB_DOMAINS = [
  {
    id: "clce1z7ch00j0rbstbjufva4j",
    slug: SHORT_DOMAIN,
    verified: true,
    primary: true,
    archived: false,
    publicStats: false,
    target: `https://${process.env.NEXT_PUBLIC_APP_DOMAIN}`,
    type: "redirect",
    placeholder: "https://docs.affeasy.link/quickstart/guide",
    clicks: 0,
    allowedHostnames: [],
    projectId: DUB_WORKSPACE_ID,
  },
  ...(process.env.NEXT_PUBLIC_IS_DUB
    ? [
        {
          id: "clce1z7cs00y8rbstk4xtnj0k",
          slug: "chatg.pt",
          verified: true,
          primary: false,
          archived: false,
          publicStats: false,
          target: "https://${process.env.NEXT_PUBLIC_APP_DOMAIN}",
          type: "redirect",
          placeholder: "https://chat.openai.com/g/g-UGjKKONEe-domainsgpt",
          clicks: 0,
          allowedHostnames: ["beautiful.openai.com"],
          projectId: DUB_WORKSPACE_ID,
        },
      ]
    : []),
];

export const DUB_DOMAINS_ARRAY = DUB_DOMAINS.map((domain) => domain.slug);

export const DUB_DEMO_LINKS = [
  {
    id: "clqo10sum0006js08vutzfxt3",
    domain: "offrs.us",
    key: "try",
  },
];
