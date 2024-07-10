"use client";

import { MarketingButton } from "@dub/ui/src/button-marketing";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { marketingPagesConfig } from "../config/pages";
import { socialsConfig } from "../config/socials";
import { LoginButton } from "./login-button";
import { SocialIconButton } from "./social-icon-button";
// Custom hook for locking body scroll
function useLockBody() {
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
}
interface MobileNavProps {
  onClose: () => void;
}

function MobileNav({ onClose }: MobileNavProps) {
  useLockBody();
  const pathname = usePathname();

  return (
    <div className="fixed inset-0 top-16 z-50 flex flex-col overflow-hidden md:hidden">
      <div className="animate-in slide-in-from-bottom-80 relative z-10 flex h-1/3 min-h-[200px] flex-col bg-white px-4 py-6 shadow-md">
        <nav className="flex flex-grow flex-col items-start space-y-4">
          {marketingPagesConfig.map(({ href, title, segment }) => {
            const isExternal = href.startsWith("http");
            const externalProps = isExternal ? { target: "_blank" } : {};
            const isActive = pathname.startsWith(href);
            return (
              <Link href={href} {...externalProps} className="text-lg">
                {title}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto flex justify-between gap-2 pb-4">
          <ul className="flex flex-wrap gap-2">
            {socialsConfig.map((props, i) => (
              <li key={i}>
                <SocialIconButton {...props} />
              </li>
            ))}
          </ul>

          <LoginButton />
        </div>
      </div>
      <div
        className="flex-grow bg-black/30 backdrop-blur-md"
        onClick={onClose}
      />
    </div>
  );
}

export function MobileMenu() {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setShowMobileMenu(false);
  }, [pathname]);

  const handleClose = React.useCallback(() => {
    setShowMobileMenu(false);
  }, []);

  return (
    <>
      <MarketingButton
        size="icon"
        variant="noshadow"
        aria-label="Toggle menu"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </MarketingButton>

      {showMobileMenu && <MobileNav onClose={handleClose} />}
    </>
  );
}
