import { motion } from "framer-motion";
import { User, Code2, Brain, Sparkles } from "lucide-react";
import { personalInfo } from "../data/portfolio";
import { SectionHeading, FadeIn } from "./ui/SectionHeading";

const highlights = [
  { icon: Code2, label: "Python Expert", color: "text-blue-400" },
  { icon: Brain, label: "ML & Deep Learning", color: "text-purple-400" },
  { icon: Sparkles, label: "Generative AI", color: "text-cyan-400" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="About Me" title="Who I Am" />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <FadeIn direction="left">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
              <div className="relative glass rounded-3xl p-8 md:p-10 gradient-border">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{personalInfo.name}</h3>
                    <p className="text-slate-400 text-sm">AI Engineer & Developer</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  {highlights.map(({ icon: Icon, label, color }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 text-center"
                    >
                      <Icon className={`w-6 h-6 ${color}`} />
                      <span className="text-xs text-slate-400">{label}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 font-mono text-sm">
                  <div className="flex items-center gap-2 text-slate-500">
                    <span className="text-accent">&gt;</span>
                    <motion.span
                      initial={{ width: 0 }}
                      whileInView={{ width: "auto" }}
                      viewport={{ once: true }}
                      className="overflow-hidden whitespace-nowrap"
                    >
                      initializing_profile...
                    </motion.span>
                  </div>
                  <div className="flex items-center gap-2 text-green-400">
                    <span className="text-accent">&gt;</span>
                    status: ready
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <div className="space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">{personalInfo.about}</p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Machine Learning",
                  "Deep Learning",
                  "NLP & LLMs",
                  "Computer Vision",
                  "Cloud Deployment",
                  "MLOps",
                ].map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg glass"
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent" />
                    <span className="text-slate-300 text-sm font-medium">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
