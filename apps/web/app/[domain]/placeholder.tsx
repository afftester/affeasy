"use client";

import { Logo } from "@dub/ui";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MarketingLayout } from "../marketing/marketing-components/marketing-layout";

export default function Page() {
  const { domain } = useParams() as { domain: string };

  return (
    <MarketingLayout>
      <div className="mb-10 flex w-full flex-col items-center justify-center space-y-8 text-center">
        <div className="text-8xl">
          <Logo className="h-64 w-64" /> {/* Adjust size as needed */}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="rounded bg-blue-100 px-2 py-1">{domain}</span>
          <span>is a custom domain on</span>
          <span className="font-semibold text-purple-600">AffEasy</span>
        </div>
        <div>
          The #1 affiliate marketing platform for modern marketing teams.
        </div>
        <Link href="https://www.affeasy.link">
          <button className="rounded-full bg-gray-900 px-6 py-2 text-white">
            Learn More
          </button>
        </Link>
      </div>
    </MarketingLayout>
  );
}
