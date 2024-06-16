"use client";

import type { ButtonProps } from "@dub/ui/src/button-marketing";
import { MarketingButton } from "@dub/ui/src/button-marketing";
import { APP_DOMAIN, cn } from "@dub/utils";

import Link from "next/link";

export function LoginButton({ className, ...props }: ButtonProps) {
  // const { domain = "dub.co" } = useParams() as { domain: string };

  return (
    <MarketingButton
      asChild
      className={cn("rounded-full", className)}
      variant={"primary"}
      {...props}
    >
      <Link href={`${APP_DOMAIN}/login`}>Sign In</Link>
    </MarketingButton>
  );
}
