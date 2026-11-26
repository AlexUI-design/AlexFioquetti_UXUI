"use client";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { SplitText } from "@/components/ui/SplitText";
import { getLocalizedCvData } from "@/data/cv-data-en";
import { getUiCopy } from "@/data/ui-copy";

export function ExperienceSection() {
  const { locale } = useAppPreferences();
  const { experienceList } = getLocalizedCvData(locale);
  const copy = getUiCopy(locale).experience;

  return (
    <section
      id="experiencia"
      className="mx-auto max-w-[1520px] border-t border-hairline px-4 py-10 sm:px-8 sm:py-20 lg:py-24"
    >
      <div className="mb-6 sm:mb-12">
        <span className="font-mono text-xs tracking-wider text-muted">{copy.overline}</span>
        <SplitText
          lines={[copy.title]}
          as="h2"
          className="mt-1.5 font-serif text-[clamp(26px,6.5vw,52px)] leading-[1.08] font-normal tracking-[-0.02em] text-ink sm:mt-2"
        />
        <p className="mt-1.5 font-sans text-[14px] leading-[1.45] text-muted sm:mt-2 sm:text-[15px]">
          {copy.subtitle}
        </p>
      </div>

      <div>
        {experienceList.map((entry, index) => {
          const isLast = index === experienceList.length - 1;
          return (
            <div
              key={entry.id}
              className={`group grid grid-cols-1 gap-2.5 border-t border-hairline px-1 py-5 transition-colors duration-200 hover:bg-ink/[0.04] sm:px-2 sm:py-8 md:grid-cols-12 md:gap-8 md:px-4 ${
                isLast ? "border-b" : ""
              }`}
            >
              <div className="md:col-span-3">
                <span className="font-mono text-xs tracking-wider text-muted">
                  {entry.period}
                </span>
                <p className="mt-1 font-mono text-[11px] text-muted sm:mt-1.5">{entry.subtitle}</p>
              </div>

              <div className="md:col-span-4">
                <p className="font-sans text-sm font-medium text-ink">{entry.company}</p>
                <h3 className="mt-0.5 font-serif text-xl leading-snug font-normal text-ink transition-transform duration-200 group-hover:translate-x-1 sm:mt-1 sm:text-2xl">
                  {entry.role}
                </h3>
              </div>

              <div className="md:col-span-5">
                <p className="font-sans text-[14px] leading-[1.48] text-body sm:text-[15px] sm:leading-relaxed">
                  {entry.description}
                </p>
                <p className="mt-2.5 font-mono text-[11px] tracking-wider text-muted sm:mt-4">
                  {entry.tags.join(" · ")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
