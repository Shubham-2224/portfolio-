import { floatingTech } from "../../data/portfolio";
import { useReducedMotion } from "framer-motion";

const techList = [
  ...floatingTech,
  { label: "TensorFlow", color: "#FF6F00" },
  { label: "LangChain", color: "#1C3C3C" },
  { label: "OpenCV", color: "#5C3EE8" },
  { label: "React", color: "#61DAFB" },
];

export default function TechMarquee() {
  const prefersReducedMotion = useReducedMotion();
  const items = [...techList, ...techList];

  return (
    <div className="relative w-full overflow-hidden border-y border-white/5 bg-white/[0.02] py-4">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

      <div className={`flex whitespace-nowrap ${prefersReducedMotion ? "" : "animate-marquee"}`}>
        {items.map((tech, i) => (
          <span
            key={`${tech.label}-${i}`}
            className="inline-flex items-center gap-2 mx-6 text-sm font-medium text-slate-500"
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: tech.color }}
            />
            {tech.label}
          </span>
        ))}
      </div>
    </div>
  );
}
