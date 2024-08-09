"use client";
import { MarketingButton as Button } from "@dub/ui/src/button-marketing";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { APP_DOMAIN } from "@dub/utils";
import { FlipWords } from "./flip-words";

export function Hero() {
  const words = ["AffEasy"];

  return (
    <div className="my-10 flex w-full flex-col justify-center gap-1 px-3 py-4 text-center md:my-20 md:p-6">
      {/* Badge Section */}
      {/* <div className="flex justify-center">
        <span className="inline-flex items-center rounded-full bg-black px-4 py-1 text-xs font-medium text-white md:text-sm">
          <Sparkles className="mr-1" height={15} />
          Introducing the #1 affiliate marketing tool
        </span>
      </div> */}

      {/* Headline Section */}
      <div className="mt-4 flex flex-col gap-6 text-center">
        <div className="flex flex-col gap-2">
          <h2 className="text-foreground text-xl font-semibold text-[#454547] md:text-3xl">
            The #1 Affiliate Marketing Tool
          </h2>
          <h1 className="text-foreground font-heading text-7xl md:text-9xl">
            {/* Affiliate Marketing
          <br />
          Made */}
            <FlipWords words={words} />
          </h1>
        </div>

        <p className="text-muted-foreground mx-auto max-w-md text-lg md:max-w-xl md:text-xl">
          One-click affiliate links from every major network - only here
        </p>
      </div>

      {/* Button Section */}
      <div className="my-4 flex justify-center">
        <div className="text-center sm:block sm:text-right">
          <Button
            className="text-md h-12 w-48 rounded-md bg-black sm:w-auto md:h-14 md:w-48 md:text-lg"
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
