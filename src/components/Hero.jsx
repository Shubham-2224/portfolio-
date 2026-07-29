import { motion } from "framer-motion";
import { Download, ArrowRight, MapPin, Sparkles } from "lucide-react";
import { personalInfo } from "../data/portfolio";
import TechMarquee from "./ui/TechMarquee";

const stats = [
  { value: "3+", label: "AI Projects" },
  { value: "2+", label: "Years Experience" },
  { value: "90%+", label: "OCR Accuracy" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="flex-1 flex items-center pt-24 pb-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="section-container w-full"
        >
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left content */}
            <div className="lg:col-span-7">
              <motion.div variants={itemVariants} className="mb-8">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass border border-white/8">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                  </span>
                  <span className="text-sm text-slate-300">Open to AI &amp; Data Science roles</span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-6">
                <p className="text-slate-500 font-mono text-sm mb-4 tracking-wide">
                  // {personalInfo.title}
                </p>
                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black tracking-tight leading-[0.95]">
                  <span className="text-white">Shubham</span>
                  <br />
                  <span className="gradient-text">Desai</span>
                </h1>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-xl mb-4 font-medium"
              >
                {personalInfo.tagline}
              </motion.p>

              <motion.p
                variants={itemVariants}
                className="text-sm text-slate-500 mb-8 flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-accent/70" />
                Aurangabad, Maharashtra · Open to remote & onsite roles
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
                <a
                  href="/resume.pdf"
                  download
                  className="btn-primary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
                <a
                  href="#projects"
                  className="btn-secondary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-200"
                >
                  View Projects
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#contact"
                  className="btn-secondary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-200"
                >
                  Contact Me
                </a>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-3 gap-4 max-w-md"
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="glass-card rounded-2xl p-4 stat-shine">
                    <p className="font-display text-2xl md:text-3xl font-bold gradient-text">
                      {stat.value}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right visual */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-5 relative hidden lg:block"
            >
              <div className="relative mx-auto max-w-md">
                <div className="absolute -inset-8 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 rounded-full blur-3xl" />

                <div className="relative glass-card rounded-3xl p-8 gradient-border">
                  <div className="flex justify-center mb-8">
                    <div className="profile-ring">
                      <img
                        src={personalInfo.profileImage}
                        alt={`${personalInfo.name} profile`}
                        className="w-40 h-40 rounded-full object-cover object-center"
                      />
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <h3 className="font-display text-xl font-bold">{personalInfo.name}</h3>
                    <p className="text-sm text-slate-400 mt-1">{personalInfo.title.split("|")[0].trim()}</p>
                  </div>

                  <div className="terminal-window">
                    <div className="terminal-header">
                      <span className="terminal-dot bg-red-500/80" />
                      <span className="terminal-dot bg-yellow-500/80" />
                      <span className="terminal-dot bg-green-500/80" />
                      <span className="ml-2 text-xs text-slate-500 font-mono">ai_engineer.py</span>
                    </div>
                    <div className="p-4 font-mono text-xs space-y-1.5">
                      <p><span className="text-purple-400">class</span> <span className="text-yellow-300">AIEngineer</span>:</p>
                      <p className="pl-4"><span className="text-slate-500">skills</span> = [<span className="text-green-400">"Python"</span>, <span className="text-green-400">"ML"</span>, <span className="text-green-400">"LLMs"</span>]</p>
                      <p className="pl-4"><span className="text-slate-500">focus</span> = <span className="text-green-400">"Generative AI"</span></p>
                      <p className="pl-4"><span className="text-purple-400">def</span> <span className="text-blue-400">build</span>(self):</p>
                      <p className="pl-8"><span className="text-purple-400">return</span> <span className="text-green-400">"intelligent solutions"</span></p>
                      <p className="text-accent mt-2 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Ready to deploy
                      </p>
                    </div>
                  </div>
                </div>
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 glass-card rounded-2xl px-4 py-3 text-xs font-mono text-accent"
                >
                  TensorFlow
                </motion.div>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-2 -left-6 glass-card rounded-2xl px-4 py-3 text-xs font-mono text-secondary"
                >
                  OpenAI API
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <TechMarquee />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono text-slate-600 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/15 flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-accent/80" />
        </motion.div>
      </motion.div>
    </section>
  );
}
