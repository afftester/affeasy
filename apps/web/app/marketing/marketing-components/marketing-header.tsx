"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { MarketingButton } from "@dub/ui/src/button-marketing";
import { LoginButton } from "./login-button";

import { cn } from "@dub/utils";
import { marketingPagesConfig } from "../config/pages";
import { BrandName } from "./brand-name";
import { MarketingMenu } from "./marketing-menu";

interface Props {
  className?: string;
}

export function MarketingHeader({ className }: Props) {
  const pathname = usePathname();

  return (
    <header
      className={cn("grid w-full grid-cols-2 gap-2 md:grid-cols-5", className)}
    >
      <div className="flex items-center md:col-span-1 ">
        <BrandName />
      </div>
      <div className="border-border mx-auto hidden items-center justify-center rounded-full border px-2 backdrop-blur-[2px] md:col-span-3 md:flex md:gap-1">
        {marketingPagesConfig.map(({ href, title, segment }) => {
          const isExternal = href.startsWith("http");
          const externalProps = isExternal ? { target: "_blank" } : {};
          const isActive = pathname.startsWith(href);
          return (
            <MarketingButton
              key={segment}
              variant="link"
              className={isActive ? "font-semibold" : undefined}
              asChild
            >
              <Link href={href} {...externalProps}>
                {title}
              </Link>
            </MarketingButton>
          );
        })}
      </div>
      <div className="flex items-center justify-end gap-3 md:col-span-1">
        <div className="block md:hidden">
          <MarketingMenu />
        </div>
        <LoginButton />
      </div>
    </header>
  );
}