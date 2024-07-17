import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import { headers } from 'next/headers';
import { env } from '@/lib/config/env';
import Providers from '@/components/providers/Providers';


const APP_BASE_URL = new URL(env.NEXT_PUBLIC_APP_BASE_URL);

export const metadata: Metadata = {
  metadataBase: APP_BASE_URL,
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
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = headers().get('cookie');

  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers cookie={cookie}>{children}</Providers>
      </body>
    </html>
  );
}
