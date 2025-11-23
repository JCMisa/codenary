import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Codenary",
  description:
    "Codenary is an interactive e-learning platform built for developers of all levels. It features a Monaco-powered code editor with integrated browser output, enabling learners to write, run, and visualize code in real time. The platform goes beyond tutorials by offering coding challenges, interactive checkpoints, and gamified learning paths that reinforce skills through practice. With seamless playground integration and structured lessons, Codenary delivers a hands-on, engaging environment where coding knowledge turns into practical expertise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
