"use client";

import { useAppPreferences } from "@/components/providers/AppPreferencesProvider";
import { SplitText } from "@/components/ui/SplitText";
import { getLocalizedCvData } from "@/data/cv-data-en";
import { getUiCopy } from "@/data/ui-copy";

export function EducationStackSection() {
  const { locale } = useAppPreferences();
  const { educationData, stackCategories } = getLocalizedCvData(locale);
  const copy = getUiCopy(locale).education;

  return (
    <section
      id="formacion"
      className="mx-auto max-w-[1520px] border-t border-hairline px-4 py-10 sm:px-8 sm:py-20 lg:py-24"
    >
      <div className="mb-6 sm:mb-12">
        <span className="font-mono text-xs tracking-wider text-muted">{copy.overline}</span>
        <SplitText
          lines={[copy.title]}
          as="h2"
          className="mt-1.5 font-serif text-[clamp(26px,6.5vw,52px)] leading-[1.08] font-normal tracking-[-0.02em] text-ink sm:mt-2"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10 lg:gap-14">
        {educationData.map((edu) => (
          <div key={edu.id} className="border-t border-hairline pt-4 sm:pt-6">
            <div className="flex flex-wrap items-baseline justify-between gap-1.5 sm:gap-2">
              <span className="font-mono text-xs tracking-wider text-muted">{edu.period}</span>
              <span className="font-mono text-[11px] tracking-wider text-muted">
                {edu.highlight}
              </span>
            </div>

            <h3 className="mt-2 font-serif text-xl leading-snug font-normal text-ink sm:mt-3 sm:text-[28px]">
              {edu.institution}
            </h3>
            <p className="mt-1 font-sans text-sm font-medium text-body">{edu.degree}</p>

            <ul className="mt-3 space-y-1.5 border-t border-hairline/70 pt-3 font-sans text-[13.5px] leading-[1.45] text-body sm:mt-4 sm:space-y-2 sm:pt-4 sm:text-sm sm:leading-relaxed">
              {edu.details.map((detail) => (
                <li key={detail} className="flex items-start gap-2.5">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted"
                  />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 border-t border-hairline pt-6 sm:mt-16 sm:grid-cols-2 sm:gap-8 sm:pt-10 lg:grid-cols-4">
        {stackCategories.map((category) => (
          <div key={category.id}>
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted">
              {category.title}
            </h3>
            <ul className="mt-2.5 space-y-1 font-sans text-sm text-body sm:mt-4 sm:space-y-1.5">
              {category.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
