export { default as ApiMiddleware } from "./api";
export { default as AppMiddleware } from "./app";
export { default as LinkMiddleware } from "./link";
export { default as RootMiddleware } from "./root";

export const HOME_HOSTNAMES = new Set([
  "affeasy.link",
  "home.localhost:8888",
  "localhost",
]);

export const isHomeHostname = (domain: string) => {
  return HOME_HOSTNAMES.has(domain) || domain.endsWith(".vercel.app");
};

export const HOME_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://affeasy.link"
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://home.localhost:8888";
