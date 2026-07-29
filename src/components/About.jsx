import { motion } from "framer-motion";
import { Code2, Brain, Sparkles, Database, Cloud, Bot } from "lucide-react";
import { personalInfo } from "../data/portfolio";
import { SectionHeading, FadeIn } from "./ui/SectionHeading";

const expertise = [
  { icon: Code2, label: "Python Development", desc: "Scalable backend & automation" },
  { icon: Brain, label: "Machine Learning", desc: "CNN, RNN, Transfer Learning" },
  { icon: Sparkles, label: "Generative AI", desc: "LLMs, RAG, Prompt Engineering" },
  { icon: Database, label: "Data Science", desc: "EDA, visualization & insights" },
  { icon: Bot, label: "NLP & Computer Vision", desc: "BERT, OpenCV, YOLOv8" },
  { icon: Cloud, label: "Cloud & MLOps", desc: "AWS, Docker, CI/CD" },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="section-container">
        <SectionHeading
          number="01"
          subtitle="About Me"
          title="Engineering Intelligence at Scale"
          description="Transforming complex data into actionable AI-powered solutions for real-world impact."
        />

        <div className="grid lg:grid-cols-5 gap-8">
          <FadeIn direction="left" className="lg:col-span-2">
            <div className="glass-card rounded-3xl p-8 h-full gradient-border relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-4 mb-8">
                  <div className="profile-ring">
                    <img
                      src={personalInfo.profileImage}
                      alt={`${personalInfo.name} profile`}
                      className="w-20 h-20 rounded-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold">{personalInfo.name}</h3>
                    <p className="text-sm text-accent font-mono">{personalInfo.title}</p>
                  </div>
                </div>

                <p className="text-slate-400 leading-relaxed text-sm mb-8">
                  {personalInfo.about}
                </p>

                <div className="terminal-window">
                  <div className="terminal-header">
                    <span className="terminal-dot bg-red-500/80" />
                    <span className="terminal-dot bg-yellow-500/80" />
                    <span className="terminal-dot bg-green-500/80" />
                    <span className="ml-2 text-xs text-slate-500 font-mono">profile.sh</span>
                  </div>
                  <div className="p-4 font-mono text-xs space-y-1 text-slate-400">
                    <p><span className="text-accent">$</span> whoami</p>
                    <p className="text-white pl-2">shubham_desai — AI Engineer</p>
                    <p><span className="text-accent">$</span> cat expertise.txt</p>
                    <p className="text-green-400 pl-2">Python | ML | GenAI | AWS</p>
                    <p><span className="text-accent">$</span> status</p>
                    <p className="text-emerald-400 pl-2">● Available for opportunities</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.15} className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 gap-4">
              {expertise.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="glass-card rounded-2xl p-5 group cursor-default"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h4 className="font-display font-semibold text-white mb-1">{item.label}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
