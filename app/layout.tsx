
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./providers/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Codicle - Where Developers Connect & Grow",
  description:
    "A collaborative platform where developers share insightful articles, follow fellow coders, and engage with posts through likes and comments. Build your dev presence and explore new ideas.",
  keywords:
    "developers, coding, articles, community, programming, tech, collaboration",
  authors: [{ name: "Codicle Team" }],
  openGraph: {
    title: "Codicle - Where Developers Connect & Grow",
    description:
      "Join 50K+ developers sharing knowledge and building connections",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body className={inter.className}>{children}</body>
      </SessionWrapper>
    </html>
  );
}
