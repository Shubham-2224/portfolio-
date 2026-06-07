import { motion } from "framer-motion";
import { Download, FolderOpen, Mail, ChevronDown } from "lucide-react";
import { personalInfo, floatingTech } from "../data/portfolio";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 grid-bg" />

      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[150px]"
        animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[120px]"
        animate={{ scale: [1.2, 1, 1.2], y: [0, -30, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-accent/10 blur-[100px]"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {floatingTech.map((tech, i) => (
        <motion.div
          key={tech.label}
          className="absolute hidden lg:flex items-center justify-center px-4 py-2 rounded-full glass text-xs font-mono font-medium"
          style={{
            top: `${15 + (i * 12) % 70}%`,
            left: `${5 + (i * 17) % 85}%`,
            color: tech.color,
            borderColor: `${tech.color}33`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.05, 1],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          {tech.label}
        </motion.div>
      ))}

      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.line
            key={i}
            x1={`${10 + i * 15}%`}
            y1="0"
            x2={`${30 + i * 10}%`}
            y2="100%"
            stroke="url(#gradient)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, delay: i * 0.2 }}
          />
        ))}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0" />
            <stop offset="50%" stopColor="#7C3AED" stopOpacity="1" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-accent font-mono">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6"
        >
          <span className="block text-white">Shubham</span>
          <span className="block gradient-text">Desai</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl text-slate-400 font-medium mb-4"
        >
          {personalInfo.title}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-slate-500 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          {personalInfo.tagline}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="/resume.pdf"
            download
            className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary font-semibold hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center"
          >
            <Download className="w-5 h-5 group-hover:animate-bounce" />
            Download Resume
          </a>
          <a
            href="#projects"
            className="group flex items-center gap-2 px-8 py-4 rounded-xl glass font-semibold hover:bg-white/10 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <FolderOpen className="w-5 h-5 text-accent" />
            View Projects
          </a>
          <a
            href="#contact"
            className="group flex items-center gap-2 px-8 py-4 rounded-xl glass font-semibold hover:bg-white/10 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <Mail className="w-5 h-5 text-secondary" />
            Contact Me
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 1.5 }, y: { duration: 2, repeat: Infinity } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-accent transition-colors"
        aria-label="Scroll to about"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.a>
    </section>
  );
}
