import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kevin Pratama | Fullstack Developer & Digital Craftsman",
  description: "Senior Fullstack Developer specializing in high-performance React, Next.js, and scalable backend solutions. Turning complex problems into elegant digital experiences.",
  keywords: ["Fullstack Developer", "Next.js", "React", "TypeScript", "Tailwind CSS", "Portfolio", "Web Development"],
  authors: [{ name: "Kevin Pratama" }],
  creator: "Kevin Pratama",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kevinpratama.dev",
    siteName: "Kevin Pratama Portfolio",
    title: "Kevin Pratama | Digital Craftsman",
    description: "High-performance web applications built with precision and passion.",
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
    title: "Kevin Pratama | Digital Craftsman",
    description: "High-performance web applications built with precision and passion.",
    images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${inter.variable} font-inter antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
