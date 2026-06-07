import { motion } from "framer-motion";
import { Briefcase, CheckCircle2 } from "lucide-react";
import { experience } from "../data/portfolio";
import { SectionHeading, FadeIn } from "./ui/SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading subtitle="Experience" title="Professional Journey" />

        <div className="space-y-8">
          {experience.map((job, index) => (
            <FadeIn key={job.role} delay={index * 0.15}>
              <motion.div
                whileHover={{ x: 5 }}
                className="glass rounded-2xl p-6 md:p-8 gradient-border group hover:shadow-xl hover:shadow-secondary/10 transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold">{job.role}</h3>
                      <p className="text-accent font-medium">{job.company}</p>
                    </div>
                  </div>
                  <span className="inline-flex px-4 py-2 rounded-full glass text-sm font-mono text-slate-400 shrink-0">
                    {job.period}
                  </span>
                </div>

                <ul className="grid sm:grid-cols-2 gap-3">
                  {job.achievements.map((achievement, i) => (
                    <motion.li
                      key={achievement}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-3 text-slate-300"
                    >
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-sm leading-relaxed">{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
