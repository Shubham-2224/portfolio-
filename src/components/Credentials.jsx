import { BadgeCheck, GraduationCap } from "lucide-react";
import { certifications, education } from "../data/portfolio";
import { Reveal, SectionHeader } from "./ui/Motion";

function CredentialList({ icon: Icon, heading, items }) {
  return (
    <div>
      <Reveal className="mb-2 flex items-center gap-3">
        <Icon className="h-5 w-5 text-signal" aria-hidden="true" />
        <h3 className="text-xl font-semibold">{heading}</h3>
      </Reveal>
      <ul>
        {items.map((item, index) => (
          <Reveal as="li" key={item.title} delay={index * 0.08} y={18}>
            <div className="flex items-start justify-between gap-6 border-b border-line py-6">
              <div>
                <p className="text-lg font-semibold leading-snug md:text-xl">{item.title}</p>
                <p className="mt-2 text-muted">{item.place}</p>
                {item.period && <p className="mt-2 font-mono text-xs text-dim">{item.period}</p>}
              </div>
              {item.score && (
                <span className="metric shrink-0 rounded-full border border-signal/40 bg-signal/10 px-3 py-1.5 text-sm font-semibold text-signal">
                  {item.score}
                </span>
              )}
            </div>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

export default function Credentials() {
  return (
    <section id="credentials" className="section border-t border-line">
      <div className="shell">
        <SectionHeader
          index="05"
          label="Credentials"
          title={[{ text: "Formally trained in" }, { text: "AI & data science.", accent: true }]}
        />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <CredentialList icon={GraduationCap} heading="Education" items={education} />
          <CredentialList icon={BadgeCheck} heading="Certifications" items={certifications} />
        </div>
      </div>
    </section>
  );
}
