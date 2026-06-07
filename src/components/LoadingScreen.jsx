import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase("transition");
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background overflow-hidden"
        >
          <div className="absolute inset-0 grid-bg opacity-50" />

          <motion.div
            className="absolute w-96 h-96 rounded-full bg-primary/20 blur-[120px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-64 h-64 rounded-full bg-secondary/20 blur-[100px] -translate-x-32"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />

          <div className="relative z-10 flex flex-col items-center gap-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative"
            >
              <div className="w-20 h-20 rounded-2xl glass gradient-border flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 border-2 border-transparent border-t-accent border-r-primary rounded-full"
                />
              </div>
              <motion.div
                className="absolute -inset-4 border border-primary/30 rounded-3xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <h1 className="font-mono text-xl md:text-2xl font-semibold mb-2">
                <span className="gradient-text">Initializing AI Portfolio</span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  ...
                </motion.span>
              </h1>
              <p className="text-slate-500 font-mono text-sm">
                Loading neural networks &amp; datasets
              </p>
            </motion.div>

            <div className="w-64 md:w-80">
              <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <p className="text-right text-xs text-slate-500 font-mono mt-2">{progress}%</p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-3 font-mono text-xs text-slate-600"
            >
              {["Python", "TensorFlow", "OpenAI", "AWS"].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: progress > (i + 1) * 20 ? 1 : 0.3 }}
                  className={progress > (i + 1) * 20 ? "text-accent" : ""}
                >
                  [{tech}]
                </motion.span>
              ))}
            </motion.div>
          </div>

          {phase === "transition" && (
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-background origin-top"
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
