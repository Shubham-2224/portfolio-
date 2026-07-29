import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const bootLines = [
  "Loading neural networks...",
  "Initializing TensorFlow...",
  "Connecting OpenAI API...",
  "Deploying portfolio...",
];

export default function LoadingScreen({ onComplete }) {
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading");
  const [bootIndex, setBootIndex] = useState(0);

  useEffect(() => {
    const intervalDelay = prefersReducedMotion ? 24 : 40;
    const progressStep = prefersReducedMotion ? 5 : 2;
    const transitionDelay = prefersReducedMotion ? 250 : 700;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase("transition");
          setTimeout(onComplete, transitionDelay);
          return 100;
        }
        return prev + progressStep;
      });
    }, intervalDelay);

    return () => clearInterval(interval);
  }, [onComplete, prefersReducedMotion]);

  useEffect(() => {
    const timer = setInterval(() => {
      setBootIndex((i) => (i + 1) % bootLines.length);
    }, 600);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#070b14] overflow-hidden"
        >
          <div className="absolute inset-0 grid-bg opacity-30" />
          <motion.div
            className="glow-orb absolute w-[500px] h-[500px] bg-primary/25 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={prefersReducedMotion ? false : { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="relative z-10 w-full max-w-md px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-display font-black text-xl">
                SD
              </div>
              <h1 className="font-display text-2xl font-bold mb-2">
                <span className="gradient-text">Initializing AI Portfolio</span>
              </h1>
              <p className="font-mono text-xs text-slate-500 h-4">
                {bootLines[bootIndex]}
              </p>
            </motion.div>

            <div className="glass-card rounded-2xl p-6">
              <div className="flex justify-between text-xs font-mono text-slate-500 mb-3">
                <span>SYSTEM BOOT</span>
                <span className="text-accent">{progress}%</span>
              </div>
              <div className="h-1.5 bg-black/40 rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="space-y-1 font-mono text-[10px] text-slate-600">
                {["Python", "TensorFlow", "OpenAI", "AWS"].map((tech, i) => (
                  <p key={tech} className={progress > (i + 1) * 22 ? "text-accent/70" : ""}>
                    [{progress > (i + 1) * 22 ? "✓" : "·"}] {tech}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {phase === "transition" && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-background origin-bottom"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
