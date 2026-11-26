"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { Lightbox } from "@/components/ui/Lightbox";
import type { GalleryImage } from "@/data/cv-data";
import { getLocalizedCvData } from "@/data/cv-data-en";
import { getUiCopy } from "@/data/ui-copy";

export function PortfolioSection() {
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const { locale } = useAppPreferences();
  const { portfolioCases } = getLocalizedCvData(locale);
  const copy = getUiCopy(locale).portfolio;
  const featuredCase = portfolioCases[0];

  if (!featuredCase) return null;

  return (
    <section
      id="portfolio"
      className="mx-auto max-w-[1520px] border-t border-hairline px-4 py-10 sm:px-8 sm:py-20 lg:py-24"
    >
      <article className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <button
            type="button"
            onClick={() => setLightboxImage(featuredCase.fullpage)}
            aria-label={copy.expandLandingAria(featuredCase.title)}
            className="group relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-[2px] border border-hairline bg-card-stage text-left"
          >
            <Image
              src={featuredCase.cover.src}
              alt={featuredCase.cover.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 840px"
              className="object-cover object-top transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015]"
            />
            <span className="pointer-events-none absolute right-2.5 bottom-2.5 z-10 inline-flex items-center gap-1 rounded-[2px] border border-hairline bg-paper/90 px-2 py-1 font-mono text-[10px] tracking-wider text-ink backdrop-blur-sm transition-colors group-hover:bg-paper sm:right-3 sm:bottom-3 sm:px-2.5 sm:text-[11px]">
              {copy.expandPreview}
              <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
            </span>
          </button>
        </div>

        <div className="flex flex-col gap-3.5 sm:gap-5 lg:col-span-5">
          <div>
            <span className="font-mono text-xs tracking-widest text-muted">{copy.overline}</span>
            <h2 className="mt-2 font-serif text-[clamp(26px,6.5vw,48px)] leading-[1.08] font-normal tracking-[-0.02em] text-ink sm:mt-3">
              {copy.title}
            </h2>
            <p className="mt-1 font-serif text-base italic text-muted sm:mt-1.5 sm:text-lg">
              {copy.subtitle}
            </p>
          </div>

          <p className="font-sans text-[14px] leading-[1.48] text-body sm:text-[15px] sm:leading-relaxed">
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
              className="group inline-flex items-center gap-1.5 rounded-[2px] bg-ink px-5 py-2.5 font-mono text-xs font-medium tracking-wider text-paper transition-opacity duration-150 hover:opacity-85"
            >
              <span>{copy.viewBehance}</span>
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
              <span>{copy.exploreFullLanding}</span>
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </article>

      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </section>
  );
}
