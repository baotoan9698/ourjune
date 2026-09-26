import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "./subpages.css";
import { ScrollReveal } from "./components/ScrollReveal";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
  ),
  title: "Ourjune | Unscripted Moments, Elegantly Captured",
  description: "Fine art wedding photography by ourjune. Capturing genuine emotions with timeless elegance. Preserving your authentic love story through refined art.",
  applicationName: "Ourjune",
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Ourjune",
    title: "Ourjune | Unscripted Moments, Elegantly Captured",
    description: "Fine art wedding photography by ourjune. Capturing genuine emotions with timeless elegance. Preserving your authentic love story through refined art.",
    images: [{ url: "/og-image.jpg", width: 2048, height: 1366, alt: "Ourjune fine art wedding photography" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ourjune | Unscripted Moments, Elegantly Captured",
    description: "Fine art wedding photography by ourjune. Capturing genuine emotions with timeless elegance. Preserving your authentic love story through refined art.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SFD0JZZ3XP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SFD0JZZ3XP');
          `}
        </Script>
      </head>
      <body>
        {children}
        <ScrollReveal />
        <Analytics />
      </body>
    </html>
  );
}
