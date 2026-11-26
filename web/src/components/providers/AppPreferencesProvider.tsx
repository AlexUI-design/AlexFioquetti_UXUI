"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

export type ThemeMode = "light" | "dark";
export type Locale = "es" | "en";

const THEME_STORAGE_KEY = "af-portfolio-theme";
const LOCALE_STORAGE_KEY = "af-portfolio-locale";

interface AppPreferencesContextValue {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  mounted: boolean;
}

const AppPreferencesContext = createContext<AppPreferencesContextValue>({
  theme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
  locale: "es",
  setLocale: () => {},
  toggleLocale: () => {},
  mounted: false,
});

export function useAppPreferences() {
  return useContext(AppPreferencesContext);
}

export function AppPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("light");
  const [locale, setLocaleState] = useState<Locale>("es");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === "dark" || savedTheme === "light") {
        setThemeState(savedTheme);
        document.documentElement.dataset.theme = savedTheme;
      } else {
        document.documentElement.dataset.theme = "light";
      }

      const savedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);
      if (savedLocale === "es" || savedLocale === "en") {
        setLocaleState(savedLocale);
        document.documentElement.lang = savedLocale;
      } else {
        document.documentElement.lang = "es";
      }
    } catch {
      document.documentElement.dataset.theme = "light";
      document.documentElement.lang = "es";
    }
    setMounted(true);
  }, []);

  const setTheme = useCallback((nextTheme: ThemeMode) => {
    setThemeState(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Ignore storage failures in private browsing
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: ThemeMode = prev === "light" ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // Ignore storage failures
      }
      return next;
    });
  }, []);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    document.documentElement.lang = nextLocale;
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
    } catch {
      // Ignore storage failures
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const next: Locale = prev === "es" ? "en" : "es";
      document.documentElement.lang = next;
      try {
        window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
      } catch {
        // Ignore storage failures
      }
      return next;
    });
  }, []);

  return (
    <AppPreferencesContext.Provider
      value={{ theme, setTheme, toggleTheme, locale, setLocale, toggleLocale, mounted }}
    >
      {children}
    </AppPreferencesContext.Provider>
  );
}
