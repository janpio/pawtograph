import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pawtograph",
  description: "A social media app dedicated to pet owners",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        src="https://kit.fontawesome.com/d4e617bed0.js"
        crossOrigin="anonymous"
      />
      <body className={inter.className + " bg-slate-200 w-screen h-screen"}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
