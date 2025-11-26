import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Jersey_10 } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/custom/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import SyncUserProvider from "@/providers/SyncUserProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const gameFont = Jersey_10({
  variable: "--font-game",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-inter",
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
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${gameFont.variable} ${inter.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SyncUserProvider>{children}</SyncUserProvider>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
