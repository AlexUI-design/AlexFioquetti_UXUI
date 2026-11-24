import { ArrowUpRight } from "lucide-react";
import { personalInfo } from "@/data/cv-data";
import { SplitText } from "@/components/ui/SplitText";

const socialLinks = [
  { label: "WHATSAPP", href: personalInfo.whatsappUrl },
  { label: "LINKEDIN", href: personalInfo.linkedinUrl },
  { label: "BEHANCE", href: personalInfo.behanceUrl },
  { label: "LINKTREE", href: personalInfo.linktreeUrl },
] as const;

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contacto"
      className="mx-auto max-w-[1520px] border-t border-hairline px-4 pt-20 pb-12 sm:px-8 sm:pt-32"
    >
      <span className="font-mono text-xs tracking-wider text-muted">
        05 / CONTACTO &amp; CONEXIÓN DIRECTA
      </span>

      <SplitText
        lines={["Construyamos algo con sentido."]}
        as="h2"
        className="mt-4 font-serif text-[clamp(40px,7vw,84px)] leading-[1.04] font-normal tracking-[-0.025em] text-ink"
      />

      <div className="mt-10">
        <a
          href={`mailto:${personalInfo.email}`}
          className="group relative inline-flex items-center gap-2 border-b border-hairline pb-2 font-serif text-[clamp(22px,3.2vw,40px)] font-normal break-all text-ink after:absolute after:right-0 after:-bottom-[1px] after:left-0 after:h-[1.5px] after:origin-left after:scale-x-0 after:bg-ink after:transition-transform after:duration-300 hover:after:scale-x-100 sm:break-normal"
        >
          <span>{personalInfo.email}</span>
          <ArrowUpRight
            className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-6 sm:w-6"
            strokeWidth={1.5}
          />
        </a>
      </div>

      <div className="mt-12 mb-16 flex flex-wrap gap-6 sm:gap-8">
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
