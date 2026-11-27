"use client";

import { ArrowDownRight } from "lucide-react";
import { IllosCiPipeline } from "@/components/illos/ci-pipeline";
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
    <section className="relative mx-auto flex min-h-[calc(100svh-57px)] max-w-[1520px] flex-col justify-between overflow-x-clip px-4 pt-3 pb-4 sm:px-8 sm:pt-5 sm:pb-6 md:min-h-[calc(100svh-73px)] md:pt-8 md:pb-8 lg:px-10 lg:pt-8 lg:pb-10">
      {/* Center focal zone: Stacked compact fit on mobile, full-width single column with fluid SVG contraction on tablet, balanced 50/50 split on desktop */}
      <div className="relative z-10 flex min-h-0 flex-1 items-center py-2 sm:py-4 md:py-5 lg:py-10">
        <div className="grid w-full grid-cols-1 items-center gap-3.5 sm:gap-5 md:gap-7 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          <div className="text-left lg:col-span-6">
            <div className="mb-1.5 sm:mb-2.5 md:mb-3 lg:mb-4">
              <span className="font-mono text-[11px] tracking-wider text-muted sm:text-xs">
                {heroData.overline}
              </span>
            </div>

            <SplitText
              lines={heroData.headlineLines}
              as="h1"
              className="text-balance font-serif text-[clamp(30px,8vw,38px)] leading-[1.03] font-normal tracking-[-0.03em] text-ink sm:text-[clamp(34px,5.6vw,44px)] md:text-[clamp(42px,5.8vw,56px)] lg:text-[clamp(44px,4.8vw,72px)]"
            />

            <p className="mt-2.5 max-w-xl font-sans text-[13.5px] leading-[1.42] text-body sm:mt-3.5 sm:text-[14.5px] sm:leading-[1.5] md:mt-4 md:max-w-2xl md:text-[15.5px] md:leading-[1.55] lg:mt-5 lg:max-w-xl lg:text-[16px] lg:leading-[1.58]">
              {heroData.bio}
            </p>
          </div>

          <div className="flex w-full items-center justify-center lg:col-span-6">
            <IllosCiPipeline
              loop
              labels={copy.pipelineLabels}
              title={copy.pipelineTitle}
              description={copy.pipelineDesc}
              className="w-full max-w-[270px] sm:max-w-[310px] md:max-w-[clamp(280px,calc((100svh_-_490px)_*_1.85),640px)] lg:max-w-[660px]"
            />
          </div>
        </div>
      </div>

      {/* Bottom anchored zone: Project Index heading + 4 quick-jump links visible inside the first viewport */}
      <div className="relative z-10 pt-2 sm:pt-3 md:pt-5 lg:pt-6">
        <h2 className="mb-2 font-serif text-[15px] leading-snug font-normal tracking-[-0.01em] text-ink sm:mb-2.5 sm:text-[17px] lg:mb-3.5 lg:text-[19px]">
          {copy.quickNavTitle}
        </h2>

        <nav
          aria-label={copy.quickNavAria}
          className="grid grid-cols-1 gap-x-8 gap-y-1.5 font-mono text-[11px] sm:grid-cols-2 sm:gap-y-2 sm:text-xs md:gap-x-10 md:gap-y-2.5 lg:gap-x-16"
        >
          {quickNavProjects.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between border-b border-hairline/70 py-1 text-muted transition-colors hover:border-ink hover:text-ink sm:py-1.5 md:pt-0 md:pb-2.5"
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
