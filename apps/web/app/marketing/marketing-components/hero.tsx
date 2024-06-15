import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { Badge } from "@dub/ui/src/badge-marketing";
import { MarketingButton as Button } from "@dub/ui/src/button-marketing";

import { APP_DOMAIN, cn } from "@dub/utils";

export function Hero() {
  return (
    <div className="my-10 flex w-full flex-col justify-center gap-1 px-3 py-4 text-center md:my-20 md:p-6">
      <div className="flex flex-col gap-6">
        <h1 className={cn("text-foreground font-cal text-4xl md:text-6xl")}>
          One Stop Affiliate Link Creation
        </h1>
        <p className="text-muted-foreground mx-auto max-w-md text-lg md:max-w-xl md:text-xl">
          Effortlessly create, organize, and track all your affiliate links from
          different affiliate networks with AffEasy
        </p>
      </div>
      <div className="my-4 flex justify-center">
        <div className="text-center sm:block sm:text-right">
          <Button className="w-48 rounded-full sm:w-auto" asChild>
            <Link href={`${APP_DOMAIN}/login`}>Start for Free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
