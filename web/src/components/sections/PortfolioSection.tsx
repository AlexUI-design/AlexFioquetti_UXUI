"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Lightbox } from "@/components/ui/Lightbox";
import { portfolioCases, type GalleryImage } from "@/data/cv-data";

export function PortfolioSection() {
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const featuredCase = portfolioCases[0];

  if (!featuredCase) return null;

  return (
    <section
      id="portfolio"
      className="mx-auto max-w-[1520px] border-t border-hairline px-4 py-16 sm:px-8 sm:py-24"
    >
      <article className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <button
            type="button"
            onClick={() => setLightboxImage(featuredCase.fullpage)}
            aria-label={`Ver landing completa de ${featuredCase.title}`}
            className="group relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-[2px] border border-hairline bg-card-stage text-left"
          >
            <Image
              src={featuredCase.cover.src}
              alt={featuredCase.cover.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 840px"
              className="object-cover object-top transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015]"
            />
            <span className="pointer-events-none absolute right-3 bottom-3 z-10 inline-flex items-center gap-1 rounded-[2px] border border-hairline bg-paper/90 px-2.5 py-1 font-mono text-[11px] tracking-wider text-ink backdrop-blur-sm transition-colors group-hover:bg-paper">
              [ AMPLIAR LANDING COMPLETA ]
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-5 lg:col-span-5">
          <div>
            <span className="font-mono text-xs tracking-widest text-muted">
              02 / PORTFOLIO · CASO DESTACADO
            </span>
            <h2 className="mt-3 font-serif text-[clamp(32px,4vw,48px)] leading-[1.08] font-normal tracking-[-0.02em] text-ink">
              Bodega Tierras Altas
            </h2>
            <p className="mt-1.5 font-serif text-lg italic text-muted">
              Rediseño Web &amp; Experiencia Digital Vitivinícola
            </p>
          </div>

          <p className="font-sans text-[15px] leading-relaxed text-body">
            {featuredCase.description}
          </p>

          <p className="font-mono text-[11px] tracking-wider text-muted">
            #UX-RESEARCH · #DESIGN-SYSTEM · #FIGMA · #UX-WRITING
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={featuredCase.behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-[2px] bg-ink px-5 py-2.5 font-mono text-xs tracking-wider text-paper transition-opacity duration-150 hover:opacity-85"
            >
              <span>Ver caso completo en Behance</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </a>

            <button
              type="button"
              onClick={() => setLightboxImage(featuredCase.fullpage)}
              className="inline-flex items-center gap-1.5 rounded-[2px] border border-hairline bg-transparent px-5 py-2.5 font-mono text-xs tracking-wider text-ink transition-all hover:border-ink hover:bg-ink hover:text-paper"
            >
              <span>Explorar landing completa</span>
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </article>

      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </section>
  );
}
