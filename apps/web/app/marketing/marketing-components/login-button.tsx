"use client";

import type { ButtonProps } from "@dub/ui/src/button-marketing";
import { MarketingButton } from "@dub/ui/src/button-marketing";
import { APP_DOMAIN, cn } from "@dub/utils";
import { useSession } from "next-auth/react";

import Link from "next/link";

export function LoginButton({ className, ...props }: ButtonProps) {
  // const { domain = "dub.co" } = useParams() as { domain: string };

  const { data: session } = useSession();
  console.log(session);

  return (
    <MarketingButton
      asChild
      className={cn("rounded-full", className)}
      {...props}
    >
      {session ? (
        <Link href={APP_DOMAIN}>Dashboard</Link>
      ) : (
        <Link href={`${APP_DOMAIN}/login`}>Sign Up</Link>
      )}
    </MarketingButton>
  );
}
