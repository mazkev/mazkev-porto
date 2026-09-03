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
  title: "Kevin Eka Pratama | Backend & Fullstack Developer (Go • React • TypeScript)",
  description: "Backend & Fullstack Developer with 2+ years of professional experience in Application Support at PT PLN Icon+, transitioning into Software Development. Specializing in Go (Golang) REST API backend services, PostgreSQL, React, and TypeScript.",
  keywords: [
    "Kevin Eka Pratama",
    "Backend Developer",
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
    title: "Kevin Eka Pratama — Backend & Fullstack Developer (Go • React • TypeScript)",
    description: "2+ years Application Support experience at PT PLN Icon+ transitioning into Software Development. Building reliable Go REST API backend services and web applications.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kevin Eka Pratama — Backend & Fullstack Developer (Go • React • TypeScript)",
    description: "2+ years Application Support experience at PT PLN Icon+ transitioning into Software Development. Building reliable Go REST API backend services and web applications.",
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
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <head>
        <link rel="preconnect" href="https://cdn.simpleicons.org" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdn.simpleicons.org" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Kevin Eka Pratama",
              url: "https://mazkev.vercel.app",
              jobTitle: "Fullstack Developer",
              sameAs: [
                "https://github.com/mazkev",
                "https://mazkev.vercel.app"
              ],
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "Go (Golang)",
                "Java Spring Boot",
                "Clean Architecture",
                "PostgreSQL",
                "Application Support"
              ]
            })
          }}
        />
      </head>
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
