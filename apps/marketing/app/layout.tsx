import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { SiteFooter } from "@/components/site-footer";

interface RootLayoutProps {
  children: React.ReactNode;
}

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Affiliate Link Generator",
    "All-in-One Affiliate Link Generator",
    "Easy Affiliate Link Generator",
  ],
  authors: [
    {
      name: "Ritanshu Dokania",
      url: "https://www.ritanshudokania.xyz/",
    },
  ],
  creator: "ritanshudokania",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpeg`],
    creator: "@ritanshu675",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <div className="flex min-h-screen flex-col">
          {children}
          <SiteFooter />
        </div>
        <Script
          async
          strategy="lazyOnload"
          src="https://us.umami.is/script.js"
          data-website-id="e2f53824-ef05-498a-b086-8ff560bb27b9"
        />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
