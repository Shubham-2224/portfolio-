import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { education } from "../data/portfolio";
import { SectionHeading, FadeIn } from "./ui/SectionHeading";

export default function Education() {
  return (
    <section id="education" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading subtitle="Education" title="Academic Journey" />

        <div className="relative">
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

          {education.map((item, index) => (
            <FadeIn key={item.degree} delay={index * 0.2}>
              <div
                className={`relative flex items-start gap-6 mb-12 last:mb-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="hidden md:block md:w-1/2" />

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`relative flex-1 md:w-1/2 ml-14 md:ml-0 ${
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <div className="glass rounded-2xl p-6 md:p-8 gradient-border hover:shadow-lg hover:shadow-primary/10 transition-shadow duration-300">
                    <div
                      className={`flex items-center gap-3 mb-4 ${
                        index % 2 === 0 ? "md:justify-end" : ""
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0">
                        <GraduationCap className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-accent font-mono text-sm">{item.period}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-2">{item.degree}</h3>
                    <p className="text-slate-400 mb-4">{item.institution}</p>

                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium ${
                        index % 2 === 0 ? "md:float-right" : ""
                      }`}
                    >
                      <Award className="w-4 h-4" />
                      {item.score}
                    </div>
                  </div>
                </motion.div>

                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-primary to-accent border-4 border-background z-10" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
