import type { Metadata } from "next";
import "./globals.css";
import "./subpages.css";
import { ScrollReveal } from "./components/ScrollReveal";

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
      <body>{children}<ScrollReveal /></body>
    </html>
  );
}
