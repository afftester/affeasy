import type { ValidIcon } from "../_components/icons";

export type Social = {
  title: string;
  href: string;
  icon: ValidIcon;
};

export const socialsConfig: Social[] = [
  {
    title: "GitHub",
    href: "https://github.com/afftester/affeasy",
    icon: "github",
  },
  {
    title: "Twitter",
    href: "https://x.com/ritanshu675",
    icon: "twitter",
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/ritanshudokania/",
    icon: "linkedin",
  },
];
