import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

const navigation = {
  more: [
    { name: "Who we are", href: "/about" },
    { name: "Blog", href: "/blog" },
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ],
};

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className="rounded-md bg-black mx-3 mb-3 md:mx-4 md:mb-4 md:rounded-[15px]">
      <div className="flex flex-col md:flex-row gap-10 md:gap-20 mt-20 px-8 max-w-6xl mx-auto mb-20">
        <div className="space-y-4">
          <Link href="/" className="flex flex-row space-x-2 items-center">
            <Image src="/logo.png" alt="AffEasy Logo" width={40} height={40} />
            <span className="font-bold font-heading text-white text-lg">
              {siteConfig.name}
            </span>
          </Link>
          <p className={"max-w-xs text-sm text-[#717271]"}>
            {siteConfig.description}
          </p>
          <div className="md:pt-4">
            <p className={`text-sm leading-5 text-[#717271]`}>
              © {new Date().getFullYear()} {siteConfig.name}.link
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 xl:col-span-2 xl:mt-0 md:pl-48">
          <div>
            <h3 className="text-md font-semibold text-white">Legal</h3>
            <ul role="list" className="mt-4 space-y-4">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <span className="text-[#717271] hover:text-white">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-md font-semibold text-white">More</h3>
            <ul role="list" className="mt-4 space-y-4">
              {navigation.more.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>
                    <span className="text-[#717271] hover:text-white">
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
