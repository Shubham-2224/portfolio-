import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export function SectionHeading({ subtitle, title, description, number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-16 md:mb-20"
    >
      <div className="flex items-center gap-4 mb-6">
        {number && (
          <span className="font-mono text-xs text-primary/60 tracking-widest">
            {number}
          </span>
        )}
        <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-primary/60 to-transparent" />
        <span className="text-accent/90 font-mono text-xs tracking-[0.2em] uppercase">
          {subtitle}
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-primary/30 to-transparent" />
      </div>

      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
        <span className="gradient-text-warm">{title}</span>
      </h2>

      {description && (
        <p className="text-slate-400 max-w-2xl text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}

export function AnimatedCounter({ value, suffix = "", duration = 2 }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const end = value;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function FadeIn({ children, delay = 0, className = "", direction = "up" }) {
  const directions = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
