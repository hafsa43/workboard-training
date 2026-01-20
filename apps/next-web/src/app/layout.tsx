import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WebVitals } from "./web-vitals";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Workboard - Project Management",
    template: "%s | Workboard",
  },
  description: "Modern project and task management application built with Next.js",
  keywords: ['project management', 'task tracking', 'productivity', 'collaboration'],
  authors: [{ name: 'Workboard Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://workboard.app',
    siteName: 'Workboard',
    title: 'Workboard - Project Management',
    description: 'Modern project and task management application',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Workboard - Project Management',
    description: 'Modern project and task management application',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <WebVitals />
        {children}
      </body>
    </html>
  );
}