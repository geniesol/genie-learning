import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Genie Learning | Global EdTech Ecosystem",
  description: "AI-powered learning platform for global digital education.",
};

import { Header } from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-background text-foreground antialiased`}>
        <div className="hero-gradient min-h-screen selection:bg-primary/30 selection:text-primary">
          <Header />
          <main className="pt-20 animate-reveal">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
