import Link from "next/link";

import { Logo } from "@dub/ui";
import { cn } from "@dub/utils";
import { Shell } from "../_components/shell";
import { socialsConfig } from "../config/socials";
import { BrandName } from "./brand-name";
import { SocialIconButton } from "./social-icon-button";

interface Props {
  className?: string;
}

export function MarketingFooter({ className }: Props) {
  return (
    <footer className={cn("w-full", className)}>
      <Shell className="grid gap-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
          <div className="col-span-2 flex flex-col gap-3">
            <div>
              <Link href="https://affeasy.link/">
                <Logo className="h-11 w-11" />
              </Link>
              <BrandName />
              <p className="text-muted-foreground mt-2 text-sm font-light">
                Affiliate Marketing Platform for Modern Marketers
              </p>
            </div>
          </div>
          <div className="order-2 flex flex-col gap-3 text-sm">
            <p className="text-foreground font-semibold">Resources</p>
            <FooterLink href="https://affeasy.link/blog" label="Blog" />
            <FooterLink href="https://affeasy.link/pricing" label="Pricing" />
            <FooterLink href="https://docs.affeasy.link" label="Help" />
          </div>
          <div className="order-3 flex flex-col gap-3 text-sm">
            <p className="text-foreground font-semibold">Company</p>
            <FooterLink href="https://affeasy.link/about" label="About" />
            <FooterLink
              href="https://affeasy.link/changelog"
              label="Changelog"
            />
            <FooterLink href="https://affeasy.link/legal/terms" label="Terms" />
            <FooterLink
              href="https://affeasy.link/legal/privacy"
              label="Privacy"
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {socialsConfig.map(({ title, href, icon }) => (
              <SocialIconButton key={title} {...{ href, icon, title }} />
            ))}
          </div>
          <div className="text-right md:text-left"></div>
        </div>
      </Shell>
    </footer>
  );
}

interface FooterLinkProps {
  href: string;
  label: string;
  external?: boolean;
}

function FooterLink({ href, label, external = false }: FooterLinkProps) {
  return (
    <Link
      className="text-muted-foreground hover:text-foreground inline-flex items-center underline underline-offset-4 hover:no-underline"
      href={href}
    >
      {label}
    </Link>
  );
}
