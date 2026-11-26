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
    <section className="relative mx-auto flex min-h-[78svh] max-w-[1520px] flex-col justify-between overflow-x-clip px-4 py-8 sm:min-h-screen sm:px-8 sm:py-20">
      <motion.div
        aria-hidden="true"
        style={{ y: prefersReducedMotion ? 0 : watermarkY }}
        className="pointer-events-none absolute top-10 right-4 select-none font-serif text-[clamp(160px,28vw,420px)] leading-none font-normal tracking-[-0.05em] text-ghost/60 will-change-transform sm:top-6 sm:right-8"
      >
        AF
      </motion.div>

      <div className="relative z-10 pt-2 sm:pt-8">
        <div className="mb-4 sm:mb-6">
          <span className="font-mono text-xs tracking-wider text-muted">
            {heroData.overline}
          </span>
        </div>

        <SplitText
          lines={heroData.headlineLines}
          as="h1"
          className="font-serif text-[clamp(38px,9vw,92px)] leading-[1.02] font-normal tracking-[-0.03em] text-ink"
        />
      </div>

      <div className="relative z-10 mt-8 grid grid-cols-1 items-end gap-6 border-t border-hairline pt-6 sm:mt-14 sm:gap-10 sm:pt-8 lg:mt-20 lg:grid-cols-12 lg:gap-12">
        <p className="max-w-xl font-sans text-[15px] leading-[1.5] text-body sm:text-[17px] sm:leading-relaxed lg:col-span-7">
          {heroData.bio}
        </p>

        <nav
          aria-label={copy.quickNavAria}
          className="space-y-2 font-mono text-xs lg:col-span-5"
        >
          {quickNavProjects.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between border-b border-hairline/80 pb-2 text-muted transition-colors hover:border-ink hover:text-ink"
            >
              <span className="tracking-wider">{item.label}</span>
              <ArrowDownRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                strokeWidth={1.5}
              />
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
