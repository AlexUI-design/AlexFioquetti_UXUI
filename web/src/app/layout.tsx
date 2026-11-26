import type { Metadata } from "next";
import { Cormorant_Garamond, Geist, IBM_Plex_Mono } from "next/font/google";
import { AppPreferencesProvider } from "@/components/providers/AppPreferencesProvider";
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

const preferencesBootstrapScript = `
(function () {
  try {
    var theme = window.localStorage.getItem("af-portfolio-theme");
    if (theme === "dark" || theme === "light") {
      document.documentElement.dataset.theme = theme;
    } else {
      document.documentElement.dataset.theme = "light";
    }
    var locale = window.localStorage.getItem("af-portfolio-locale");
    if (locale === "en" || locale === "es") {
      document.documentElement.lang = locale;
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-theme="light"
      suppressHydrationWarning
      className={`${cormorantGaramond.variable} ${ibmPlexMono.variable} ${geistSans.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: preferencesBootstrapScript }} />
      </head>
      <body className="min-h-screen bg-paper text-ink antialiased">
        <AppPreferencesProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </AppPreferencesProvider>
      </body>
    </html>
  );
}
