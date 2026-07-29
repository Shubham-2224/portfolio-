import { motion } from "framer-motion";
import { Briefcase, Building2 } from "lucide-react";
import { experience } from "../data/portfolio";
import { SectionHeading, FadeIn } from "./ui/SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 md:py-36">
      <div className="absolute inset-0 section-divider top-0" />

      <div className="section-container">
        <SectionHeading
          number="04"
          subtitle="Experience"
          title="Professional Journey"
          description="Delivering measurable impact through AI development and data-driven insights."
        />

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/30 to-transparent md:-translate-x-px" />

          {experience.map((job, index) => (
            <FadeIn key={job.role} delay={index * 0.15}>
              <div
                className={`relative flex flex-col md:flex-row gap-8 mb-12 last:mb-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="hidden md:block md:w-1/2" />

                <div
                  className={`md:w-1/2 pl-16 md:pl-0 ${
                    index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="glass-card rounded-2xl p-6 md:p-8 gradient-border relative"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono">
                        {job.period}
                      </span>
                    </div>

                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center shrink-0">
                        <Briefcase className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-bold">{job.role}</h3>
                        <p className="text-slate-400 text-sm flex items-center gap-1.5 mt-1">
                          <Building2 className="w-3.5 h-3.5 text-primary" />
                          {job.company}
                        </p>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {job.achievements.map((achievement, i) => (
                        <motion.li
                          key={achievement}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.06 }}
                          className="flex items-start gap-3 text-sm text-slate-400"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary z-10 shadow-lg shadow-primary/30" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
