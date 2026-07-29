import { motion } from "framer-motion";
import { BadgeCheck, Award, Shield } from "lucide-react";
import { certifications } from "../data/portfolio";
import { SectionHeading, FadeIn } from "./ui/SectionHeading";

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-28 md:py-36">
      <div className="section-container">
        <SectionHeading
          number="06"
          subtitle="Certifications"
          title="Verified Credentials"
        />

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          {certifications.map((cert, index) => (
            <FadeIn key={cert.title} delay={index * 0.12}>
              <motion.div
                whileHover={{ y: -6 }}
                className="glass-card rounded-2xl p-8 gradient-border relative overflow-hidden group"
              >
                <Shield className="absolute -bottom-4 -right-4 w-32 h-32 text-white/[0.02] group-hover:text-primary/5 transition-colors" />

                <div className="relative flex gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/30 to-primary/20 flex items-center justify-center shrink-0 border border-white/8">
                    <BadgeCheck className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold mb-2">{cert.title}</h3>
                    <p className="text-slate-400 text-sm mb-4">{cert.issuer}</p>
                    {cert.score && (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
                        <Award className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-sm font-semibold text-green-400">{cert.score}</span>
                      </div>
                    )}
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
