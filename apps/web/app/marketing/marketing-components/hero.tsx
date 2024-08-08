"use client";
import { MarketingButton as Button } from "@dub/ui/src/button-marketing";
import { ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { FlipWords } from "./flip-words";

import { APP_DOMAIN } from "@dub/utils";

export function Hero() {
  const words = ["Easy"];

  return (
    <div className="my-10 flex w-full flex-col justify-center gap-1 px-3 py-4 text-center md:my-20 md:p-6">
      {/* Badge Section */}
      <div className="flex justify-center">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-black">
          <Sparkles className="mr-1" height={20} />
          Start in 30 seconds — no credit card required.
        </span>
      </div>

      {/* Headline Section */}
      <div className="mt-4 flex flex-col gap-6">
        <h1 className="text-foreground font-heading text-6xl md:text-8xl">
          Affiliate Marketing
          <br />
          Made
          <FlipWords words={words} />
        </h1>
        <p className="text-muted-foreground mx-auto max-w-md text-lg md:max-w-xl md:text-xl">
          The best tool to create, organize and track affiliate links
        </p>
      </div>

      {/* Button Section */}
      <div className="my-4 flex justify-center">
        <div className="text-center sm:block sm:text-right">
          <Button
            className="text-md h-12 w-48 rounded-md sm:w-auto md:h-14 md:w-48 md:text-lg"
            asChild
            variant={"primary"}
          >
            <Link href={`${APP_DOMAIN}/login`}>
              Start for free <ChevronRight className="ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
