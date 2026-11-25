"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { GalleryRenderer } from "@/components/ui/GalleryRenderer";
import { Lightbox } from "@/components/ui/Lightbox";
import { SplitText } from "@/components/ui/SplitText";
import { stickyProjects, type GalleryImage, type StickyProject } from "@/data/cv-data";
import {
  ACCORDION_TRANSITION,
  EASE_EDITORIAL,
  PARALLAX_OFFSET_RANGE,
  STACK_SCALE_RANGE,
  STACK_VEIL_RANGE,
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
  const baseTop = 84 + index * 12;

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
  const veilOpacity = useTransform(
    scrollYProgress,
    [0.15, 1],
    isCoveredByNext ? [STACK_VEIL_RANGE[0], STACK_VEIL_RANGE[1]] : [0, 0]
  );
  const parallaxY = useTransform(scrollYProgress, [0, 1], [
    PARALLAX_OFFSET_RANGE[0],
    PARALLAX_OFFSET_RANGE[1],
  ]);

  const activeTab = project.tabs.find((tab) => tab.id === activeTabId) ?? project.tabs[0];
  const zIndexClass = STICKY_Z_INDEX[index] ?? "z-30";

  const overlapShadowClass =
    index > 0
      ? "shadow-[0_-14px_36px_-18px_rgba(23,23,21,0.14),0_8px_24px_-16px_rgba(23,23,21,0.08)]"
      : "";

  const handleCollapseFromBar = () => {
    setIsOpen(false);
    requestAnimationFrame(() => {
      cardRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  };

  return (
    <motion.article
      id={project.id}
      ref={cardRef}
      style={{
        top: isOpen ? undefined : `${baseTop}px`,
        scale: prefersReducedMotion || isOpen ? 1 : animatedScale,
      }}
      className={`${isOpen ? "relative" : "sticky"} ${zIndexClass} origin-top scroll-mt-24 rounded-[4px] border border-hairline bg-card-stage p-4 will-change-transform sm:px-7 sm:py-5 ${overlapShadowClass}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-3">
        <span className="font-mono text-xs font-medium tracking-wider text-ink">
          {project.tag}
        </span>
        <span className="font-mono text-xs tracking-wider text-muted">{project.metadata}</span>
      </div>

      <h3 className="mt-3 font-serif text-[clamp(24px,3vw,38px)] leading-[1.1] font-normal tracking-[-0.02em] text-ink">
        {project.title}
      </h3>

      <div className="mt-4">
        <button
          type="button"
          onClick={() => onOpenLightbox(project.cover)}
          aria-label={`Ampliar portada de ${project.title}`}
          className="group relative block h-[36vh] min-h-[220px] max-h-[440px] w-full cursor-zoom-in overflow-hidden rounded-[2px] border border-hairline bg-paper text-left sm:h-[42vh] lg:h-[45vh]"
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

      <p className="mt-4 max-w-4xl font-sans text-sm leading-relaxed text-body sm:text-[15px]">
        {project.summary}
      </p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-hairline/70 pt-4">
        <p className="font-mono text-[11px] tracking-wider text-muted">
          {project.chips.join(" · ")}
        </p>

        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-expanded={false}
            className="inline-flex items-center gap-2 rounded-[2px] border border-ink bg-ink px-5 py-2.5 font-mono text-xs font-medium tracking-wider text-paper transition-opacity hover:opacity-85"
          >
            <span>Explorar caso de estudio</span>
            <ChevronDown className="h-4 w-4" strokeWidth={1.75} />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="sticky top-[72px] z-30 -mx-4 mt-5 border-y border-hairline bg-card-stage/95 px-4 py-2.5 backdrop-blur-md sm:-mx-7 sm:px-7">
          <div className="min-w-0">
            <span className="block truncate font-mono text-[10px] tracking-wider text-body/80">
              {project.tag}
            </span>
            <p className="truncate font-serif text-base leading-tight text-ink sm:text-lg">
              {project.title}
            </p>
          </div>
        </div>
      )}

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
        <div className="pt-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-7">
              <div>
                <h4 className="font-serif text-xl leading-snug font-medium tracking-[-0.01em] text-ink sm:text-[22px]">
                  El Desafío
                </h4>
                <p className="mt-2 font-sans text-[15px] leading-relaxed text-body">
                  {project.challenge}
                </p>
              </div>
              <div>
                <h4 className="font-serif text-xl leading-snug font-medium tracking-[-0.01em] text-ink sm:text-[22px]">
                  Aportes y Rol de Alex
                </h4>
                <ul className="mt-2.5 space-y-2.5 font-sans text-[15px] leading-relaxed text-body">
                  {project.roleContributions.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-ink"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6 border-t border-hairline pt-6 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
              <div>
                <h4 className="font-serif text-xl leading-snug font-medium tracking-[-0.01em] text-ink sm:text-[22px]">
                  Impacto y Resultado
                </h4>
                <p className="mt-2 font-sans text-[15px] leading-relaxed text-body">
                  {project.impact}
                </p>
              </div>
              <div>
                <h4 className="font-serif text-xl leading-snug font-medium tracking-[-0.01em] text-ink sm:text-[22px]">
                  Stack de Diseño
                </h4>
                <p className="mt-2 font-mono text-xs font-medium leading-relaxed tracking-wider text-ink">
                  {project.designStack.join(" · ")}
                </p>
              </div>
            </div>
          </div>

          {project.tabs.length > 0 && (
            <div className="mt-8 border-t border-hairline pt-6">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
                <div className="max-w-2xl">
                  <h4 className="font-serif text-xl leading-snug font-medium tracking-[-0.01em] text-ink sm:text-[22px]">
                    Galería del Ecosistema
                  </h4>
                  <p className="mt-1.5 font-sans text-[15px] leading-relaxed text-body">
                    {activeTab.description}
                  </p>
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
                        className={`relative shrink-0 whitespace-nowrap py-2.5 font-mono text-xs tracking-wider transition-colors sm:text-[13px] ${
                          isActive ? "font-semibold text-ink" : "text-body/80 hover:text-ink"
                        }`}
                      >
                        <span>{tab.label}</span>
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="absolute right-0 bottom-0 left-0 h-[2px] bg-ink"
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

      {isOpen && (
        <div className="pointer-events-none sticky bottom-5 z-40 mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleCollapseFromBar}
            aria-expanded={true}
            aria-label={`Ocultar caso de estudio de ${project.title}`}
            className="pointer-events-auto inline-flex items-center gap-2 rounded-[2px] border border-paper/25 bg-ink px-5 py-2.5 font-mono text-xs font-medium tracking-wider text-paper shadow-[0_12px_28px_-8px_rgba(23,23,21,0.45)] transition-opacity hover:opacity-90"
          >
            <span>Ocultar caso de estudio</span>
            <ChevronUp className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
      )}

      {isCoveredByNext && !prefersReducedMotion && !isOpen && (
        <motion.div
          aria-hidden="true"
          style={{ opacity: veilOpacity }}
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] bg-card-stage"
        />
      )}
    </motion.article>
  );
}

function getProjectGalleryImages(project: StickyProject): GalleryImage[] {
  const ordered: GalleryImage[] = [];
  const seenSrc = new Set<string>();

  const appendImage = (img: GalleryImage) => {
    if (seenSrc.has(img.src)) return;
    seenSrc.add(img.src);
    ordered.push(img);
  };

  for (const tab of project.tabs) {
    for (const block of tab.blocks) {
      if (block.type === "hero") {
        appendImage(block.image);
      } else if (block.type === "pair") {
        appendImage(block.images[0]);
        appendImage(block.images[1]);
      } else if (block.type === "responsive-showcase") {
        appendImage(block.desktop);
        appendImage(block.mobile);
      } else if (block.type === "mobile-strip") {
        for (const img of block.images) {
          appendImage(img);
        }
      }
    }
  }

  appendImage(project.cover);

  return ordered;
}

export function StickyProjectsSection() {
  const [lightboxState, setLightboxState] = useState<{
    images: GalleryImage[];
    index: number;
  } | null>(null);

  const handleOpenLightbox = (project: StickyProject, clickedImage: GalleryImage) => {
    const images = getProjectGalleryImages(project);
    const matchedIndex = images.findIndex(
      (img) => img.id === clickedImage.id || img.src === clickedImage.src
    );
    setLightboxState({
      images,
      index: matchedIndex >= 0 ? matchedIndex : 0,
    });
  };

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
            onOpenLightbox={(image) => handleOpenLightbox(project, image)}
          />
        ))}
      </div>

      <Lightbox
        images={lightboxState?.images}
        currentIndex={lightboxState?.index}
        onNavigate={(nextIndex) =>
          setLightboxState((prev) => (prev ? { ...prev, index: nextIndex } : null))
        }
        onClose={() => setLightboxState(null)}
      />
    </section>
  );
}
