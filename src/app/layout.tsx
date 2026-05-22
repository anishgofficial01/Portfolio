import type { Metadata, Viewport } from "next";

import { SkipLink } from "@/components/layout";
import { MotionProvider } from "@/components/motion";
import { siteConfig } from "@/data/site";
import { fontVariables } from "@/lib/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  keywords: [
    "Product Engineer",
    "Frontend Architect",
    "React",
    "Next.js",
    "Enterprise Systems",
    "Portfolio",
  ],
  authors: [{ name: siteConfig.name }],
  robots: { index: true, follow: true },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
  },
};

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="font-body antialiased">
        <SkipLink />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
