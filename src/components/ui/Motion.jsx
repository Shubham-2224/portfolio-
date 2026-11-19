import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const EASE = [0.16, 1, 0.3, 1];

/** Fade + rise on first scroll into view. */
export function Reveal({ children, delay = 0, y = 28, className = "", as = "div" }) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/** Masked word-by-word headline reveal. Accepts a string or an array of {text, accent}. */
export function SplitWords({ text, className = "", delay = 0, onView = false }) {
  const segments = typeof text === "string" ? [{ text }] : text;
  const words = segments.flatMap((segment) =>
    segment.text
      .split(" ")
      .filter(Boolean)
      .map((word) => ({ word, accent: segment.accent }))
  );
  const label = segments.map((segment) => segment.text).join(" ");
  const trigger = onView
    ? { whileInView: "show", viewport: { once: true, margin: "0px 0px -80px 0px" } }
    : { animate: "show" };

  return (
    <motion.span
      initial="hidden"
      {...trigger}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.06, delayChildren: delay } },
      }}
      className={className}
    >
      <span className="sr-only">{label}</span>
      {words.map(({ word, accent }, index) => (
        <span
          key={`${word}-${index}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em] mr-[0.24em] last:mr-0"
        >
          <motion.span
            variants={{
              hidden: { y: "110%" },
              show: { y: 0, transition: { duration: 1, ease: EASE } },
            }}
            className={`inline-block ${accent ? "accent-text" : ""}`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Counts up to `value` once visible. */
export function Counter({ value, suffix = "", duration = 1.8 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return undefined;
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduceMotion]);

  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {reduceMotion ? value : display}
        {suffix}
      </span>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
    </span>
  );
}

/** Consistent section header: index, label, headline with optional serif accent, lead. */
export function SectionHeader({ index, label, title, lead, className = "" }) {
  return (
    <header className={`mb-12 md:mb-16 ${className}`}>
      <Reveal className="flex items-center gap-3 mb-6">
        <span className="eyebrow text-signal">{index}</span>
        <span className="h-px w-10 bg-line-strong" />
        <span className="eyebrow">{label}</span>
      </Reveal>
      <h2 className="text-[clamp(2rem,4.4vw,3.5rem)] font-semibold leading-[1.06] max-w-3xl">
        <SplitWords text={title} onView />
      </h2>
      {lead && (
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl text-lg text-muted leading-relaxed">{lead}</p>
        </Reveal>
      )}
    </header>
  );
}
