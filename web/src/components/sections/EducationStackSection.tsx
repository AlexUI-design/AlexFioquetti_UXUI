import { educationData, stackCategories } from "@/data/cv-data";
import { SplitText } from "@/components/ui/SplitText";

export function EducationStackSection() {
  return (
    <section
      id="formacion"
      className="mx-auto max-w-[1520px] border-t border-hairline px-4 py-16 sm:px-8 sm:py-24"
    >
      <div className="mb-12">
        <span className="font-mono text-xs tracking-wider text-muted">
          04 / FORMACIÓN ACADÉMICA &amp; STACK TÉCNICO
        </span>
        <SplitText
          lines={["Formación & Herramientas"]}
          as="h2"
          className="mt-2 font-serif text-[clamp(32px,4.5vw,52px)] leading-[1.08] font-normal tracking-[-0.02em] text-ink"
        />
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-14">
        {educationData.map((edu) => (
          <div key={edu.id} className="border-t border-hairline pt-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="font-mono text-xs tracking-wider text-muted">{edu.period}</span>
              <span className="font-mono text-[11px] tracking-wider text-muted">
                {edu.highlight}
              </span>
            </div>

            <h3 className="mt-3 font-serif text-2xl leading-snug font-normal text-ink sm:text-[28px]">
              {edu.institution}
            </h3>
            <p className="mt-1 font-sans text-sm font-medium text-body">{edu.degree}</p>

            <ul className="mt-4 space-y-2 border-t border-hairline/70 pt-4 font-sans text-sm leading-relaxed text-body">
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

      <div className="mt-16 grid grid-cols-1 gap-8 border-t border-hairline pt-10 sm:grid-cols-2 lg:grid-cols-4">
        {stackCategories.map((category) => (
          <div key={category.id}>
            <h3 className="font-mono text-xs uppercase tracking-wider text-muted">
              {category.title}
            </h3>
            <ul className="mt-4 space-y-1.5 font-sans text-sm text-body">
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
