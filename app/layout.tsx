import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
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
  title: "Kevin Eka Pratama | Fullstack Engineer",
  description: "Fullstack Engineer specializing in React, Next.js, Java Spring Boot, Golang, Express, and PostgreSQL. I build fast, scalable, and reliable web applications.",
  keywords: ["Fullstack Engineer", "Next.js", "React", "TypeScript", "Tailwind CSS", "Java Spring Boot", "Golang", "Express", "Portfolio", "Web Development"],
  authors: [{ name: "Kevin Eka Pratama" }],
  creator: "Kevin Eka Pratama",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mazkev.vercel.app",
    siteName: "Kevin Eka Pratama Portfolio",
    title: "Kevin Eka Pratama | Fullstack Engineer",
    description: "Building fast, reliable fullstack web apps.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Kevin Pratama Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kevin Eka Pratama | Fullstack Engineer",
    description: "Building fast, reliable fullstack web apps.",
    images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"],
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
        </ThemeProvider>
      </body>
    </html>
  );
}
