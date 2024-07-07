import "@/styles/globals.css";
import { TooltipProvider } from "@dub/ui/src/tooltip";
import { cn, constructMetadata } from "@dub/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DM_Sans, Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { Toaster } from "sonner";

export const metadata = constructMetadata();
const calSans = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const dm = DM_Sans({ subsets: ["latin"], variable: "--font-dm" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(calSans.variable, dm.className, inter.className)}
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
