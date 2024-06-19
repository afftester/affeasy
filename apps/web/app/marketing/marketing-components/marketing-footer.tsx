import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@dub/utils";
import { Shell } from "../_components/shell";
import { socialsConfig } from "../config/socials";
import { BrandName } from "./brand-name";
import { SocialIconButton } from "./social-icon-button";
// import { StatusWidgetContainer } from "./status-widget-suspense";

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
              <BrandName />
              <p className="text-muted-foreground mt-2 text-sm font-light">
                Affiliate Marketing Made Easy! One-Stop Affiliate Link
                Generator.
              </p>
            </div>
            {/* <StatusWidgetContainer slug="status" /> */}
          </div>
          <div className="order-2 flex flex-col gap-3 text-sm">
            <p className="text-foreground font-semibold">Resources</p>
            <FooterLink href="/blog" label="Blog" />
            <FooterLink href="/pricing" label="Pricing" />
            <FooterLink href="https://docs.openstatus.dev" label="Docs" />
          </div>
          <div className="order-3 flex flex-col gap-3 text-sm">
            <p className="text-foreground font-semibold">Company</p>
            <FooterLink href="/about" label="About" />
            <FooterLink href="/changelog" label="Changelog" />
            <FooterLink href="/legal/terms" label="Terms" />
            <FooterLink href="/legal/privacy" label="Privacy" />
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
  const isExternal = external || href.startsWith("http");

  const externalProps = isExternal
    ? {
        target: "_blank",
        rel: "noreferrer",
      }
    : {};

  return (
    <Link
      className="text-muted-foreground hover:text-foreground inline-flex items-center underline underline-offset-4 hover:no-underline"
      href={href}
      {...externalProps}
    >
      {label}
      {isExternal ? (
        <ArrowUpRight className="ml-1 h-4 w-4 flex-shrink-0" />
      ) : null}
    </Link>
  );
}