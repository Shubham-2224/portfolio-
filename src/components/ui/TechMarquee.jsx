import { marqueeTech } from "../../data/portfolio";

export default function TechMarquee() {
  // Rendered twice so the -50% translate loops seamlessly; the copy is hidden from assistive tech.
  return (
    <div className="marquee edge-fade-x overflow-hidden border-y border-line py-5">
      <div className="marquee-track flex w-max animate-marquee motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
            {marqueeTech.map((tech) => (
              <li key={tech} className="flex items-center gap-8 pr-8">
                <span className="text-lg font-medium tracking-tight text-muted md:text-xl">
                  {tech}
                </span>
                <span className="text-signal/70 text-xs" aria-hidden="true">
                  ✦
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
