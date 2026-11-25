"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import type { GalleryImage } from "@/data/cv-data";
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
  const prefersReducedMotion = useReducedMotion();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  const hasGallery = Boolean(images && images.length > 0 && typeof currentIndex === "number");
  const activeImage = hasGallery ? (images![currentIndex!] ?? null) : (image ?? null);
  const totalImages = hasGallery ? images!.length : activeImage ? 1 : 0;
  const canNavigate = hasGallery && totalImages > 1 && Boolean(onNavigate);
  const isOpen = Boolean(activeImage);

  useEffect(() => {
    if (!isOpen) return;

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
    onNavigate((currentIndex - 1 + totalImages) % totalImages);
  };

  const handleNext = () => {
    if (!canNavigate || currentIndex === undefined || !onNavigate) return;
    onNavigate((currentIndex + 1) % totalImages);
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm sm:p-6"
        >
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 8 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.25, ease: EASE_EDITORIAL }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-[4px] border border-hairline bg-paper sm:h-[90vh]"
          >
            <div className="z-10 flex shrink-0 items-center justify-between gap-3 border-b border-hairline bg-paper/95 px-4 py-3.5 backdrop-blur-md sm:gap-4 sm:px-5">
              <div className="min-w-0 flex-1">
                <span className="block truncate font-mono text-[11px] uppercase tracking-wider text-muted">
                  {activeImage.productLabel}
                </span>
                <h4 className="truncate font-serif text-lg font-normal text-ink sm:text-xl">
                  {activeImage.title}
                </h4>
              </div>

              <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                {canNavigate && currentIndex !== undefined && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Captura anterior"
                      title="Captura anterior"
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
                      aria-label="Siguiente captura"
                      title="Siguiente captura"
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[2px] border border-hairline bg-paper text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                    >
                      <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                    <span aria-hidden="true" className="mx-0.5 h-5 w-px bg-hairline" />
                  </>
                )}

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Cerrar vista ampliada"
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[2px] border border-hairline bg-paper text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            <div
              ref={scrollContainerRef}
              data-lenis-prevent
              className="flex min-h-0 flex-1 touch-pan-y flex-col overflow-y-auto overscroll-contain bg-card-stage/60 p-4 sm:p-6"
            >
              <motion.div
                key={activeImage.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: prefersReducedMotion ? 0.05 : 0.16, ease: EASE_EDITORIAL }}
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
                {activeImage.caption && (
                  <p className="mx-auto mt-4 max-w-2xl text-center font-mono text-xs text-muted">
                    {activeImage.caption}
                  </p>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
