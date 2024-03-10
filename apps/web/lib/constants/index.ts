export const HOME_HOSTNAMES = new Set([
  "dub.co",
  "home.localhost:8888",
  "localhost",
]);

export const isHomeHostname = (domain: string) => {
  return HOME_HOSTNAMES.has(domain) || domain.endsWith(".vercel.app");
};

export const SHOW_BACKGROUND_SEGMENTS = [
  "tools",
  "pricing",
  "help",
  "features",
  "customers",
  "blog",
  "(blog-post)",
  "login",
  "register",
  "auth",
];
