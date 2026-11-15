import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";
import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";

// Initialize the fonts
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: {
    default: "SerenAI | A space to check in",
    template: "%s | SerenAI",
  },
  description: "A space for supportive conversations, mood check-ins, and guided relaxation activities.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakarta.variable} font-sans antialiased`}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}