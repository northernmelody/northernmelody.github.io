import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://northernmelody.github.io"),
  title: "NorthernMelody Project · Web App Portfolio",
  description: "NorthernMelody 的个人 Web App 作品集：AI、学习、创作、文化与人的体验。",
  openGraph: {
    title: "NorthernMelody Project",
    description: "Ideas → Prototypes → Products",
    images: [{ url: "/og-v2.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NorthernMelody Project",
    description: "Ideas → Prototypes → Products",
    images: ["/og-v2.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
