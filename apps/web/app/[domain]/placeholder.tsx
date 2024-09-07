"use client";

import { InlineSnippet, Logo } from "@dub/ui";
import { STAGGER_CHILD_VARIANTS } from "@dub/utils";
import va from "@vercel/analytics";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { MarketingLayout } from "../marketing/marketing-components/marketing-layout";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { domain } = useParams() as { domain: string };
  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const [opacity] = useDebounce(loading ? 0 : 1, 200);
  const [showText] = useDebounce(loading ? false : true, 800);
  return (
    <MarketingLayout>
      <div className="mx-auto flex flex-col items-center">
        <motion.div
          className="z-10"
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, type: "spring" }}
        >
          <div
            className={`${
              loading ? "scale-75 blur-md" : "scale-100 blur-0"
            } mt-[7vh] flex h-[50vh] w-screen items-center justify-center transition-all duration-1000`}
            style={{ opacity: opacity }}
          >
            <Logo className="h-64 w-64" /> {/* Adjust size as needed */}
          </div>
          {showText && (
            <motion.div
              variants={{
                show: {
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
              initial="hidden"
              animate="show"
              className="mx-5 flex flex-col items-center space-y-10 text-center sm:mx-auto"
            >
              <InlineSnippet>{domain}</InlineSnippet> is a custom domain on{" "}
              <a
                className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text font-semibold text-transparent decoration-rose-600 hover:underline"
                href="https://affeasy.link"
                onClick={() =>
                  va.track("Referred from custom domain", {
                    domain,
                    medium: "text",
                  })
                }
              >
                {process.env.NEXT_PUBLIC_APP_NAME}
              </a>{" "}
              - the #1 affiliate marketing platform for modern marketing teams.
              <motion.button
                variants={STAGGER_CHILD_VARIANTS}
                className="rounded-full bg-gray-800 px-10 py-2 font-medium text-white transition-colors hover:bg-black"
                onClick={() => router.push("https://affeasy.link/")}
              >
                Learn More
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </MarketingLayout>
  );
}
