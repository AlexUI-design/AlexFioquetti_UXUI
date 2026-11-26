"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { getUiCopy } from "@/data/ui-copy";

const SHOW_AFTER_Y = 360;
const SHOW_UP_THRESHOLD = 8;
const HIDE_DOWN_THRESHOLD = 28;
const AUTO_HIDE_DELAY_MS = 5000;

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export function MobileScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const lastScrollYRef = useRef(0);
  const downwardAccumRef = useRef(0);
  const hideTimerRef = useRef<number | null>(null);
  const isScrollingToTopRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollTo } = useSmoothScroll();
  const { locale } = useAppPreferences();
  const copy = getUiCopy(locale).scrollTop;

  const clearHideTimer = useCallback(() => {
    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);

  const hideButton = useCallback(() => {
    clearHideTimer();
    downwardAccumRef.current = 0;
    setIsVisible(false);
  }, [clearHideTimer]);

  const showWithAutoHide = useCallback(() => {
    downwardAccumRef.current = 0;
    setIsVisible(true);
    clearHideTimer();
    hideTimerRef.current = window.setTimeout(() => {
      setIsVisible(false);
      hideTimerRef.current = null;
    }, AUTO_HIDE_DELAY_MS);
  }, [clearHideTimer]);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollYRef.current;

      if (currentY <= SHOW_AFTER_Y) {
        if (currentY <= 24) {
          isScrollingToTopRef.current = false;
        }
        hideButton();
      } else if (!isScrollingToTopRef.current) {
        if (delta < -SHOW_UP_THRESHOLD) {
          showWithAutoHide();
        } else if (delta > 0) {
          downwardAccumRef.current += delta;
          if (downwardAccumRef.current >= HIDE_DOWN_THRESHOLD) {
            hideButton();
          }
        }
      }

      lastScrollYRef.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearHideTimer();
    };
  }, [clearHideTimer, hideButton, showWithAutoHide]);

  const handleScrollToTop = () => {
    isScrollingToTopRef.current = true;
    hideButton();

    scrollTo(0, {
      duration: prefersReducedMotion ? 0 : 1.05,
      immediate: Boolean(prefersReducedMotion),
      force: true,
      easing: easeOutExpo,
      onComplete: () => {
        isScrollingToTopRef.current = false;
      },
    });
  };

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      aria-label={copy.ariaLabel}
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
      style={{
        bottom:
          "calc(max(1.25rem, env(safe-area-inset-bottom)) + var(--scroll-top-extra-offset, 0px))",
      }}
      className={`fixed right-4 z-40 inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-paper/25 bg-ink text-paper shadow-[0_12px_28px_-8px_rgba(23,23,21,0.48)] transition-[transform,opacity,bottom] will-change-transform active:scale-95 md:hidden ${
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100 duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
          : "pointer-events-none translate-y-[calc(100%+1.75rem)] opacity-0 duration-700 ease-out"
      }`}
    >
      <ArrowUp className="h-4 w-4" strokeWidth={1.75} />
    </button>
  );
}
