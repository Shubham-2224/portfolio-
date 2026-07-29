import { motion } from "framer-motion";
import { skills } from "../data/portfolio";
import { SectionHeading, FadeIn } from "./ui/SectionHeading";

const categoryMeta = {
  Programming: { color: "from-blue-600/30 to-blue-900/20", accent: "text-blue-400" },
  "Data Science": { color: "from-emerald-600/30 to-emerald-900/20", accent: "text-emerald-400" },
  "Machine Learning": { color: "from-purple-600/30 to-purple-900/20", accent: "text-purple-400" },
  "Computer Vision": { color: "from-orange-600/30 to-orange-900/20", accent: "text-orange-400" },
  "NLP & Generative AI": { color: "from-cyan-600/30 to-cyan-900/20", accent: "text-cyan-400" },
  MLOps: { color: "from-pink-600/30 to-pink-900/20", accent: "text-pink-400" },
  "Cloud & DevOps": { color: "from-amber-600/30 to-amber-900/20", accent: "text-amber-400" },
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-36">
      <div className="absolute inset-0 section-divider top-0" />

      <div className="section-container">
        <SectionHeading
          number="03"
          subtitle="Skills"
          title="Technical Arsenal"
          description="End-to-end expertise spanning data pipelines, model development, and production deployment."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skillGroup, index) => {
            const meta = categoryMeta[skillGroup.category] || {
              color: "from-primary/30 to-secondary/20",
              accent: "text-primary",
            };

            return (
              <FadeIn key={skillGroup.category} delay={index * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className={`glass-card rounded-2xl p-6 h-full bg-gradient-to-br ${meta.color} relative overflow-hidden group`}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />

                  <div className="relative">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className={`font-display font-bold text-lg ${meta.accent}`}>
                        {skillGroup.category}
                      </h3>
                      <span className="text-[10px] font-mono text-slate-600">
                        {String(skillGroup.items.length).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((item) => (
                        <span
                          key={item}
                          className="px-3 py-1.5 rounded-lg bg-black/25 border border-white/6 text-xs text-slate-300 hover:border-white/15 hover:text-white transition-all"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
