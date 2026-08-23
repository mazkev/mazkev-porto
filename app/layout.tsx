import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import CustomCursor from "./components/CustomCursor";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mazkev.vercel.app"),
  title: "Kevin Eka Pratama | Fullstack Developer (React • TypeScript • Go)",
  description: "Fullstack Developer with 3 years of professional experience in Application Support, transitioning into Software Development. Specializing in React, TypeScript, and Go (Golang) backend microservices.",
  keywords: [
    "Kevin Eka Pratama",
    "Fullstack Developer",
    "Go Developer",
    "Golang",
    "React",
    "Next.js",
    "TypeScript",
    "Clean Architecture",
    "Application Support",
    "PostgreSQL",
    "Java Spring Boot"
  ],
  authors: [{ name: "Kevin Eka Pratama" }],
  creator: "Kevin Eka Pratama",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://mazkev.vercel.app",
    siteName: "Kevin Eka Pratama Portfolio",
    title: "Kevin Eka Pratama — Fullstack Developer (React • TypeScript • Go)",
    description: "3 years Application Support experience transitioning into Software Development. Building reliable web applications & Clean Architecture Go microservices.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kevin Eka Pratama — Fullstack Developer (React • TypeScript • Go)",
    description: "3 years Application Support experience transitioning into Software Development. Building reliable web applications & Clean Architecture Go microservices.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: import("next").Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body className={`${jakarta.variable} ${jetbrains.variable} antialiased transition-colors duration-300 overflow-x-hidden w-full`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CustomCursor />
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
