"use client";

import type { ButtonProps } from "@dub/ui/src/button-marketing";
import { MarketingButton } from "@dub/ui/src/button-marketing";
import { APP_DOMAIN, cn } from "@dub/utils";
import { useSession } from "next-auth/react";

import Link from "next/link";

export function LoginButton({ className, ...props }: ButtonProps) {
  // const { domain = "dub.co" } = useParams() as { domain: string };

  const { data: session, status } = useSession() || {
    status: "unauthenticated", // if `useSession` is undefined, we're on a non dub.co domain
  };

  return (
    <MarketingButton
      asChild
      className={cn("rounded-full", className)}
      {...props}
    >
      {session ? (
        <Link href={APP_DOMAIN}>Dashboard</Link>
      ) : status === "unauthenticated" ? (
        <Link href={`${APP_DOMAIN}/login`}>Sign Up</Link>
      ) : null}
    </MarketingButton>
  );
}
