import { BrainCircuit, ChartColumn, Cloud, Code, Database, Eye, Sparkles, Workflow } from "lucide-react";
import { skills } from "../data/portfolio";
import { Reveal, SectionHeader } from "./ui/Motion";

const icons = {
  Programming: Code,
  "Data Science": Database,
  "Analytics & BI": ChartColumn,
  "Machine Learning": BrainCircuit,
  "NLP & Generative AI": Sparkles,
  "Computer Vision": Eye,
  MLOps: Workflow,
  "Cloud & Tooling": Cloud,
};

export default function Skills() {
  const total = skills.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <section id="skills" className="section border-t border-line">
      <div className="shell">
        <SectionHeader
          index="02"
          label="Skills"
          title={[{ text: "The full stack, from" }, { text: "raw data to deployed model.", accent: true }]}
          lead={`${total} tools and techniques across ${skills.length} areas — covering analysis, modelling and production deployment.`}
        />

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group, index) => {
            const Icon = icons[group.category] ?? Code;
            return (
              <Reveal as="li" key={group.category} delay={(index % 4) * 0.06} y={20}>
                <div className="card spot group h-full p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-white/[0.03] transition-colors duration-500 group-hover:border-signal/40 group-hover:bg-signal/10">
                      <Icon className="h-[1.15rem] w-[1.15rem] text-signal" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs text-dim">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mb-4 text-lg font-semibold">{group.category}</h3>
                  <ul className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li key={item} className="chip">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
