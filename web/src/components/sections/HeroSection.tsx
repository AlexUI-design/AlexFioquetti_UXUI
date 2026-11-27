"use client";

import { ArrowDownRight } from "lucide-react";
import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { SplitText } from "@/components/ui/SplitText";
import { getLocalizedCvData } from "@/data/cv-data-en";
import { getUiCopy } from "@/data/ui-copy";

const quickNavProjects = [
  { label: "01 / FLOCK IT · ADVANTA", href: "#advanta" },
  { label: "02 / FLOCK IT · SYNGENTA", href: "#syngenta" },
  { label: "03 / FLOCK IT · SCALTER", href: "#scalter" },
  { label: "04 / BODEGA TIERRAS ALTAS", href: "#portfolio" },
] as const;

export function HeroSection() {
  const { locale } = useAppPreferences();
  const { heroData } = getLocalizedCvData(locale);
  const copy = getUiCopy(locale).hero;

  return (
    <section className="relative mx-auto flex min-h-[calc(100svh-57px)] max-w-[1520px] flex-col justify-between overflow-x-clip px-4 pt-6 pb-8 sm:px-8 sm:pt-8 sm:pb-10 md:min-h-[calc(100svh-73px)] lg:px-10">
      {/* Center focal zone: Overline, display headline, and concise bio */}
      <div className="relative z-10 flex flex-1 flex-col justify-center py-8 sm:py-12">
        <div className="mb-3 sm:mb-4">
          <span className="font-mono text-xs tracking-wider text-muted">
            {heroData.overline}
          </span>
        </div>

        <SplitText
          lines={heroData.headlineLines}
          as="h1"
          className="text-balance font-serif text-[clamp(38px,6.8vw,84px)] leading-[1.03] font-normal tracking-[-0.03em] text-ink"
        />

        <p className="mt-4 max-w-2xl font-sans text-[14.5px] leading-[1.52] text-body sm:mt-6 sm:text-[16px] sm:leading-[1.58]">
          {heroData.bio}
        </p>
      </div>

      {/* Bottom anchored zone: Project Index heading + 4 quick-jump links (no duplicate closing border) */}
      <div className="relative z-10 pt-4 sm:pt-6">
        <h2 className="mb-3 font-serif text-[17px] leading-snug font-normal tracking-[-0.01em] text-ink sm:mb-3.5 sm:text-[19px]">
          {copy.quickNavTitle}
        </h2>

        <nav
          aria-label={copy.quickNavAria}
          className="grid grid-cols-1 gap-x-10 gap-y-2.5 font-mono text-xs md:grid-cols-2 lg:gap-x-16"
        >
          {quickNavProjects.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between border-b border-hairline/70 pb-2.5 text-muted transition-colors hover:border-ink hover:text-ink"
            >
              <span className="tracking-wider">{item.label}</span>
              <ArrowDownRight
                className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                strokeWidth={1.5}
              />
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
