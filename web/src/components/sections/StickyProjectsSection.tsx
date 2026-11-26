"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { GalleryRenderer } from "@/components/ui/GalleryRenderer";
import { Lightbox, type LightboxSectionTab } from "@/components/ui/Lightbox";
import { SplitText } from "@/components/ui/SplitText";
import type { GalleryImage, StickyProject } from "@/data/cv-data";
import { getLocalizedCvData } from "@/data/cv-data-en";
import { getUiCopy } from "@/data/ui-copy";
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
  activeTabId: string;
  onSelectTab: (tabId: string) => void;
  onOpenLightbox: (image: GalleryImage) => void;
  onOpenChange: (projectId: string, open: boolean) => void;
}

const STICKY_Z_INDEX = ["z-10", "z-20", "z-30"] as const;

function StickyProjectCard({
  project,
  index,
  total,
  activeTabId,
  onSelectTab,
  onOpenLightbox,
  onOpenChange,
}: StickyProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isStickyBarVisible, setIsStickyBarVisible] = useState(false);
  const baseTop = 84 + index * 12;

  const cardRef = useRef<HTMLElement>(null);
  const chipsRowRef = useRef<HTMLDivElement>(null);
  const stickySentinelRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { resize, scrollTo } = useSmoothScroll();
  const { locale } = useAppPreferences();
  const copy = getUiCopy(locale).projects;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateDesktop = () => setIsDesktop(mediaQuery.matches);
    updateDesktop();
    mediaQuery.addEventListener("change", updateDesktop);
    return () => mediaQuery.removeEventListener("change", updateDesktop);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setIsStickyBarVisible(false);
      return;
    }

    const updateStickyBar = () => {
      const sentinel = stickySentinelRef.current;
      const card = cardRef.current;
      if (!sentinel || !card) return;

      const isMdUp = window.innerWidth >= 768;
      const mobileOffset =
        parseFloat(
          window.getComputedStyle(document.documentElement).getPropertyValue("--mobile-navbar-offset")
        ) || 0;
      const stickyTop = isMdUp ? 72 : mobileOffset;

      const sentinelTop = sentinel.getBoundingClientRect().top;
      const cardBottom = card.getBoundingClientRect().bottom;

      const nextVisible = sentinelTop <= stickyTop + 4 && cardBottom > stickyTop + 100;
      setIsStickyBarVisible((prev) => (prev === nextVisible ? prev : nextVisible));
    };

    updateStickyBar();
    window.addEventListener("scroll", updateStickyBar, { passive: true });
    window.addEventListener("resize", updateStickyBar, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateStickyBar);
      window.removeEventListener("resize", updateStickyBar);
    };
  }, [isOpen]);

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

  const keepInFlow = isOpen || isCollapsing;
  const shouldStick = isDesktop && !keepInFlow;

  const handleOpen = () => {
    setIsCollapsing(false);
    setIsOpen(true);
    onOpenChange(project.id, true);
  };

  const handleCollapseFromBar = () => {
    setIsCollapsing(true);
    setIsOpen(false);
    onOpenChange(project.id, false);

    requestAnimationFrame(() => {
      const cardEl = cardRef.current;
      const chipsRowEl = chipsRowRef.current;
      if (!cardEl || !chipsRowEl) {
        return;
      }

      const parentStyles = cardEl.parentElement
        ? window.getComputedStyle(cardEl.parentElement)
        : null;
      const cardStyles = window.getComputedStyle(cardEl);
      const rowGap = parseFloat(parentStyles?.rowGap || "") || (isDesktop ? 48 : 24);
      const paddingBottom = parseFloat(cardStyles.paddingBottom || "") || 20;

      const cardTop = cardEl.getBoundingClientRect().top + window.scrollY;
      const collapsedCardBottom =
        chipsRowEl.getBoundingClientRect().bottom + window.scrollY + paddingBottom;

      const hasNextProject = index < total - 1;
      const nextTopOffset = isDesktop ? 84 + (index + 1) * 12 : 68;
      const currentTopOffset = isDesktop ? baseTop : 68;

      const targetY = hasNextProject
        ? Math.max(0, collapsedCardBottom + rowGap - nextTopOffset)
        : Math.max(0, cardTop - currentTopOffset);

      scrollTo(targetY, {
        duration: prefersReducedMotion ? 0 : 0.72,
        immediate: Boolean(prefersReducedMotion),
        force: true,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        onComplete: () => {
          resize();
        },
      });
    });
  };

  return (
    <motion.article
      id={project.id}
      ref={cardRef}
      style={{
        top: shouldStick ? `${baseTop}px` : undefined,
        scale: prefersReducedMotion || !shouldStick ? 1 : animatedScale,
      }}
      className={`${shouldStick ? "sticky" : "relative"} ${zIndexClass} origin-top scroll-mt-18 rounded-[4px] border border-hairline bg-card-stage p-3.5 will-change-transform sm:px-7 sm:py-5 lg:scroll-mt-24 ${overlapShadowClass}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-hairline pb-2.5 sm:gap-2 sm:pb-3">
        <span className="font-mono text-[11px] font-medium tracking-wider text-ink sm:text-xs">
          {project.tag}
        </span>
        <span className="font-mono text-[11px] tracking-wider text-muted sm:text-xs">
          {project.metadata}
        </span>
      </div>

      <h3 className="mt-2.5 font-serif text-[20px] leading-[1.18] font-medium tracking-[-0.015em] text-ink sm:mt-3 sm:text-[24px] lg:text-[28px]">
        {project.title}
      </h3>

      <div className="mt-3 sm:mt-4">
        <button
          type="button"
          onClick={() => onOpenLightbox(project.cover)}
          aria-label={copy.expandCoverAria(project.title)}
          className="group relative block h-[200px] w-full cursor-zoom-in overflow-hidden rounded-[2px] border border-hairline bg-paper text-left sm:h-[38vh] sm:min-h-[240px] lg:h-[44vh] max-h-[440px]"
        >
          <motion.div
            style={{ y: prefersReducedMotion || !isDesktop ? 0 : parallaxY }}
            className={`relative w-full will-change-transform ${
              isDesktop ? "-top-[25px] h-[calc(100%+50px)]" : "h-full"
            }`}
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
          <span className="pointer-events-none absolute right-2.5 bottom-2.5 z-10 inline-flex items-center gap-1 rounded-[2px] border border-hairline bg-paper/90 px-2 py-1 font-mono text-[10px] tracking-wider text-ink backdrop-blur-sm transition-colors group-hover:bg-paper sm:right-3 sm:bottom-3 sm:px-2.5 sm:text-[11px]">
            {copy.expandPreview}
            <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
          </span>
        </button>
      </div>

      <p className="mt-2.5 max-w-4xl font-sans text-[13.5px] leading-[1.45] text-body sm:mt-3.5 sm:text-[15px] sm:leading-[1.55]">
        {project.summary}
      </p>

      <div className="relative mt-3 border-t border-hairline/70 pt-3 sm:mt-4 sm:pt-4">
        <div
          ref={chipsRowRef}
          className="flex min-h-[40px] flex-wrap items-center justify-between gap-3 sm:min-h-[42px] sm:gap-4"
        >
          <p className="font-mono text-[11px] leading-snug tracking-wider text-muted">
            {project.chips.join(" · ")}
          </p>

          {!isOpen && (
            <button
              type="button"
              onClick={handleOpen}
              aria-expanded={false}
              className="inline-flex w-full items-center justify-center gap-2 rounded-[2px] border border-ink bg-ink px-4 py-2.5 font-mono text-xs font-medium tracking-wider text-paper transition-opacity hover:opacity-85 sm:w-auto sm:px-5"
            >
              <span>{copy.exploreCase}</span>
              <ChevronDown className="h-4 w-4" strokeWidth={1.75} />
            </button>
          )}
        </div>

        <div ref={stickySentinelRef} aria-hidden="true" className="h-0 w-full" />

        {isOpen && (
          <div className="pointer-events-none sticky top-[var(--mobile-navbar-offset,56px)] z-30 -mx-3.5 h-0 overflow-visible transition-[top] duration-300 sm:-mx-7 md:top-[72px]">
            <div
              aria-hidden={!isStickyBarVisible}
              className={`border-y border-hairline bg-card-stage/95 px-3.5 py-2 backdrop-blur-md transition-opacity duration-200 sm:px-7 sm:py-2.5 ${
                isStickyBarVisible ? "pointer-events-auto opacity-100" : "opacity-0"
              }`}
            >
              <div className="min-w-0">
                <span className="block truncate font-mono text-[10px] tracking-wider text-body/80">
                  {project.tag}
                </span>
                <p className="truncate font-serif text-[15px] leading-tight text-ink sm:text-lg">
                  {project.title}
                </p>
              </div>
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
        onAnimationComplete={() => {
          resize();
          if (!isOpen && isCollapsing) {
            setIsCollapsing(false);
            requestAnimationFrame(() => resize());
          }
        }}
        className="overflow-hidden"
      >
        <div className="pt-4 sm:pt-6">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-8">
            <div className="space-y-4 sm:space-y-6 lg:col-span-7">
              <div>
                <h4 className="font-serif text-[19px] leading-snug font-medium tracking-[-0.01em] text-ink sm:text-[22px]">
                  {copy.challengeHeading}
                </h4>
                <p className="mt-1.5 font-sans text-[14px] leading-[1.48] text-body sm:mt-2 sm:text-[15px] sm:leading-relaxed">
                  {project.challenge}
                </p>
              </div>
              <div>
                <h4 className="font-serif text-[19px] leading-snug font-medium tracking-[-0.01em] text-ink sm:text-[22px]">
                  {copy.roleHeading}
                </h4>
                <ul className="mt-2 space-y-2 font-sans text-[14px] leading-[1.48] text-body sm:mt-2.5 sm:space-y-2.5 sm:text-[15px] sm:leading-relaxed">
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

            <div className="space-y-4 border-t border-hairline pt-4 sm:space-y-6 sm:pt-6 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
              <div>
                <h4 className="font-serif text-[19px] leading-snug font-medium tracking-[-0.01em] text-ink sm:text-[22px]">
                  {copy.impactHeading}
                </h4>
                <p className="mt-1.5 font-sans text-[14px] leading-[1.48] text-body sm:mt-2 sm:text-[15px] sm:leading-relaxed">
                  {project.impact}
                </p>
              </div>
              <div>
                <h4 className="font-serif text-[19px] leading-snug font-medium tracking-[-0.01em] text-ink sm:text-[22px]">
                  {copy.stackHeading}
                </h4>
                <p className="mt-1.5 font-mono text-xs font-medium leading-relaxed tracking-wider text-ink sm:mt-2">
                  {project.designStack.join(" · ")}
                </p>
              </div>
            </div>
          </div>

          {project.tabs.length > 0 && (
            <div className="mt-6 border-t border-hairline pt-5 sm:mt-8 sm:pt-6">
              <div className="flex flex-col justify-between gap-3 sm:gap-4 lg:flex-row lg:items-end">
                <div className="max-w-2xl">
                  <h4 className="font-serif text-[19px] leading-snug font-medium tracking-[-0.01em] text-ink sm:text-[22px]">
                    {copy.galleryHeading}
                  </h4>
                  <p className="mt-1 font-sans text-[14px] leading-[1.48] text-body sm:mt-1.5 sm:text-[15px] sm:leading-relaxed">
                    {activeTab.description}
                  </p>
                </div>

                <div
                  role="tablist"
                  aria-label={copy.tabsAria(project.title)}
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
                        onClick={() => onSelectTab(tab.id)}
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
              aria-label={copy.hideCaseAria(project.title)}
              className="pointer-events-auto inline-flex items-center gap-2 rounded-[2px] border border-paper/25 bg-ink px-5 py-2.5 font-mono text-xs font-medium tracking-wider text-paper shadow-[0_12px_28px_-8px_rgba(23,23,21,0.45)] transition-opacity hover:opacity-90"
            >
              <span>{copy.hideCase}</span>
              <ChevronUp className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        )}
      </div>

      {isCoveredByNext && !prefersReducedMotion && shouldStick && (
        <motion.div
          aria-hidden="true"
          style={{ opacity: veilOpacity }}
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] bg-card-stage"
        />
      )}
    </motion.article>
  );
}

interface ProjectGalleryData {
  images: GalleryImage[];
  tabs: LightboxSectionTab[];
}

function getProjectGalleryData(project: StickyProject): ProjectGalleryData {
  const ordered: GalleryImage[] = [];
  const tabs: LightboxSectionTab[] = [];
  const seenSrc = new Set<string>();

  const appendImage = (img: GalleryImage) => {
    if (seenSrc.has(img.src)) return;
    seenSrc.add(img.src);
    ordered.push(img);
  };

  for (const tab of project.tabs) {
    const startIndex = ordered.length;
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
    const endIndex = ordered.length - 1;
    if (endIndex >= startIndex) {
      tabs.push({
        id: tab.id,
        label: tab.label,
        startIndex,
        endIndex,
      });
    }
  }

  appendImage(project.cover);

  return { images: ordered, tabs };
}

export function StickyProjectsSection() {
  const { locale } = useAppPreferences();
  const { stickyProjects } = getLocalizedCvData(locale);
  const copy = getUiCopy(locale).projects;

  const [activeTabByProject, setActiveTabByProject] = useState<Record<string, string>>({});
  const [lightboxState, setLightboxState] = useState<{
    projectId: string;
    index: number;
  } | null>(null);
  const [openProjectIds, setOpenProjectIds] = useState<string[]>([]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--scroll-top-extra-offset",
      openProjectIds.length > 0 ? "56px" : "0px"
    );
    return () => {
      document.documentElement.style.setProperty("--scroll-top-extra-offset", "0px");
    };
  }, [openProjectIds.length]);

  const handleProjectOpenChange = (projectId: string, open: boolean) => {
    setOpenProjectIds((prev) => {
      if (open) {
        return prev.includes(projectId) ? prev : [...prev, projectId];
      }
      return prev.filter((id) => id !== projectId);
    });
  };

  const syncProjectTab = (projectId: string, tabs: LightboxSectionTab[], imageIndex: number) => {
    const matchedTab = tabs.find(
      (tab) => imageIndex >= tab.startIndex && imageIndex <= tab.endIndex
    );
    if (!matchedTab) return;
    setActiveTabByProject((prev) =>
      prev[projectId] === matchedTab.id ? prev : { ...prev, [projectId]: matchedTab.id }
    );
  };

  const handleOpenLightbox = (project: StickyProject, clickedImage: GalleryImage) => {
    const { images, tabs } = getProjectGalleryData(project);
    const matchedIndex = images.findIndex(
      (img) => img.id === clickedImage.id || img.src === clickedImage.src
    );
    const nextIndex = matchedIndex >= 0 ? matchedIndex : 0;
    syncProjectTab(project.id, tabs, nextIndex);
    setLightboxState({
      projectId: project.id,
      index: nextIndex,
    });
  };

  const activeLightboxProject = lightboxState
    ? (stickyProjects.find((p) => p.id === lightboxState.projectId) ?? null)
    : null;
  const activeLightboxGallery = activeLightboxProject
    ? getProjectGalleryData(activeLightboxProject)
    : null;

  const handleLightboxNavigate = (nextIndex: number) => {
    if (!activeLightboxProject || !activeLightboxGallery) return;
    syncProjectTab(activeLightboxProject.id, activeLightboxGallery.tabs, nextIndex);
    setLightboxState((prev) => (prev ? { ...prev, index: nextIndex } : null));
  };

  return (
    <section
      id="proyectos"
      className="mx-auto max-w-[1520px] border-t border-hairline px-4 py-10 sm:px-8 sm:py-20 lg:py-24"
    >
      <div className="mb-6 sm:mb-12">
        <span className="font-mono text-xs tracking-wider text-muted">
          {copy.sectionOverline}
        </span>
        <SplitText
          lines={[copy.sectionTitle]}
          as="h2"
          className="mt-1.5 font-serif text-[clamp(26px,6.5vw,52px)] leading-[1.08] font-normal tracking-[-0.02em] text-ink sm:mt-2"
        />
      </div>

      <div className="flex flex-col gap-6 pb-4 sm:gap-10 sm:pb-8 lg:gap-12">
        {stickyProjects.map((project, index) => (
          <StickyProjectCard
            key={project.id}
            project={project}
            index={index}
            total={stickyProjects.length}
            activeTabId={activeTabByProject[project.id] ?? project.tabs[0]?.id ?? ""}
            onSelectTab={(tabId) =>
              setActiveTabByProject((prev) => ({ ...prev, [project.id]: tabId }))
            }
            onOpenLightbox={(image) => handleOpenLightbox(project, image)}
            onOpenChange={handleProjectOpenChange}
          />
        ))}
      </div>

      <Lightbox
        images={activeLightboxGallery?.images}
        currentIndex={lightboxState?.index}
        tabs={activeLightboxGallery?.tabs}
        tabsAriaLabel={
          activeLightboxProject ? copy.tabsAria(activeLightboxProject.title) : undefined
        }
        onNavigate={handleLightboxNavigate}
        onClose={() => setLightboxState(null)}
      />
    </section>
  );
}
