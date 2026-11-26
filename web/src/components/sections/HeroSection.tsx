"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
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
  const prefersReducedMotion = useReducedMotion();
  const { locale } = useAppPreferences();
  const { heroData } = getLocalizedCvData(locale);
  const copy = getUiCopy(locale).hero;
  const { scrollY } = useScroll();
  const watermarkY = useTransform(scrollY, [0, 600], [0, 80]);

  return (
    <section className="relative mx-auto flex min-h-[62svh] max-w-[1520px] flex-col justify-between overflow-x-clip px-4 pt-7 pb-6 sm:min-h-[min(78svh,680px)] sm:px-8 sm:pt-12 sm:pb-8 lg:px-10">
      <motion.div
        aria-hidden="true"
        style={{ y: prefersReducedMotion ? 0 : watermarkY }}
        className="pointer-events-none absolute top-8 right-4 select-none font-serif text-[clamp(140px,24vw,350px)] leading-none font-normal tracking-[-0.05em] text-ghost/55 will-change-transform sm:top-5 sm:right-8"
      >
        AF
      </motion.div>

      {/* Top zone: Overline, simplified headline, and compact bio directly underneath */}
      <div className="relative z-10 pt-1 sm:pt-3">
        <div className="mb-3 sm:mb-4">
          <span className="font-mono text-xs tracking-wider text-muted">
            {heroData.overline}
          </span>
        </div>

        <SplitText
          lines={heroData.headlineLines}
          as="h1"
          className="font-serif text-[clamp(36px,7vw,82px)] leading-[1.03] font-normal tracking-[-0.03em] text-ink"
        />

        <p className="mt-4 max-w-xl font-sans text-[14px] leading-[1.48] text-body sm:mt-5 sm:text-[15.5px] sm:leading-[1.5]">
          {heroData.bio}
        </p>
      </div>

      {/* Bottom zone: 4 featured projects directly above the hero closing hairline */}
      <div className="relative z-10 mt-10 border-b border-hairline pb-5 sm:mt-14 sm:pb-7">
        <nav
          aria-label={copy.quickNavAria}
          className="grid grid-cols-1 gap-x-10 gap-y-2.5 font-mono text-xs md:grid-cols-2 lg:gap-x-16"
        >
          {quickNavProjects.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between border-b border-hairline/70 pb-2 text-muted transition-colors hover:border-ink hover:text-ink"
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
