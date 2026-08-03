import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://northernmelody.github.io"),
  title: "NorthernMelody Project · Web App Portfolio",
  description: "NorthernMelody 的网页应用、实验与开源项目作品集。",
  openGraph: {
    title: "NorthernMelody Project",
    description: "Web apps, all in one place.",
    images: [{ url: "/og-v2.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NorthernMelody Project",
    description: "Web apps, all in one place.",
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
