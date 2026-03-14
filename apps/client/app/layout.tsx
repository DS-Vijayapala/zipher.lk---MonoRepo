import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "./provider";
import NavBar from "@/components/shared/NavBar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "zipher.lk — Find Jobs & Hire Talent in Sri Lanka",
  description:
    "zipher.lk is Sri Lanka’s leading job platform connecting skilled professionals with companies. Find jobs, post vacancies, manage applicants, and build your career with a premium user experience.",
  keywords: [
    "Sri Lanka jobs",
    "job portal Sri Lanka",
    "find jobs",
    "hire talent",
    "careers Sri Lanka",
    "recruitment Sri Lanka",
    "zipher.lk",
  ],
  openGraph: {
    title: "zipher.lk — Sri Lanka’s Premier Job Platform",
    description:
      "Discover the best jobs in Sri Lanka. Apply fast, manage your profile, and explore opportunities with zipher.lk.",
    url: "https://zipher.lk",
    siteName: "zipher.lk",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "zipher.lk — Find Jobs & Hire Talent in Sri Lanka",
    description:
      "The premium job platform designed for Sri Lankan professionals and employers.",
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
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <ReactQueryProvider>

          <NavBar />
          <Toaster position="bottom-right" />
          {children}

        </ReactQueryProvider>

      </body>
    </html>
  );
}
