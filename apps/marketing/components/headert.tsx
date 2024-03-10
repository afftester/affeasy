import React from "react";
import { siteConfig } from "@/config/site";
import { MainNav } from "@/components/main-nav";

export function HeaderT() {
  return (
    <header className="relative container z-50 md:py-8 p-3 md:px-24">
      <div className="rounded-md bg-white md:p-3 drop-shadow-md">
        <MainNav items={siteConfig.mainNav} />
      </div>
    </header>
  );
}
