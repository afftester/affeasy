"use client";
import { MarketingButton as Button } from "@dub/ui/src/button-marketing";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { Logo } from "@dub/ui";
import { APP_DOMAIN } from "@dub/utils";

export function Hero2() {
  const words = ["AffEasy"];

  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-center p-8 text-center">
      <div className="mb-2">
        <Logo className="h-12 w-12" />
      </div>
      <h2 className="mb-4 text-2xl font-bold md:text-6xl">
        <span className="text-3xl text-[#EE720E] md:text-7xl">Supercharge</span>
        <br />
        your marketing efforts
      </h2>
      <p className="mb-8 text-gray-600">
        See why AffEasy is the affiliate marketing tool of choice for modern
        marketers{" "}
      </p>

      {/* Button Section */}
      <div className="mx-auto my-4 flex flex-row justify-center gap-3">
        <div className="text-center sm:block sm:text-right">
          <Button
            className="text-md w-25 h-12 rounded-md bg-black sm:w-auto md:h-14 md:w-48 md:text-lg"
            asChild
            variant={"primary"}
          >
            <Link href={`${APP_DOMAIN}/login`}>
              Start for free <ChevronRight className="ml-1" />
            </Link>
          </Button>
        </div>
        <div className="text-center sm:block sm:text-right">
          <Button
            className="text-md h-12 w-24 rounded-md bg-white text-black sm:w-auto md:h-14 md:w-48 md:text-lg"
            asChild
            variant={"primary"}
          >
            <Link href={`${APP_DOMAIN}/login`}>Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
