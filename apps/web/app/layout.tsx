import { inter, satoshi } from "@/styles/fonts";
import "@/styles/globals.css";
import { TooltipProvider } from "@dub/ui/src/tooltip";
import { cn, constructMetadata } from "@dub/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import LocalFont from "next/font/local";

export const metadata = constructMetadata();
const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(satoshi.variable, inter.variable, calSans.variable)}
    >
      <body>
        <TooltipProvider>
          <Toaster closeButton />
          {children}
          <Analytics />
          <SpeedInsights />
        </TooltipProvider>
      </body>
    </html>
  );
}
