import { motion } from "framer-motion";
import { achievements } from "../data/portfolio";
import { SectionHeading, AnimatedCounter, FadeIn } from "./ui/SectionHeading";

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Achievements" title="Impact & Milestones" />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {achievements.map((item, index) => (
            <FadeIn key={item.label} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -5, scale: 1.05 }}
                className="glass rounded-2xl p-6 text-center gradient-border group hover:shadow-lg hover:shadow-accent/10 transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold gradient-text mb-2">
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                </div>
                <p className="text-slate-400 text-sm font-medium group-hover:text-slate-300 transition-colors">
                  {item.label}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
