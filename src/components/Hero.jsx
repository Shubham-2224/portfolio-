import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, FileDown } from "lucide-react";
import { metrics, personalInfo } from "../data/portfolio";
import NeuralField from "./ui/NeuralField";
import PipelineConsole from "./ui/PipelineConsole";
import TechMarquee from "./ui/TechMarquee";
import GitHubIcon from "./ui/GitHubIcon";
import { Counter, SplitWords } from "./ui/Motion";

const EASE = [0.16, 1, 0.3, 1];

const rise = (delay) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-svh flex-col overflow-hidden">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="aurora absolute inset-x-0 top-0 h-[44rem]" />
        <div className="absolute inset-0 grid-lines fade-mask opacity-60" />
        <NeuralField className="absolute inset-0 h-full w-full fade-mask" />
      </div>

      <div className="shell flex flex-1 flex-col justify-center pt-32 pb-14 md:pt-40">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <motion.div
              {...rise(0.05)}
              className="mb-8 inline-flex max-w-full items-center gap-3 rounded-full border border-line bg-white/[0.04] py-1.5 pl-1.5 pr-4 backdrop-blur"
            >
              <img
                src={personalInfo.profileImageSmall}
                alt=""
                width="32"
                height="32"
                className="h-8 w-8 shrink-0 rounded-full object-cover object-top"
              />
              <span className="hidden whitespace-nowrap text-sm font-medium sm:inline">{personalInfo.name}</span>
              <span className="hidden h-4 w-px shrink-0 bg-line-strong sm:block" aria-hidden="true" />
              <span className="flex min-w-0 items-center gap-2 text-sm text-muted">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:hidden" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="truncate">{personalInfo.availability}</span>
              </span>
            </motion.div>

            <h1 className="text-[clamp(2.4rem,4.7vw,4.1rem)] font-semibold leading-[1.06] tracking-[-0.04em]">
              <SplitWords
                delay={0.15}
                text={[
                  { text: "AI Engineer building" },
                  { text: "production LLM systems", accent: true },
                  { text: "that turn data into decisions." },
                ]}
              />
            </h1>

            <motion.p {...rise(0.6)} className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
              I’m {personalInfo.firstName} — an {personalInfo.role}. I design LLM applications and
              document-intelligence pipelines, deploy them on AWS, and build the dashboards that
              show whether they work.
            </motion.p>

            <motion.div {...rise(0.75)} className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#work" className="btn btn-primary">
                View my work
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="#contact" className="btn btn-ghost">
                Get in touch
              </a>
              {personalInfo.resumeUrl && (
                <a href={personalInfo.resumeUrl} download className="btn btn-ghost">
                  <FileDown className="h-4 w-4" aria-hidden="true" />
                  Résumé
                </a>
              )}
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <GitHubIcon className="h-4 w-4" />
                GitHub
                <ArrowUpRight className="h-3.5 w-3.5 text-dim" aria-hidden="true" />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
            className="relative lg:col-span-5"
          >
            <div
              className="absolute -inset-8 -z-10 rounded-[3rem] bg-gradient-to-br from-signal/25 via-transparent to-iris/20 blur-3xl"
              aria-hidden="true"
            />
            <PipelineConsole />
          </motion.div>
        </div>

        <motion.dl
          {...rise(0.95)}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:mt-20 lg:grid-cols-4"
        >
          {metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col-reverse justify-end bg-ink/90 p-5 sm:p-6">
              <dt className="mt-2 text-sm text-muted">
                {metric.label}
                <span className="mt-1 block font-mono text-[0.68rem] text-dim">{metric.source}</span>
              </dt>
              <dd className="metric text-4xl font-semibold sm:text-5xl">
                <Counter value={metric.value} suffix={metric.suffix} />
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <TechMarquee />
    </section>
  );
}
