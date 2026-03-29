import type { Metadata } from "next";

import { Geist_Mono, Geist} from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chamuyame",
  description: "Lleva tus chamuyos a otro nivel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} h-full antialiased mx-4`}
    >
      <body className="flex min-h-screen w-full min-w-0 flex-col">{children}</body>
    </html>
  );
}
