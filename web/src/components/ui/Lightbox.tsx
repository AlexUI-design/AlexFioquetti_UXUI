"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import type { GalleryImage } from "@/data/cv-data";
import { getUiCopy } from "@/data/ui-copy";
import { EASE_EDITORIAL } from "@/lib/motion";

interface LightboxProps {
  image?: GalleryImage | null;
  images?: GalleryImage[];
  currentIndex?: number;
  onNavigate?: (index: number) => void;
  onClose: () => void;
}

export function Lightbox({
  image,
  images,
  currentIndex,
  onNavigate,
  onClose,
}: LightboxProps) {
  const { stop, start } = useSmoothScroll();
  const { locale } = useAppPreferences();
  const copy = getUiCopy(locale).lightbox;
  const prefersReducedMotion = useReducedMotion();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const [navDirection, setNavDirection] = useState<1 | -1 | 0>(0);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const hasGallery = Boolean(images && images.length > 0 && typeof currentIndex === "number");
  const activeImage = hasGallery ? (images![currentIndex!] ?? null) : (image ?? null);
  const totalImages = hasGallery ? images!.length : activeImage ? 1 : 0;
  const canNavigate = hasGallery && totalImages > 1 && Boolean(onNavigate);
  const isOpen = Boolean(activeImage);

  useEffect(() => {
    if (!isOpen) {
      setNavDirection(0);
      return;
    }

    stop();
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      start();
    };
  }, [isOpen, stop, start]);

  useEffect(() => {
    if (!activeImage) return;
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [activeImage?.id, activeImage?.src]);

  const handlePrev = () => {
    if (!canNavigate || currentIndex === undefined || !onNavigate) return;
    setNavDirection(-1);
    onNavigate((currentIndex - 1 + totalImages) % totalImages);
  };

  const handleNext = () => {
    if (!canNavigate || currentIndex === undefined || !onNavigate) return;
    setNavDirection(1);
    onNavigate((currentIndex + 1) % totalImages);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!canNavigate || event.touches.length !== 1) {
      touchStartRef.current = null;
      return;
    }
    const touch = event.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const startTouch = touchStartRef.current;
    touchStartRef.current = null;

    if (!canNavigate || !startTouch || event.changedTouches.length !== 1) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - startTouch.x;
    const dy = touch.clientY - startTouch.y;
    const elapsed = Date.now() - startTouch.time;

    if (elapsed < 650 && Math.abs(dx) >= 48 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      if (dx < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const formatCounter = (value: number) => String(value).padStart(2, "0");

  return (
    <AnimatePresence>
      {activeImage && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-scrim p-0 backdrop-blur-sm sm:p-6"
        >
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 8 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.25, ease: EASE_EDITORIAL }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-[100dvh] w-full flex-col overflow-hidden rounded-none border-0 bg-paper sm:h-[90vh] sm:max-w-5xl sm:rounded-[4px] sm:border sm:border-hairline"
          >
            <div className="z-10 shrink-0 border-b border-hairline bg-paper/95 px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 backdrop-blur-md sm:px-5 sm:py-3.5">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 sm:items-start sm:gap-x-4 sm:gap-y-0">
                <span className="col-start-1 row-start-1 truncate font-mono text-[10px] uppercase tracking-wider text-muted sm:text-[11px]">
                  {activeImage.productLabel}
                </span>

                <div className="col-start-2 row-start-1 flex shrink-0 items-center gap-1.5 sm:row-span-2 sm:gap-2 sm:pt-0.5">
                  {canNavigate && currentIndex !== undefined && (
                    <div className="hidden items-center gap-1.5 sm:flex sm:gap-2">
                      <button
                        type="button"
                        onClick={handlePrev}
                        aria-label={copy.prevAria}
                        title={copy.prevAria}
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[2px] border border-hairline bg-paper text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                      >
                        <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                      <span
                        aria-live="polite"
                        className="px-1 font-mono text-[11px] tracking-wider text-muted tabular-nums"
                      >
                        {formatCounter(currentIndex + 1)} / {formatCounter(totalImages)}
                      </span>
                      <button
                        type="button"
                        onClick={handleNext}
                        aria-label={copy.nextAria}
                        title={copy.nextAria}
                        className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[2px] border border-hairline bg-paper text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                      >
                        <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                      <span aria-hidden="true" className="mx-0.5 h-5 w-px bg-hairline" />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={onClose}
                    aria-label={copy.closeAria}
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[2px] border border-hairline bg-paper text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                  >
                    <X className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>

                <div className="col-span-2 row-start-2 min-w-0 sm:col-span-1">
                  <h4 className="font-serif text-[19px] leading-snug font-normal text-ink sm:truncate sm:text-xl">
                    {activeImage.title}
                  </h4>
                  {activeImage.caption && (
                    <p className="mt-0.5 max-w-3xl font-sans text-[13px] leading-[1.4] text-body sm:mt-1 sm:leading-relaxed">
                      {activeImage.caption}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div
              ref={scrollContainerRef}
              data-lenis-prevent
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="flex min-h-0 flex-1 touch-pan-y flex-col overflow-y-auto overscroll-contain bg-card-stage/60 p-5 sm:p-6"
            >
              <motion.div
                key={activeImage.id}
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: navDirection * 14 }
                }
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                transition={{ duration: prefersReducedMotion ? 0.05 : 0.18, ease: EASE_EDITORIAL }}
                className="my-auto flex w-full flex-col items-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeImage.src}
                  alt={activeImage.alt}
                  width={activeImage.width}
                  height={activeImage.height}
                  className={
                    activeImage.isMobile
                      ? "mx-auto h-auto w-full max-w-[420px] rounded-[12px] border border-hairline bg-paper"
                      : "h-auto w-full rounded-[2px] border border-hairline bg-paper"
                  }
                />
              </motion.div>
            </div>

            {canNavigate && currentIndex !== undefined && (
              <div className="z-10 flex shrink-0 items-center justify-between gap-3 border-t border-hairline bg-paper/95 px-4 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md sm:hidden">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label={copy.prevAria}
                  className="inline-flex h-10 items-center gap-1.5 rounded-[2px] border border-hairline bg-paper px-3 font-mono text-[11px] tracking-wider text-ink transition-colors active:border-ink active:bg-ink active:text-paper"
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
                  <span>{copy.prevLabel}</span>
                </button>

                <span
                  aria-live="polite"
                  className="font-mono text-xs tracking-wider text-muted tabular-nums"
                >
                  {formatCounter(currentIndex + 1)} / {formatCounter(totalImages)}
                </span>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label={copy.nextAria}
                  className="inline-flex h-10 items-center gap-1.5 rounded-[2px] border border-hairline bg-paper px-3 font-mono text-[11px] tracking-wider text-ink transition-colors active:border-ink active:bg-ink active:text-paper"
                >
                  <span>{copy.nextLabel}</span>
                  <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
