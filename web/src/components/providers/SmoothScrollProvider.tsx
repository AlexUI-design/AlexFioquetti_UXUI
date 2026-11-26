"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef } from "react";
import Lenis from "lenis";

interface SmoothScrollToOptions {
  offset?: number;
  immediate?: boolean;
  duration?: number;
  force?: boolean;
  lock?: boolean;
  easing?: (t: number) => number;
  onComplete?: () => void;
}

interface SmoothScrollContextValue {
  stop: () => void;
  start: () => void;
  resize: () => void;
  scrollTo: (target: number | string | Element, options?: SmoothScrollToOptions) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  stop: () => {},
  start: () => {},
  resize: () => {},
  scrollTo: () => {},
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

  const scrollTo = useCallback(
    (target: number | string | Element, options?: SmoothScrollToOptions) => {
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target, {
          offset: options?.offset ?? 0,
          immediate: options?.immediate ?? false,
          duration: options?.duration,
          force: options?.force ?? true,
          lock: options?.lock ?? false,
          easing: options?.easing,
          onComplete: options?.onComplete,
        });
        return;
      }

      let top = 0;
      if (typeof target === "number") {
        top = target + (options?.offset ?? 0);
      } else {
        const el = typeof target === "string" ? document.querySelector(target) : target;
        if (el) {
          top = el.getBoundingClientRect().top + window.scrollY + (options?.offset ?? 0);
        }
      }

      window.scrollTo({
        top: Math.max(0, top),
        behavior: options?.immediate ? "auto" : "smooth",
      });
      options?.onComplete?.();
    },
    []
  );

  return (
    <SmoothScrollContext.Provider value={{ stop, start, resize, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
