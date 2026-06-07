import { motion } from "framer-motion";
import { BadgeCheck, Award } from "lucide-react";
import { certifications } from "../data/portfolio";
import { SectionHeading, FadeIn } from "./ui/SectionHeading";

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading subtitle="Certifications" title="Credentials & Certifications" />

        <div className="grid sm:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <FadeIn key={cert.title} delay={index * 0.15}>
              <motion.div
                whileHover={{ scale: 1.03, rotate: 1 }}
                className="glass rounded-2xl p-6 md:p-8 gradient-border relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />

                <div className="relative flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <BadgeCheck className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{cert.title}</h3>
                    <p className="text-slate-400 text-sm mb-3">{cert.issuer}</p>
                    {cert.score && (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 text-sm font-medium">
                        <Award className="w-4 h-4" />
                        {cert.score}
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
