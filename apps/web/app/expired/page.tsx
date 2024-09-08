import { constructMetadata } from "@dub/utils";
import { TimerOff } from "lucide-react";
import Link from "next/link";
import { MarketingLayout } from "../marketing/marketing-components/marketing-layout";

export const runtime = "edge";

export const metadata = constructMetadata({
  title: "Expired Link – AffEasy",
  description:
    "This link has expired. Please contact the owner of this link to get a new one.",
  noIndex: true,
});

export default async function ExpiredPage() {
  return (
    <MarketingLayout>
      <div className="mb-10 flex w-full flex-col items-center justify-center space-y-8 text-center">
        <div className="text-8xl">
          <TimerOff className="h-6 w-6 text-gray-400" />
        </div>
        <h1 className="font-display text-5xl font-bold">Expired Link</h1>
        <p className="text-lg text-gray-600">
          This link has expired. Please contact the owner of this link to get a
          new one.
        </p>
        <Link href="https://www.affeasy.link">
          <button className="rounded-full bg-gray-900 px-6 py-2 text-white">
            Learn More
          </button>
        </Link>
      </div>
    </MarketingLayout>
  );
}
