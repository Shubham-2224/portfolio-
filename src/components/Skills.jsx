import { motion } from "framer-motion";
import { skills } from "../data/portfolio";
import { SectionHeading, FadeIn } from "./ui/SectionHeading";

const categoryColors = {
  Programming: "from-blue-500/20 to-blue-600/10 border-blue-500/30",
  "Data Science": "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30",
  "Machine Learning": "from-purple-500/20 to-purple-600/10 border-purple-500/30",
  "Computer Vision": "from-orange-500/20 to-orange-600/10 border-orange-500/30",
  "NLP & Generative AI": "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30",
  MLOps: "from-pink-500/20 to-pink-600/10 border-pink-500/30",
  "Cloud & DevOps": "from-amber-500/20 to-amber-600/10 border-amber-500/30",
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Skills"
          title="Technical Expertise"
          description="A comprehensive toolkit for building intelligent AI-powered solutions"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skills.map((skillGroup, index) => (
            <FadeIn key={skillGroup.category} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`glass rounded-2xl p-6 h-full bg-gradient-to-br ${
                  categoryColors[skillGroup.category] || "from-primary/20 to-secondary/10 border-primary/30"
                } border hover:shadow-xl hover:shadow-primary/10 transition-shadow duration-300`}
              >
                <h3 className="text-lg font-bold mb-4 gradient-text">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item, i) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 + i * 0.05 }}
                      whileHover={{ scale: 1.1 }}
                      className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-default"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
