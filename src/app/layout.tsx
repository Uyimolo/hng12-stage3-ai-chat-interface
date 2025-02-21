import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Linguify",
  description: "AI Text Buddy",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        {/* Ensure the tokens are injected correctly */}
        <meta
          httpEquiv="origin-trial"
          content={process.env.NEXT_PUBLIC_TRANSLATOR_API ?? ""}
        />
        <meta
          httpEquiv="origin-trial"
          content={process.env.NEXT_PUBLIC_SUMMARIZER_API ?? ""}
        />
        <meta
          httpEquiv="origin-trial"
          content={process.env.NEXT_PUBLIC_LANGUAGE_DETECTION_API ?? ""}
        />
      </head>
      <body className={`${montserrat.className} antialiased`}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
