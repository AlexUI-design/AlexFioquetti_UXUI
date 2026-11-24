"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { GalleryRenderer } from "@/components/ui/GalleryRenderer";
import { Lightbox } from "@/components/ui/Lightbox";
import { SplitText } from "@/components/ui/SplitText";
import { stickyProjects, type GalleryImage, type StickyProject } from "@/data/cv-data";
import {
  ACCORDION_TRANSITION,
  EASE_EDITORIAL,
  PARALLAX_OFFSET_RANGE,
  STACK_OPACITY_RANGE,
  STACK_SCALE_RANGE,
  TAB_TRANSITION,
} from "@/lib/motion";

interface StickyProjectCardProps {
  project: StickyProject;
  index: number;
  total: number;
  onOpenLightbox: (image: GalleryImage) => void;
}

const STICKY_Z_INDEX = ["z-10", "z-20", "z-30"] as const;

function StickyProjectCard({
  project,
  index,
  total,
  onOpenLightbox,
}: StickyProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTabId, setActiveTabId] = useState(project.tabs[0]?.id ?? "");
  const baseTop = 80 + index * 16;
  const [stickyTop, setStickyTop] = useState(baseTop);

  const cardRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { resize } = useSmoothScroll();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });

  const isCoveredByNext = index < total - 1;
  const animatedScale = useTransform(
    scrollYProgress,
    [0, 1],
    isCoveredByNext ? [STACK_SCALE_RANGE[0], STACK_SCALE_RANGE[1]] : [1, 1]
  );
  const animatedOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    isCoveredByNext ? [STACK_OPACITY_RANGE[0], STACK_OPACITY_RANGE[1]] : [1, 1]
  );
  const parallaxY = useTransform(scrollYProgress, [0, 1], [
    PARALLAX_OFFSET_RANGE[0],
    PARALLAX_OFFSET_RANGE[1],
  ]);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const updateTop = () => {
      const height = element.getBoundingClientRect().height;
      const computedTop = Math.min(baseTop, window.innerHeight - height - 24);
      setStickyTop(computedTop);
    };

    updateTop();
    const observer = new ResizeObserver(() => {
      updateTop();
    });
    observer.observe(element);
    window.addEventListener("resize", updateTop);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateTop);
    };
  }, [baseTop]);

  const activeTab = project.tabs.find((tab) => tab.id === activeTabId) ?? project.tabs[0];
  const zIndexClass = STICKY_Z_INDEX[index] ?? "z-30";

  return (
    <motion.article
      id={project.id}
      ref={cardRef}
      style={{
        top: `${stickyTop}px`,
        scale: prefersReducedMotion ? 1 : animatedScale,
        opacity: prefersReducedMotion ? 1 : animatedOpacity,
      }}
      className={`sticky ${zIndexClass} origin-top scroll-mt-24 rounded-[4px] border border-hairline bg-card-stage p-5 will-change-transform sm:p-8`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-4">
        <span className="font-mono text-xs font-medium tracking-wider text-ink">
          {project.tag}
        </span>
        <span className="font-mono text-xs tracking-wider text-muted">{project.metadata}</span>
      </div>

      <h3 className="mt-5 font-serif text-[clamp(28px,4.5vw,52px)] leading-[1.08] font-normal tracking-[-0.02em] text-ink">
        {project.title}
      </h3>

      <div className="mt-6">
        <button
          type="button"
          onClick={() => onOpenLightbox(project.cover)}
          aria-label={`Ampliar portada de ${project.title}`}
          className="group relative block aspect-[16/10] h-[45vh] max-h-[760px] w-full cursor-zoom-in overflow-hidden rounded-[2px] border border-hairline bg-paper text-left sm:h-[66vh]"
        >
          <motion.div
            style={{ y: prefersReducedMotion ? 0 : parallaxY }}
            className="relative -top-[25px] h-[calc(100%+50px)] w-full will-change-transform"
          >
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 1456px"
              className="object-cover object-top transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015]"
            />
          </motion.div>
          <span className="pointer-events-none absolute right-3 bottom-3 z-10 inline-flex items-center gap-1 rounded-[2px] border border-hairline bg-paper/90 px-2.5 py-1 font-mono text-[11px] tracking-wider text-ink backdrop-blur-sm transition-colors group-hover:bg-paper">
            {project.cover.isLong ? "Ver pantalla completa" : "Ampliar vista"}
            <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
          </span>
        </button>
      </div>

      <p className="mt-6 max-w-4xl font-sans text-[15px] leading-relaxed text-body sm:text-base">
        {project.summary}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-hairline/70 pt-5">
        <p className="font-mono text-[11px] tracking-wider text-muted">
          {project.chips.join(" · ")}
        </p>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          className="inline-flex items-center gap-2 rounded-[2px] border border-hairline bg-paper px-4 py-2 font-mono text-xs tracking-wider text-ink transition-all hover:border-ink hover:bg-ink hover:text-paper"
        >
          <span>{isOpen ? "Ocultar caso de estudio" : "Explorar caso de estudio"}</span>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            strokeWidth={1.5}
          />
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={prefersReducedMotion ? { duration: 0.15 } : ACCORDION_TRANSITION}
        onAnimationComplete={() => resize()}
        className="overflow-hidden"
      >
        <div className="mt-6 border-t border-hairline pt-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-5 lg:col-span-7">
              <div>
                <h4 className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  El Desafío
                </h4>
                <p className="mt-1.5 font-sans text-sm leading-relaxed text-body">
                  {project.challenge}
                </p>
              </div>
              <div>
                <h4 className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  Aportes y Rol de Alex
                </h4>
                <ul className="mt-2 space-y-2 font-sans text-sm leading-relaxed text-body">
                  {project.roleContributions.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-5 border-t border-hairline pt-5 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
              <div>
                <h4 className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  Impacto y Resultado
                </h4>
                <p className="mt-1.5 font-sans text-sm leading-relaxed text-body">
                  {project.impact}
                </p>
              </div>
              <div>
                <h4 className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  Stack de Diseño
                </h4>
                <p className="mt-2 font-mono text-[11px] leading-relaxed tracking-wider text-ink">
                  {project.designStack.join(" · ")}
                </p>
              </div>
            </div>
          </div>

          {project.tabs.length > 0 && (
            <div className="mt-8 border-t border-hairline pt-6">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
                <div className="max-w-2xl">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    Galería del Ecosistema
                  </span>
                  <p className="mt-1 font-sans text-sm text-body">{activeTab.description}</p>
                </div>

                <div
                  role="tablist"
                  aria-label={`Pantallas de ${project.title}`}
                  className="flex flex-nowrap items-center gap-6 overflow-x-auto border-b border-hairline [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {project.tabs.map((tab) => {
                    const isActive = tab.id === activeTab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveTabId(tab.id)}
                        className={`relative shrink-0 whitespace-nowrap py-2 font-mono text-xs tracking-wider transition-colors ${
                          isActive ? "font-medium text-ink" : "text-muted hover:text-ink"
                        }`}
                      >
                        <span>{tab.label}</span>
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="absolute right-0 bottom-0 left-0 h-[1.5px] bg-ink"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab.id}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                    animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0.1 }
                        : { ...TAB_TRANSITION, ease: EASE_EDITORIAL }
                    }
                  >
                    <GalleryRenderer blocks={activeTab.blocks} onOpenLightbox={onOpenLightbox} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.article>
  );
}

export function StickyProjectsSection() {
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  return (
    <section
      id="proyectos"
      className="mx-auto max-w-[1520px] border-t border-hairline px-4 py-16 sm:px-8 sm:py-24"
    >
      <div className="mb-12">
        <span className="font-mono text-xs tracking-wider text-muted">
          01 / PROYECTOS SELECCIONADOS
        </span>
        <SplitText
          lines={["Trabajo en Producción"]}
          as="h2"
          className="mt-2 font-serif text-[clamp(32px,4.5vw,52px)] leading-[1.08] font-normal tracking-[-0.02em] text-ink"
        />
      </div>

      <div className="flex flex-col gap-12 pb-8">
        {stickyProjects.map((project, index) => (
          <StickyProjectCard
            key={project.id}
            project={project}
            index={index}
            total={stickyProjects.length}
            onOpenLightbox={setLightboxImage}
          />
        ))}
      </div>

      <Lightbox image={lightboxImage} onClose={() => setLightboxImage(null)} />
    </section>
  );
}
