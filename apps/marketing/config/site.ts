import type { MainNavItem } from "@/types/index";
export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "AffEasy",
  description: "One-Stop Affiliate Link Generator",
  url: "https://affeasy.link",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "About Us",
      href: "/about",
    },
    {
      title: "Blog",
      href: "/blog",
    },
  ] satisfies MainNavItem[],
};
