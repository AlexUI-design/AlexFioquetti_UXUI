import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, IBM_Plex_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alex Fioquetti — Diseñador Industrial · Diseñador UX/UI",
  description:
    "CV web y portafolio de Alex Gabriel Fioquetti. Diseño de interfaces y ecosistemas digitales con base proyectual en Diseño Industrial, Atomic Design y squads ágiles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cormorantGaramond.variable} ${ibmPlexMono.variable} ${geistSans.variable}`}
    >
      <body className="min-h-screen bg-paper text-ink antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
