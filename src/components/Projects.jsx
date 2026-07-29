import { motion } from "framer-motion";
import { ExternalLink, Scan, Globe, ImageIcon, ArrowUpRight } from "lucide-react";
import GitHubIcon from "./ui/GitHubIcon";
import { projects } from "../data/portfolio";
import { SectionHeading, FadeIn } from "./ui/SectionHeading";

const iconMap = { scan: Scan, globe: Globe, image: ImageIcon };

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 md:py-36">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

      <div className="section-container relative">
        <SectionHeading
          number="05"
          subtitle="Projects"
          title="Selected Work"
          description="Production-grade AI systems built to solve real business challenges."
        />

        <div className="space-y-8">
          {projects.map((project, index) => {
            const Icon = iconMap[project.icon] || Scan;
            const isEven = index % 2 === 0;

            return (
              <FadeIn key={project.title} delay={index * 0.1}>
                <motion.article
                  whileHover={{ scale: 1.005 }}
                  className="group glass-card rounded-3xl overflow-hidden gradient-border border border-white/5"
                >
                  <div className="grid md:grid-cols-2">
                    <div
                      className={`relative h-64 md:h-auto min-h-[280px] bg-gradient-to-br ${project.gradient} overflow-hidden ${
                        isEven ? "md:order-1" : "md:order-2"
                      }`}
                    >
                      <div className="absolute inset-0 grid-bg opacity-60" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                      <div className="absolute top-6 left-6 font-mono text-6xl font-black text-white/5">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          whileHover={{ rotate: 5, scale: 1.05 }}
                          className="w-24 h-24 rounded-2xl glass-card flex items-center justify-center border border-white/10"
                        >
                          <Icon className="w-12 h-12 text-accent" />
                        </motion.div>
                      </div>
                    </div>

                    <div className={`p-8 md:p-10 flex flex-col justify-center ${isEven ? "md:order-2" : "md:order-1"}`}>
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h3 className="font-display text-2xl md:text-3xl font-bold group-hover:text-accent transition-colors">
                          {project.title}
                        </h3>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 p-2.5 rounded-xl glass border border-white/8 hover:border-primary/40 hover:bg-primary/10 transition-all"
                          aria-label="View on GitHub"
                        >
                          <ArrowUpRight className="w-5 h-5" />
                        </a>
                      </div>

                      <p className="text-slate-400 leading-relaxed mb-6">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {project.features.map((feature) => (
                          <span
                            key={feature}
                            className="px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors group/link w-fit"
                      >
                        <GitHubIcon className="w-4 h-4" />
                        View Source Code
                        <ExternalLink className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                      </a>
                    </div>
                  </div>
                </motion.article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
