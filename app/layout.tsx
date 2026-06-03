import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";
import CustomCursor from "./components/CustomCursor";
import CommandPalette from "./components/CommandPalette";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kevinpratama.dev"),
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
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body className={`${jakarta.variable} ${jetbrains.variable} antialiased transition-colors duration-300 overflow-x-hidden w-full`}>
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
