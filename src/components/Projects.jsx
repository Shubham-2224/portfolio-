import { ArrowUpRight } from "lucide-react";
import { personalInfo, projects } from "../data/portfolio";
import GitHubIcon from "./ui/GitHubIcon";
import ProjectVisual from "./ui/ProjectVisual";
import { Reveal, SectionHeader } from "./ui/Motion";

function ProjectCard({ project, index, featured }) {
  return (
    <article
      className={`card spot group h-full ${featured ? "grid grid-cols-1 lg:grid-cols-2" : "flex flex-col"}`}
    >
      <div className={featured ? "min-w-0 border-b border-line lg:border-b-0 lg:border-r" : "min-w-0 border-b border-line"}>
        <ProjectVisual type={project.visual} className={featured ? undefined : "h-80"} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-7 md:p-9">
        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="eyebrow">
            <span className="text-signal">{String(index + 1).padStart(2, "0")}</span>
            <span className="mx-2">/</span>
            {project.kind}
          </p>
          <span
            aria-hidden="true"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line transition-all duration-500 group-hover:rotate-45 group-hover:border-signal group-hover:bg-signal group-hover:text-ink"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        <h3 className={`font-semibold leading-[1.05] ${featured ? "text-3xl md:text-[2.75rem]" : "text-2xl md:text-3xl"}`}>
          {/* Stretched link: the whole card is the click target. */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-3xl focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-signal"
          >
            {project.title}
            <span className="sr-only"> — view source on GitHub (opens in a new tab)</span>
          </a>
        </h3>

        <p className="mt-4 leading-relaxed text-muted">{project.description}</p>

        {project.highlight && (
          <p className="mt-6 flex items-baseline gap-3">
            <span className="metric text-5xl font-semibold text-signal">{project.highlight.value}</span>
            <span className="text-sm text-muted">{project.highlight.label}</span>
          </p>
        )}

        <ul className="mt-auto flex flex-wrap gap-2 pt-7">
          {project.features.map((feature) => (
            <li key={feature} className="chip">
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="work" className="section border-t border-line">
      <div className="shell">
        <SectionHeader
          index="04"
          label="Selected work"
          title={[{ text: "Projects built to solve" }, { text: "real problems.", accent: true }]}
          lead="Computer vision, data automation and generative AI — each one open source on GitHub."
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index === 0 ? 0 : 0.08 * index} className={index === 0 ? "lg:col-span-2" : ""}>
              <ProjectCard project={project} index={index} featured={index === 0} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <a href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <GitHubIcon className="h-4 w-4" />
            More on GitHub
            <ArrowUpRight className="h-4 w-4 text-dim" aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
