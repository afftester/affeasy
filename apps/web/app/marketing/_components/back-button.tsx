"use client";
import { ChevronLeft } from "lucide-react";
import type { LinkProps } from "next/link";
import Link from "next/link";

import { MarketingButton as Button } from "@dub/ui/src/button-marketing";

interface BackButtonProps extends LinkProps {
  children?: React.ReactNode;
}

export const BackButton = ({ href, children }: BackButtonProps) => {
  return (
    <Button variant="link" asChild>
      <Link href={href} className="group mb-1">
        <ChevronLeft className="text-muted-foreground group-hover:text-foreground mr-1 h-4 w-4" />{" "}
        {children || "Back"}
      </Link>
    </Button>
  );
};
