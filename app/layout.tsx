import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://northernmelody.github.io"),
  title: "Project Atlas · Web App Portfolio",
  description: "汇集网页应用、实验与开源项目的个人作品集。",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Project Atlas",
    description: "Web apps, all in one place.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Atlas",
    description: "Web apps, all in one place.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
