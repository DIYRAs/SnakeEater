import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { Navbar } from "./UI/components/global/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SnakeEater",
  description: "A group of digital invitation seller",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollbarWidth: 'none', scrollBehavior: 'smooth' }}>
      <body
        style={{ scrollBehavior: 'smooth' }}
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white relative z-10`}
      >
        {/* <Navbar /> */}
        {children}
      </body>
    </html>
  );
}
