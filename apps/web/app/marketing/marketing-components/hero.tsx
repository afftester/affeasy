import Link from "next/link";

import { MarketingButton as Button } from "@dub/ui/src/button-marketing";
import { FlipWords } from "./flip-words";

import { APP_DOMAIN } from "@dub/utils";

export function Hero() {
  const words = ["Easy", "Breezy"];
  return (
    <div className="my-10 flex w-full flex-col justify-center gap-1 px-3 py-4 text-center md:my-20 md:p-6">
      <div className="flex flex-col gap-6">
        <h1 className="text-foreground font-heading text-4xl md:text-8xl">
          Affiliate Marketing
          <br />
          Made
          <FlipWords words={words} />
        </h1>
        <p className="text-muted-foreground mx-auto max-w-md text-lg md:max-w-xl md:text-xl">
          Effortlessly create, organize, and track all your affiliate links from
          different affiliate networks with AffEasy
        </p>
      </div>
      <div className="my-4 flex justify-center">
        <div className="text-center sm:block sm:text-right">
          <Button
            className="w-48 rounded-md sm:w-auto"
            asChild
            variant={"primary"}
          >
            <Link href={`${APP_DOMAIN}/login`}>Start for Free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
