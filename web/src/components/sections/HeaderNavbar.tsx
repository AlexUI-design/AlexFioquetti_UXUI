"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, FileDown } from "lucide-react";
import { personalInfo } from "@/data/cv-data";
import { StatusBadge } from "@/components/ui/StatusBadge";

const navItems = [
  { label: "[ 01 TRABAJO ]", href: "#proyectos" },
  { label: "[ 02 CASO ]", href: "#portfolio" },
  { label: "[ 03 TRAYECTORIA ]", href: "#experiencia" },
  { label: "[ 04 CONTACTO ]", href: "#contacto" },
] as const;

export function HeaderNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mendozaTime, setMendozaTime] = useState<string>("");
  const [cvNotice, setCvNotice] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const formatTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("es-AR", {
          timeZone: personalInfo.timezone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(now);
        setMendozaTime(formatted);
      } catch {
        setMendozaTime("");
      }
    };

    formatTime();
    const interval = setInterval(formatTime, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!cvNotice) return;
    const timeout = setTimeout(() => setCvNotice(false), 2600);
    return () => clearTimeout(timeout);
  }, [cvNotice]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "border-b border-hairline bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent bg-paper"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-[1520px] items-center justify-between gap-4 px-6 sm:px-10">
        <div className="flex items-center gap-6">
          <a href="#" className="flex flex-col transition-opacity hover:opacity-75">
            <span className="font-sans text-sm font-medium tracking-tight text-ink">
              {personalInfo.shortName}
            </span>
            <span className="hidden font-mono text-[10px] tracking-wider text-muted sm:block">
              {personalInfo.roleTitle}
            </span>
          </a>

          <div
            className="hidden items-center font-mono text-[11px] tracking-wider text-muted tabular-nums 2xl:flex"
            aria-label="Ubicación y hora local de Mendoza"
          >
            <span>MENDOZA, AR / 32°53&apos;S 68°51&apos;W</span>
            {mendozaTime && <span>&nbsp;· {mendozaTime}</span>}
          </div>
        </div>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-5 lg:flex"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap font-mono text-[11px] tracking-wider text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <StatusBadge label="DISPONIBLE PARA PROYECTOS" />
            {mendozaTime && (
              <span
                aria-label="Hora local de Mendoza"
                className="font-mono text-[11px] text-muted tabular-nums lg:hidden"
              >
                {mendozaTime}
              </span>
            )}
          </div>

          {personalInfo.cvPdfUrl ? (
            <a
              href={personalInfo.cvPdfUrl}
              download
              className="hidden items-center gap-1.5 rounded-[2px] border border-hairline px-3 py-1.5 font-mono text-[11px] tracking-wider text-ink transition-all hover:border-ink hover:bg-ink hover:text-paper sm:inline-flex"
            >
              <FileDown className="h-3.5 w-3.5" strokeWidth={1.5} />
              <span>Descargar CV</span>
            </a>
          ) : (
            <button
              type="button"
              onClick={() => setCvNotice(true)}
              aria-live="polite"
              className="hidden items-center gap-1.5 rounded-[2px] border border-hairline px-3 py-1.5 font-mono text-[11px] tracking-wider text-ink transition-all hover:border-ink hover:bg-ink hover:text-paper sm:inline-flex"
            >
              <FileDown className="h-3.5 w-3.5" strokeWidth={1.5} />
              <span>{cvNotice ? "PDF próximamente" : "Descargar CV"}</span>
            </button>
          )}

          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center justify-center gap-1 rounded-[2px] bg-ink px-3.5 py-1.5 font-mono text-[11px] tracking-wider text-paper transition-opacity duration-150 hover:opacity-85"
          >
            <span>Hablemos</span>
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </header>
  );
}
