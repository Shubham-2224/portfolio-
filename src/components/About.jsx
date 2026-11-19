import { useEffect, useState } from "react";
import { BrainCircuit, Briefcase, ChartColumn, GraduationCap, MapPin } from "lucide-react";
import { disciplines, education, experience, personalInfo } from "../data/portfolio";
import { Reveal, SectionHeader } from "./ui/Motion";

const disciplineIcons = { ai: BrainCircuit, data: ChartColumn };

function LocalTime() {
  const format = () =>
    new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: personalInfo.timeZone,
    }).format(new Date());
  const [time, setTime] = useState(format);

  useEffect(() => {
    const timer = setInterval(() => setTime(format()), 20_000);
    return () => clearInterval(timer);
  }, []);

  return <span className="tabular-nums">{time} IST</span>;
}

export default function About() {
  const current = experience.find((job) => job.current) ?? experience[0];
  const degree = education[0];

  const facts = [
    { icon: Briefcase, label: "Currently", value: current.role, detail: current.company },
    { icon: MapPin, label: "Based in", value: personalInfo.location, detail: personalInfo.workMode },
    { icon: GraduationCap, label: "Education", value: "B.Tech, AI & Data Science", detail: degree.score },
  ];

  return (
    <section id="about" className="section">
      <div className="shell">
        <SectionHeader
          index="01"
          label="About"
          title={[{ text: "Two disciplines," }, { text: "one pipeline.", accent: true }]}
          lead="I work on both sides of the model: the analysis that tells you what is worth building, and the engineering that gets it into production."
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <figure className="card group relative h-full min-h-[24rem]">
              <img
                src={personalInfo.profileImage}
                alt={`Portrait of ${personalInfo.name}`}
                width="800"
                height="800"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-[50%_15%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" aria-hidden="true" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
                <div>
                  <p className="text-lg font-semibold leading-tight">{personalInfo.name}</p>
                  <p className="mt-1 text-sm text-muted">{personalInfo.role}</p>
                </div>
                <p className="font-mono text-[0.68rem] text-muted">
                  <LocalTime />
                </p>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-8">
            <article className="card spot flex h-full flex-col p-7 md:p-10">
              <p className="eyebrow mb-6">Profile</p>
              <p className="text-xl leading-[1.5] tracking-tight text-fg/90 md:text-2xl md:leading-[1.45]">
                {personalInfo.about}
              </p>
              <dl className="mt-auto grid grid-cols-1 gap-6 border-t border-line pt-7 sm:grid-cols-3 max-md:mt-8 md:mt-10">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="eyebrow mb-2 flex items-center gap-2">
                      <fact.icon className="h-3.5 w-3.5 text-signal" aria-hidden="true" />
                      {fact.label}
                    </dt>
                    <dd className="font-semibold leading-snug">{fact.value}</dd>
                    <dd className="mt-1 text-sm text-muted">{fact.detail}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </Reveal>

          {disciplines.map((discipline, index) => {
            const Icon = disciplineIcons[discipline.key];
            return (
              <Reveal key={discipline.key} delay={0.08 * index} className="lg:col-span-6">
                <article className="card spot h-full p-7 md:p-9">
                  <span className="mb-6 grid h-11 w-11 place-items-center rounded-xl border border-signal/30 bg-signal/10">
                    <Icon className="h-5 w-5 text-signal" aria-hidden="true" />
                  </span>
                  <h3 className="text-2xl font-semibold">{discipline.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{discipline.summary}</p>
                  <ul className="mt-6 space-y-3 border-t border-line pt-6">
                    {discipline.points.map((point) => (
                      <li key={point} className="flex gap-3 text-sm text-fg/85">
                        <span className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
