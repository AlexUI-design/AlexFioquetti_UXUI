import { experienceList } from "@/data/cv-data";
import { SplitText } from "@/components/ui/SplitText";

export function ExperienceSection() {
  return (
    <section
      id="experiencia"
      className="mx-auto max-w-[1520px] border-t border-hairline px-4 py-16 sm:px-8 sm:py-24"
    >
      <div className="mb-12">
        <span className="font-mono text-xs tracking-wider text-muted">
          03 / TRAYECTORIA PROFESIONAL
        </span>
        <SplitText
          lines={["Experiencia"]}
          as="h2"
          className="mt-2 font-serif text-[clamp(32px,4.5vw,52px)] leading-[1.08] font-normal tracking-[-0.02em] text-ink"
        />
        <p className="mt-2 font-sans text-[15px] text-muted">
          Experiencia en squads ágiles, consultoría independiente y operaciones de alto ritmo.
        </p>
      </div>

      <div>
        {experienceList.map((entry, index) => {
          const isLast = index === experienceList.length - 1;
          return (
            <div
              key={entry.id}
              className={`group grid grid-cols-1 gap-4 border-t border-hairline px-2 py-8 transition-colors duration-200 hover:bg-ink/[0.02] md:grid-cols-12 md:gap-8 md:px-4 ${
                isLast ? "border-b" : ""
              }`}
            >
              <div className="md:col-span-3">
                <span className="font-mono text-xs tracking-wider text-muted">
                  {entry.period}
                </span>
                <p className="mt-1.5 font-mono text-[11px] text-muted">{entry.subtitle}</p>
              </div>

              <div className="md:col-span-4">
                <p className="font-sans text-sm font-medium text-ink">{entry.company}</p>
                <h3 className="mt-1 font-serif text-2xl leading-snug font-normal text-ink transition-transform duration-200 group-hover:translate-x-1">
                  {entry.role}
                </h3>
              </div>

              <div className="md:col-span-5">
                <p className="font-sans text-[15px] leading-relaxed text-body">
                  {entry.description}
                </p>
                <p className="mt-4 font-mono text-[11px] tracking-wider text-muted">
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
