import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Bot, Check, FileText, Layers, LoaderCircle, ScanText, Server } from "lucide-react";

// The stages mirror the systems described in the Experience section:
// document processing → retrieval → LLM → API on AWS.
const stages = [
  { icon: FileText, name: "Ingest", detail: "PDFs · scans · web data", log: "collecting source documents" },
  { icon: ScanText, name: "OCR & parse", detail: "OpenCV · multilingual OCR", log: "extracting text and layout" },
  { icon: Layers, name: "Embed & retrieve", detail: "LangChain · RAG", log: "indexing chunks for retrieval" },
  { icon: Bot, name: "LLM reasoning", detail: "OpenAI API · prompt engineering", log: "generating structured output" },
  { icon: Server, name: "Serve", detail: "REST API · AWS", log: "response ready for the client" },
];

const STEP_MS = 1500;

/** Animated walkthrough of a document-intelligence pipeline. Illustrative, not live data. */
export default function PipelineConsole() {
  const reduceMotion = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduceMotion) return undefined;
    // One extra tick at the end holds the "all complete" state before looping.
    const timer = setInterval(() => setTick((value) => (value + 1) % (stages.length + 2)), STEP_MS);
    return () => clearInterval(timer);
  }, [reduceMotion]);

  const active = reduceMotion ? stages.length : tick;
  const done = active >= stages.length;
  const progress = Math.min(active, stages.length) / stages.length;

  return (
    <div
      role="img"
      aria-label="Diagram of an AI pipeline: ingest, OCR and parse, embed and retrieve, LLM reasoning, serve."
      className="glass relative overflow-hidden rounded-2xl"
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-2 truncate font-mono text-xs text-dim">document-intelligence / pipeline.py</span>
        <span className={`ml-auto flex items-center gap-1.5 font-mono text-[0.68rem] ${done ? "text-emerald-400" : "text-signal"}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${done ? "bg-emerald-400" : "bg-signal animate-blink"}`} />
          {done ? "complete" : "running"}
        </span>
      </div>

      <ol className="relative px-4 py-4 sm:px-5">
        {stages.map((stage, index) => {
          const state = index < active ? "done" : index === active ? "active" : "pending";
          return (
            <li key={stage.name} className="relative flex items-center gap-3.5 py-2.5">
              {index < stages.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`absolute left-[1.0625rem] top-[2.9rem] h-[calc(100%-2.3rem)] w-px transition-colors duration-500 ${
                    state === "done" ? "bg-signal/70" : "bg-line-strong"
                  }`}
                />
              )}
              <span
                className={`relative grid h-[2.2rem] w-[2.2rem] shrink-0 place-items-center rounded-lg border transition-all duration-500 ${
                  state === "active"
                    ? "border-signal bg-signal/15 text-signal shadow-[0_0_24px_-4px_rgb(139_155_255/0.8)]"
                    : state === "done"
                      ? "border-signal/40 bg-signal/10 text-signal"
                      : "border-line bg-white/[0.02] text-dim"
                }`}
              >
                <stage.icon className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className={`block text-sm font-medium transition-colors duration-500 ${state === "pending" ? "text-muted" : "text-fg"}`}>
                  {stage.name}
                </span>
                <span className="block truncate font-mono text-[0.7rem] text-dim">{stage.detail}</span>
              </span>
              <span className="grid h-5 w-5 shrink-0 place-items-center">
                {state === "done" && <Check className="h-4 w-4 text-emerald-400" />}
                {state === "active" && <LoaderCircle className="h-4 w-4 animate-spin text-signal" />}
                {state === "pending" && <span className="h-1 w-1 rounded-full bg-white/20" />}
              </span>
            </li>
          );
        })}
      </ol>

      <div className="border-t border-line px-4 py-3 sm:px-5">
        <div className="mb-2.5 h-1 overflow-hidden rounded-full bg-white/[0.06]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-signal to-iris transition-[width] duration-700 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <p className="truncate font-mono text-[0.7rem] text-muted">
          <span className="text-signal">›</span> {done ? "pipeline finished — structured data delivered" : `${stages[active].log}…`}
        </p>
      </div>
    </div>
  );
}
