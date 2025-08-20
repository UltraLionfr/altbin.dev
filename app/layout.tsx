import AuthProvider from '@/components/providers/SessionProvider';
import ToasterProvider from '@/components/providers/ToasterProvider';
import { ReactNode } from 'react';
import './globals.css';

import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "AltBin - Modern text and code sharing",
  description:
    "AltBin is a fast and modern pastebin for sharing text and code snippets with ease. Secure, minimal, and developer-friendly.",
  metadataBase: new URL("https://altbin.dev"),
  openGraph: {
    title: "AltBin - Modern text and code sharing",
    description:
      "Easily share text and code snippets with AltBin. A sleek and secure pastebin for developers.",
    url: "https://altbin.dev",
    siteName: "AltBin",
    images: ["/og-image.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AltBin - Modern text and code sharing",
    description:
      "Share and manage text/code snippets effortlessly with AltBin. Secure and developer-friendly.",
    images: ["/og-image.png"],
    creator: "@AltBinApp",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0f] text-neutral-100 font-mono">
        <AuthProvider>
          <ToasterProvider />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}