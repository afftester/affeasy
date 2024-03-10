"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { MainNavItem } from "@/types";
import { siteConfig } from "@/config/site";
import { MobileNav } from "@/components/mobile-nav";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

  return (
    <div className="w-full relative z-40 flex gap-6 justify-between items-center md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
        <Image src="/logo.png" alt="AffEasy Logo" width={40} height={40} />
        <span className="hidden font-bold sm:inline-block font-heading">
          {siteConfig.name}
        </span>
      </Link>
      <div className="hidden flex-grow md:flex justify-center lg:pr-32 sm:pr-15">
        {items?.length ? (
          <nav className="hidden gap-8 md:flex">
            {items?.map((item, index) => (
              <Link key={index} href={item.disabled ? "#" : item.href}>
                <Button variant="ghost">
                  <span className="font-heading text-zinc-800">
                    {item.title}
                  </span>
                </Button>
              </Link>
            ))}
          </nav>
        ) : null}
      </div>

      <div className="p-3">
        <button
          className="flex items-center space-x-2 md:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? (
            <X />
          ) : (
            <Image src="/logo.png" alt="AffEasy Logo" width={30} height={30} />
          )}
          <span className="font-bold">Menu</span>
        </button>
      </div>

      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  );
}
