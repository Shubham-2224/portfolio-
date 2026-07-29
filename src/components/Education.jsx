import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { education } from "../data/portfolio";
import { SectionHeading, FadeIn } from "./ui/SectionHeading";

export default function Education() {
  return (
    <section id="education" className="relative py-28 md:py-36">
      <div className="section-container">
        <SectionHeading
          number="02"
          subtitle="Education"
          title="Academic Foundation"
          description="Strong technical foundation in AI, data science, and computer engineering."
        />

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
          {education.map((item, index) => (
            <FadeIn key={item.degree} delay={index * 0.12}>
              <motion.div
                whileHover={{ y: -6 }}
                className="glass-card rounded-2xl p-8 gradient-border h-full relative overflow-hidden group"
              >
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/15 transition-colors" />

                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 flex items-center justify-center border border-white/8">
                      <GraduationCap className="w-6 h-6 text-accent" />
                    </div>
                    <span className="font-mono text-xs text-slate-500 px-3 py-1.5 rounded-lg bg-white/5">
                      {item.period}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold mb-2 leading-snug">
                    {item.degree}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6">{item.institution}</p>

                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-semibold text-emerald-400">{item.score}</span>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
