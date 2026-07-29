import { motion, useReducedMotion } from "framer-motion";

export default function AmbientBackground() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 dot-bg opacity-30" />

      <motion.div
        className="glow-orb absolute -top-32 -left-32 w-[520px] h-[520px] bg-primary/16"
        animate={prefersReducedMotion ? false : { x: [0, 40, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="glow-orb absolute top-1/3 -right-48 w-[430px] h-[430px] bg-secondary/12"
        animate={prefersReducedMotion ? false : { x: [0, -30, 0], y: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="glow-orb absolute -bottom-32 left-1/3 w-[380px] h-[380px] bg-accent/10"
        animate={prefersReducedMotion ? false : { scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
