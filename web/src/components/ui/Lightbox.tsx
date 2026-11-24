"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import type { GalleryImage } from "@/data/cv-data";
import { EASE_EDITORIAL } from "@/lib/motion";

interface LightboxProps {
  image: GalleryImage | null;
  onClose: () => void;
}

export function Lightbox({ image, onClose }: LightboxProps) {
  const { stop, start } = useSmoothScroll();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!image) return;

    stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      start();
    };
  }, [image, onClose, stop, start]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={image.title}
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
            className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[4px] border border-hairline bg-paper"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-hairline bg-paper/95 px-5 py-3.5 backdrop-blur-md">
              <div className="min-w-0">
                <span className="block font-mono text-[11px] uppercase tracking-wider text-muted">
                  {image.productLabel}
                </span>
                <h4 className="truncate font-serif text-lg font-normal text-ink sm:text-xl">
                  {image.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar vista ampliada"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[2px] border border-hairline bg-paper text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            <div className="overscroll-contain overflow-y-auto bg-card-stage/60 p-4 sm:p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className={
                  image.isMobile
                    ? "mx-auto h-auto w-full max-w-[420px] rounded-[12px] border border-hairline bg-paper"
                    : "h-auto w-full rounded-[2px] border border-hairline bg-paper"
                }
              />
              {image.caption && (
                <p className="mx-auto mt-4 max-w-2xl text-center font-mono text-xs text-muted">
                  {image.caption}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
