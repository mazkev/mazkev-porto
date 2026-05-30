import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import CustomCursor from "./components/CustomCursor";
import CommandPalette from "./components/CommandPalette";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kevin Eka Pratama | Front end Engineer",
  description: "Front end Engineer specializing in React and Next.js, with fullstack experience. I build fast, scalable, and reliable web applications.",
  keywords: ["Front end Engineer", "Next.js", "React", "TypeScript", "Tailwind CSS", "Portfolio", "Web Development"],
  authors: [{ name: "Kevin Eka Pratama" }],
  creator: "Kevin Eka Pratama",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kevinpratama.dev",
    siteName: "Kevin Eka Pratama Portfolio",
    title: "Kevin Eka Pratama | Front end Engineer",
    description: "Building fast, reliable web apps.",
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
    title: "Kevin Eka Pratama | Front end Engineer",
    description: "Building fast, reliable web apps.",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${inter.variable} font-inter antialiased bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CustomCursor />
          <CommandPalette />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
