import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted (instead of next/font/google) so the build never depends on
// reaching fonts.googleapis.com — avoids the CI "Cannot read properties of
// null (reading '1')" failure from the google font loader.
const outfit = localFont({
  src: "../fonts/Outfit-Variable.woff2",
  variable: "--font-outfit",
  weight: "300 800",
  display: "swap",
});

const geistMono = localFont({
  src: "../fonts/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
  weight: "400 700",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Neeraj Kumar Singh - Senior Data Engineer | AWS Solutions Architect",
  description: "Senior Data Engineer and AWS Solutions Architect with ~12 years of experience building data lakes, real-time streaming pipelines, and secure, governed data platforms on AWS. Open to relocation to the US.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
