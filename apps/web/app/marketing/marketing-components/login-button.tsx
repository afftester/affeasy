"use client";

import type { ButtonProps } from "@dub/ui/src/button-marketing";
import { MarketingButton } from "@dub/ui/src/button-marketing";
import { APP_DOMAIN, cn } from "@dub/utils";

import Link from "next/link";

export function LoginButton({ className, ...props }: ButtonProps) {
  return (
    <MarketingButton
      asChild
      className={cn("rounded-md bg-black", className)}
      variant={"primary"}
      {...props}
      size={"lg"}
    >
      <Link href={`${APP_DOMAIN}/login`}>Sign In</Link>
    </MarketingButton>
  );
}
