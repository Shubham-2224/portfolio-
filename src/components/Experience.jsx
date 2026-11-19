import { experience } from "../data/portfolio";
import { Reveal, SectionHeader } from "./ui/Motion";

// Emphasise the quantified part of each achievement (40%, 10,000+, …).
const NUMBER = /(\d[\d,]*(?:%|\+)+)/;

function Highlighted({ text }) {
  return text.split(NUMBER).map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="font-semibold text-signal">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section border-t border-line">
      <div className="shell">
        <SectionHeader
          index="03"
          label="Experience"
          title={[{ text: "Where the work" }, { text: "has shipped.", accent: true }]}
        />

        <ol>
          {experience.map((job) => (
            <li key={`${job.company}-${job.role}`} className="grid grid-cols-1 gap-6 border-t border-line py-10 md:py-14 lg:grid-cols-12 lg:gap-10">
              <Reveal className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <p className="flex items-center gap-3 font-mono text-sm text-muted">
                    {job.period}
                    {job.current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/40 bg-signal/10 px-2 py-0.5 text-[0.65rem] uppercase tracking-wider text-signal">
                        <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" />
                        Now
                      </span>
                    )}
                  </p>
                  <p className="mt-3 font-display text-xl font-semibold">{job.company}</p>
                  <p className="eyebrow mt-2">{job.track}</p>
                </div>
              </Reveal>

              <div className="lg:col-span-8">
                <Reveal>
                  <h3 className="text-3xl font-semibold md:text-4xl">{job.role}</h3>
                  <p className="mt-3 max-w-2xl text-lg text-muted">{job.summary}</p>
                </Reveal>

                <ul className="mt-8 grid gap-x-8 sm:grid-cols-2">
                  {job.achievements.map((achievement, index) => (
                    <Reveal as="li" key={achievement} delay={index * 0.05} y={14}>
                      <p className="flex gap-3 border-t border-line py-4 text-[0.95rem] leading-relaxed text-fg/85">
                        <span className="font-mono text-xs text-dim pt-1" aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>
                          <Highlighted text={achievement} />
                        </span>
                      </p>
                    </Reveal>
                  ))}
                </ul>

                <Reveal delay={0.1}>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies used">
                    {job.stack.map((tech) => (
                      <li key={tech} className="chip">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
