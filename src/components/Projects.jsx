import { motion } from "framer-motion";
import { ExternalLink, Scan, Globe, ImageIcon } from "lucide-react";
import GitHubIcon from "./ui/GitHubIcon";
import { projects } from "../data/portfolio";
import { SectionHeading, FadeIn } from "./ui/SectionHeading";

const iconMap = {
  scan: Scan,
  globe: Globe,
  image: ImageIcon,
};

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Projects"
          title="Featured Work"
          description="AI-powered solutions solving real-world problems"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const Icon = iconMap[project.icon] || Scan;

            return (
              <FadeIn key={project.title} delay={index * 0.15}>
                <motion.article
                  whileHover={{ y: -10 }}
                  className="group relative glass rounded-2xl overflow-hidden h-full flex flex-col gradient-border hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
                >
                  <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 grid-bg opacity-50" />
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring" }}
                    >
                      <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center">
                        <Icon className="w-10 h-10 text-accent" />
                      </div>
                    </motion.div>

                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg glass hover:bg-white/20 transition-colors"
                        aria-label="View on GitHub"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-white transition-colors group/link"
                    >
                      <GitHubIcon className="w-4 h-4" />
                      View on GitHub
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                    </a>
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
