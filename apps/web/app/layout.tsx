import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
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
      <body className={`${poppins.variable} ${openSans.variable} font-sans bg-background text-foreground antialiased`}>
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
