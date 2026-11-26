"use client";

import { ArrowUpRight } from "lucide-react";
import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { getLocalizedCvData } from "@/data/cv-data-en";
import { getUiCopy } from "@/data/ui-copy";

export function FooterSection() {
  const { locale } = useAppPreferences();
  const { personalInfo } = getLocalizedCvData(locale);
  const copy = getUiCopy(locale).footer;
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { label: "WHATSAPP", href: personalInfo.whatsappUrl },
    { label: "LINKEDIN", href: personalInfo.linkedinUrl },
    { label: "BEHANCE", href: personalInfo.behanceUrl },
    { label: "LINKTREE", href: personalInfo.linktreeUrl },
  ] as const;

  return (
    <footer
      id="contacto"
      className="mx-auto max-w-[1520px] border-t border-hairline px-4 pt-12 pb-8 sm:px-8 sm:pt-24 sm:pb-12"
    >
      <span className="font-mono text-xs tracking-wider text-muted">{copy.overline}</span>

      <div className="mt-4 sm:mt-6">
        <a
          href={`mailto:${personalInfo.email}`}
          className="group relative inline-flex items-center gap-2 border-b border-hairline pb-2 font-serif text-[clamp(20px,3.2vw,40px)] font-normal break-all text-ink after:absolute after:right-0 after:-bottom-[1px] after:left-0 after:h-[1.5px] after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 hover:after:scale-x-100 sm:break-normal"
        >
          <span>{personalInfo.email}</span>
          <ArrowUpRight
            className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-6 sm:w-6"
            strokeWidth={1.5}
          />
        </a>
      </div>

      <div className="mt-8 mb-10 flex flex-wrap gap-5 sm:mt-12 sm:mb-16 sm:gap-8">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1 font-mono text-xs tracking-wider text-muted transition-colors duration-150 hover:text-ink"
          >
            <span>[ {link.label}</span>
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.5}
            />
            <span>]</span>
          </a>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-6 font-mono text-xs tracking-wider text-muted">
        <span>
          © {currentYear} {personalInfo.fullName} · MENDOZA, AR / 32°53&apos;S 68°51&apos;W
        </span>
        <span>{personalInfo.roleTitle}</span>
      </div>
    </footer>
  );
}
