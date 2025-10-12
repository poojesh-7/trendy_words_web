import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthProvider";
import QueryProvider from "@/context/QueryProvider";
import NavProvider from "@/context/NavShowProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TrendyWords | Slang Dictionary",
    template: "%s | TrendyWords",
  },
  description:
    "Discover, share, and explore modern slang on TrendyWords. Stay ahead of the trends.",
  openGraph: {
    title: "TrendyWords | Slang Dictionary",
    description:
      "Browse trendy Gen Z slang with meanings and examples. Learn, contribute, and share your own.",
    url: "https://yourdomain.com",
    siteName: "TrendyWords",
    images: [
      {
        url: "https://i.ibb.co/FL0kHmZJ/hero-section.jpg",
        width: 800,
        height: 600,
        alt: "TrendyWords Hero Section",
      },
    ],
    locale: "en_US",
    type: "website",
  },
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
        <AuthProvider>
          <QueryProvider>
            <NavProvider>
              <Navbar />
              {children}
            </NavProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
