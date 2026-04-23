import type { Metadata } from "next";
import * as Sentry from "@sentry/nextjs";
import "./globals.css";
import Footer from "@/components/layout/footer/Footer";
import { Toaster } from "sonner";
import NavContent from "@/components/layout/navbar/NavContent";
import Script from "next/script";
import NextTopLoader from "nextjs-toploader";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { supportBoardScriptSrc } from "@/lib/supportBoard";
import SupportBoardScript from "./SupportBoardScript";

const alibaba = localFont({
  src: [
    {
      path: "../../public/alibaba-sans/AlibabaSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/alibaba-sans/AlibabaSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/alibaba-sans/AlibabaSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/alibaba-sans/AlibabaSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth" lang="en">
      <body className={alibaba.className}>
        <Toaster richColors position="top-right" />
        <NextTopLoader color="#FF6500" showSpinner={false} />
        <NavContent />
        <main>{children}</main>
        <Footer />
        <Script
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          strategy="beforeInteractive"
        />
        {/* <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-F1LPCYB7JH"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F1LPCYB7JH');
          `}
        </Script> */}
        {supportBoardScriptSrc ? <SupportBoardScript /> : null}
        <Analytics />
      </body>
    </html>
  );
}
