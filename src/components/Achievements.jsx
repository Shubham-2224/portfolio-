import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { achievements } from "../data/portfolio";
import { SectionHeading, AnimatedCounter, FadeIn } from "./ui/SectionHeading";

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-28 md:py-36">
      <div className="absolute inset-0 section-divider top-0" />

      <div className="section-container">
        <SectionHeading
          number="07"
          subtitle="Achievements"
          title="Impact by Numbers"
        />

        <div className="glass-card rounded-3xl p-8 md:p-12 gradient-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />

          <div className="relative grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-4">
            {achievements.map((item, index) => (
              <FadeIn key={item.label} delay={index * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-center stat-shine rounded-2xl p-4"
                >
                  <div className="font-display text-4xl md:text-5xl font-black gradient-text mb-2">
                    <AnimatedCounter value={item.value} suffix={item.suffix} />
                  </div>
                  <p className="text-xs md:text-sm text-slate-500 font-medium">{item.label}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <div className="relative flex items-center justify-center gap-2 mt-10 pt-8 border-t border-white/5">
            <Trophy className="w-4 h-4 text-amber-400" />
            <p className="text-sm text-slate-500">
              Consistently delivering high-accuracy AI solutions with measurable business impact
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
