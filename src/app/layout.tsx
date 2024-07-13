import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import { headers } from "next/headers";

import Providers from "./providers";

export const metadata: Metadata = {
  title: "FundM3 App",
  description: "A donation platform that leverages Farcaster frames for Projects & Creators",
  icons: {
    icon: '/assets/images/FundM3-Logo-02.jpg'
  }
};

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: '--font-poppins',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = headers().get("cookie");

  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
