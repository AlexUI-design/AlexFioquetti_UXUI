"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";

interface SmoothScrollContextValue {
  stop: () => void;
  start: () => void;
  resize: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  stop: () => {},
  start: () => {},
  resize: () => {},
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 0.9,
      orientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 1.5,
      autoResize: true,
      prevent: (node) => Boolean(node.closest?.("[data-lenis-prevent]")),
    });

    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  const resize = useCallback(() => {
    lenisRef.current?.resize();
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ stop, start, resize }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
