import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Our June — Cinematic Wedding Photography",
  description: "Moody, cinematic photography for couples wildly in love.",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Our June — Cinematic Wedding Photography",
    description: "Photographs of love, joy, and moments of life that feel like a movie.",
    images: [{ url: "/og.png", width: 1733, height: 907, alt: "Our June wedding photography" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
