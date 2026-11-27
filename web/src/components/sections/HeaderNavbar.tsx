"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Check,
  CircleAlert,
  FileDown,
  LoaderCircle,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide";
import { ArrowUpRight } from "lucide-react";
import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { EditorialMorphIcon } from "@/components/ui/EditorialMorphIcon";
import { getLocalizedCvData } from "@/data/cv-data-en";
import { getUiCopy } from "@/data/ui-copy";
import { EASE_EDITORIAL } from "@/lib/motion";

export function HeaderNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHiddenOnMobile, setIsHiddenOnMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cvStatus, setCvStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const lastScrollYRef = useRef(0);

  const prefersReducedMotion = useReducedMotion();
  const { stop, start, scrollTo } = useSmoothScroll();
  const { theme, toggleTheme, locale, toggleLocale, mounted } = useAppPreferences();

  const { personalInfo } = getLocalizedCvData(locale);
  const copy = getUiCopy(locale).nav;
  const isDark = mounted && theme === "dark";

  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) return;

      const currentY = window.scrollY;
      const delta = currentY - lastScrollYRef.current;

      setIsScrolled(currentY > 20);

      if (currentY <= 48) {
        setIsHiddenOnMobile(false);
      } else if (delta > 8) {
        setIsHiddenOnMobile(true);
      } else if (delta < -8) {
        setIsHiddenOnMobile(false);
      }

      lastScrollYRef.current = currentY;
    };

    lastScrollYRef.current = window.scrollY;
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  useEffect(() => {
    const offset = isHiddenOnMobile && !isMenuOpen ? "0px" : "56px";
    document.documentElement.style.setProperty("--mobile-navbar-offset", offset);
  }, [isHiddenOnMobile, isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    setIsHiddenOnMobile(false);
    stop();
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      start();
    };
  }, [isMenuOpen, stop, start]);

  useEffect(() => {
    if (cvStatus !== "error" && cvStatus !== "success") return;
    const delay = cvStatus === "success" ? 2200 : 2800;
    const timeout = setTimeout(() => setCvStatus("idle"), delay);
    return () => clearTimeout(timeout);
  }, [cvStatus]);

  const handleDownloadCv = async (closeMobileMenu = false) => {
    if (cvStatus === "loading") return;

    setCvStatus("loading");
    try {
      const { generateCvPdf } = await import("@/lib/generate-cv-pdf");
      const pdfBytes = await generateCvPdf(locale);

      // Verify valid %PDF magic header before initiating browser download
      if (
        pdfBytes.byteLength < 100 ||
        pdfBytes[0] !== 0x25 ||
        pdfBytes[1] !== 0x50 ||
        pdfBytes[2] !== 0x44 ||
        pdfBytes[3] !== 0x46
      ) {
        throw new Error("Invalid PDF binary output");
      }

      const safeBytes = new Uint8Array(pdfBytes.byteLength);
      safeBytes.set(pdfBytes);

      const blob = new Blob([safeBytes.buffer], { type: "application/pdf" });
      const objectUrl = URL.createObjectURL(blob);
      const filename =
        locale === "en"
          ? "Alex-Fioquetti-CV-EN.pdf"
          : "Alex-Fioquetti-CV-ES.pdf";

      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = filename;
      link.rel = "noopener";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Keep blob URL alive 60s so Save As dialogs & mobile download managers finish cleanly
      setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
      setCvStatus("success");
      if (closeMobileMenu) {
        setTimeout(() => setIsMenuOpen(false), 850);
      }
    } catch {
      setCvStatus("error");
    }
  };

  const cvButtonLabel =
    cvStatus === "loading"
      ? copy.downloadingCv
      : cvStatus === "success"
        ? copy.cvDownloaded
        : cvStatus === "error"
          ? copy.cvError
          : copy.downloadCv;

  const cvButtonIcon =
    cvStatus === "loading"
      ? LoaderCircle
      : cvStatus === "success"
        ? Check
        : cvStatus === "error"
          ? CircleAlert
          : FileDown;

  const handleMobileNavClick = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setIsMenuOpen(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollTo(href, {
          offset: -60,
          duration: prefersReducedMotion ? 0 : 0.75,
          immediate: Boolean(prefersReducedMotion),
          force: true,
        });
      });
    });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 will-change-transform ${
          isHiddenOnMobile && !isMenuOpen ? "-translate-y-full md:translate-y-0" : "translate-y-0"
        } ${
          isScrolled || isMenuOpen
            ? "border-b border-hairline bg-paper/95 backdrop-blur-md"
            : "border-b border-transparent bg-paper"
        }`}
      >
        <div className="mx-auto flex h-14 max-w-[1520px] items-center justify-between gap-4 px-4 sm:px-8 md:h-18 lg:px-10">
          <div className="flex items-center gap-6">
            <a
              href="#"
              onClick={() => setIsMenuOpen(false)}
              className="flex flex-col transition-opacity hover:opacity-75"
            >
              <span className="font-sans text-sm font-medium tracking-tight text-ink">
                {personalInfo.shortName}
              </span>
              <span className="hidden font-mono text-[10px] tracking-wider text-muted sm:block">
                {personalInfo.roleTitle}
              </span>
            </a>

            <div
              className="hidden items-center font-mono text-[11px] tracking-wider text-muted tabular-nums 2xl:flex"
              aria-label={copy.locationAriaLabel}
            >
              <span>MENDOZA, AR / 32°53&apos;S 68°51&apos;W</span>
            </div>
          </div>

          <nav aria-label={copy.ariaLabel} className="hidden items-center gap-5 lg:flex">
            {copy.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap font-mono text-[11px] tracking-wider text-muted transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop inline controls */}
          <div className="hidden items-center gap-2 lg:flex xl:gap-2.5">
            <button
              type="button"
              onClick={toggleLocale}
              aria-label={copy.switchLanguageAria}
              className="inline-flex h-8 items-center gap-1 rounded-[2px] border border-hairline px-2.5 font-mono text-[11px] tracking-wider text-muted transition-colors hover:border-ink hover:text-ink"
            >
              <span className={locale === "es" ? "font-semibold text-ink" : "text-muted"}>ES</span>
              <span aria-hidden="true" className="text-hairline">
                /
              </span>
              <span className={locale === "en" ? "font-semibold text-ink" : "text-muted"}>EN</span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? copy.switchToLight : copy.switchToDark}
              title={isDark ? copy.switchToLight : copy.switchToDark}
              className="inline-flex h-8 w-8 items-center justify-center rounded-[2px] border border-hairline text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              <EditorialMorphIcon icon={isDark ? Moon : Sun} size={14} strokeWidth={1.65} />
            </button>

            <button
              type="button"
              onClick={() => handleDownloadCv(false)}
              disabled={cvStatus === "loading"}
              aria-busy={cvStatus === "loading"}
              aria-live="polite"
              className="inline-flex h-8 items-center gap-1.5 rounded-[2px] border border-hairline px-3 font-mono text-[11px] tracking-wider text-ink transition-all hover:border-ink hover:bg-ink hover:text-paper disabled:cursor-wait disabled:opacity-70"
            >
              <EditorialMorphIcon
                icon={cvButtonIcon}
                size={14}
                strokeWidth={1.55}
                className={cvStatus === "loading" ? "shrink-0 animate-spin" : "shrink-0"}
              />
              <span>{cvButtonLabel}</span>
            </button>

            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex h-8 items-center justify-center gap-1 rounded-[2px] bg-ink px-3.5 font-mono text-[11px] font-medium tracking-wider text-paper transition-opacity duration-150 hover:opacity-85"
            >
              <span>{copy.letsTalk}</span>
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </a>
          </div>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={isMenuOpen ? copy.closeMenu : copy.openMenu}
            className="inline-flex h-9 w-9 items-center justify-center rounded-[2px] border border-hairline bg-paper text-ink transition-colors hover:border-ink lg:hidden"
          >
            <EditorialMorphIcon icon={isMenuOpen ? X : Menu} size={16} strokeWidth={1.75} />
          </button>
        </div>
      </header>

      {/* Mobile hamburger drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.2 }}
            onClick={() => setIsMenuOpen(false)}
            className="fixed inset-x-0 top-14 bottom-0 z-40 bg-scrim backdrop-blur-xs md:top-18 lg:hidden"
          >
            <motion.div
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label={copy.menuLabel}
              data-lenis-prevent
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: prefersReducedMotion ? 0.1 : 0.24, ease: EASE_EDITORIAL }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-full overflow-y-auto overscroll-contain border-b border-hairline bg-paper px-4 pt-4 pb-6 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.32)] sm:px-8"
            >
              <nav aria-label={copy.ariaLabel} className="divide-y divide-hairline">
                {copy.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(event) => handleMobileNavClick(event, item.href)}
                    className="flex items-center justify-between py-3.5 font-mono text-xs tracking-wider text-ink transition-colors hover:text-muted"
                  >
                    <span>{item.mobileLabel}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted" strokeWidth={1.5} />
                  </a>
                ))}
              </nav>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-hairline pt-4">
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={isDark ? copy.switchToLight : copy.switchToDark}
                  className="flex items-center justify-between rounded-[2px] border border-hairline bg-card-stage px-3.5 py-2.5 text-left transition-colors hover:border-ink"
                >
                  <div className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-muted">
                      {copy.themeLabel}
                    </span>
                    <span className="mt-0.5 block font-mono text-xs font-medium text-ink">
                      {isDark ? copy.darkName : copy.lightName}
                    </span>
                  </div>
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[2px] border border-hairline bg-paper text-ink">
                    <EditorialMorphIcon icon={isDark ? Moon : Sun} size={16} strokeWidth={1.65} />
                  </span>
                </button>

                <button
                  type="button"
                  onClick={toggleLocale}
                  aria-label={copy.switchLanguageAria}
                  className="flex items-center justify-between rounded-[2px] border border-hairline bg-card-stage px-3.5 py-2.5 text-left transition-colors hover:border-ink"
                >
                  <div className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-wider text-muted">
                      {copy.languageLabel}
                    </span>
                    <span className="mt-0.5 flex items-center gap-1 font-mono text-xs tracking-wider">
                      <span className={locale === "es" ? "font-semibold text-ink" : "text-muted"}>
                        ES
                      </span>
                      <span aria-hidden="true" className="text-hairline">
                        /
                      </span>
                      <span className={locale === "en" ? "font-semibold text-ink" : "text-muted"}>
                        EN
                      </span>
                    </span>
                  </div>
                </button>
              </div>

              <div className="mt-4 flex flex-col gap-2.5 border-t border-hairline pt-4">
                <button
                  type="button"
                  onClick={() => handleDownloadCv(true)}
                  disabled={cvStatus === "loading"}
                  aria-busy={cvStatus === "loading"}
                  aria-live="polite"
                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-[2px] border border-hairline bg-paper px-4 font-mono text-xs tracking-wider text-ink transition-colors hover:border-ink disabled:cursor-wait disabled:opacity-70"
                >
                  <EditorialMorphIcon
                    icon={cvButtonIcon}
                    size={14}
                    strokeWidth={1.55}
                    className={cvStatus === "loading" ? "shrink-0 animate-spin" : "shrink-0"}
                  />
                  <span>{cvButtonLabel}</span>
                </button>

                <a
                  href={`mailto:${personalInfo.email}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-[2px] bg-ink px-4 font-mono text-xs font-medium tracking-wider text-paper transition-opacity hover:opacity-90"
                >
                  <span>{copy.letsTalk}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
