import { inter, satoshi } from "@/styles/fonts";
import "@/styles/globals.css";
import { TooltipProvider } from "@dub/ui/src/tooltip";
import { cn, constructMetadata } from "@dub/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import Providers from "./providers";

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(satoshi.variable, inter.variable)}>
      <body>
        <Providers>
          <TooltipProvider>
            <Toaster closeButton />
            {children}
            <Analytics />
            <SpeedInsights />
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
