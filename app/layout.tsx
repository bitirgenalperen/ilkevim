import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ChatButton } from "@/components/ChatButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ilkevim | Premium Real Estate Agency",
  description: "Find your dream property in the UK with our expert real estate services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <ChatButton />
          <Footer />
        </div>
      </body>
    </html>
  );
}
