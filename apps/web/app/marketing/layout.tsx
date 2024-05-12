import { inter, satoshi } from "@/styles/fonts";
import "@/styles/globals.css";

import { Background } from "@dub/ui";
import { cn, constructMetadata } from "@dub/utils";
import { Toaster } from "sonner";

export const metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(satoshi.variable, inter.variable)}>
      <body>
        <Toaster closeButton />
        <Background />
        {children}
      </body>
    </html>
  );
}
