// Abstract, animated illustrations of how each project works.
// Purely decorative: no real data is shown, values are drawn as redaction bars.

function OcrVisual() {
  const lines = [72, 54, 88, 46, 64, 80, 38];
  const boxed = new Set([0, 2, 5]);
  const fields = ["name", "age", "gender", "house_no"];

  return (
    <div className="flex h-full items-center justify-center gap-4 p-4 sm:gap-8 sm:p-6">
      <div
        className="relative w-32 shrink-0 rounded-xl border border-line-strong bg-white/[0.04] p-4 sm:w-48"
        style={{ "--scan-travel": "168px" }}
      >
        <div className="space-y-3">
          {lines.map((width, index) => (
            <div
              key={index}
              className={`h-3 rounded-sm ${
                boxed.has(index) ? "bg-signal/25 outline outline-1 outline-offset-2 outline-signal" : "bg-white/15"
              }`}
              style={{ width: `${width}%` }}
            />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-2 h-8 animate-scan bg-gradient-to-b from-transparent via-signal/25 to-signal/60 border-b border-signal" />
      </div>

      <svg viewBox="0 0 40 12" className="hidden w-10 shrink-0 text-signal sm:block" fill="none">
        <path d="M0 6h36m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" className="animate-flow" />
      </svg>

      <div className="min-w-0 rounded-xl border border-line bg-ink/70 p-3 sm:p-4 font-mono text-[0.7rem] leading-6 text-muted">
        <p className="text-dim">{"{"}</p>
        {fields.map((field, index) => (
          <p key={field} className="flex items-center gap-2 pl-3">
            <span className="text-signal">{field}</span>
            <span className="text-dim">:</span>
            <span className="h-2 rounded-sm bg-white/25" style={{ width: `${28 + ((index * 17) % 30)}px` }} />
          </p>
        ))}
        <p className="text-dim">{"}"}</p>
      </div>
    </div>
  );
}

function PipelineVisual() {
  const stages = ["Source", "Schedule", "Parse", "Excel"];
  return (
    <div className="flex h-full flex-col justify-center gap-6 p-4 sm:p-6">
      <div className="flex items-center">
        {stages.map((stage, index) => (
          <div key={stage} className="flex min-w-0 flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-line-strong bg-white/[0.04] font-mono text-xs text-signal">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[0.65rem] uppercase tracking-wider text-muted">{stage}</span>
            </div>
            {index < stages.length - 1 && (
              <svg viewBox="0 0 100 2" preserveAspectRatio="none" className="mx-1.5 mb-6 h-0.5 w-0 min-w-0 flex-1 text-signal sm:mx-2">
                <path d="M0 1h100" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="animate-flow" />
              </svg>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-line bg-ink/70 p-3">
        <div className="mb-2 flex items-center justify-between font-mono text-[0.65rem] text-dim">
          <span>results.xlsx</span>
          <span className="flex items-center gap-1.5 text-signal">
            <span className="h-1.5 w-1.5 rounded-full bg-signal animate-blink" />
            LIVE
          </span>
        </div>
        <div className="space-y-1.5">
          {[0, 1, 2].map((row) => (
            <div key={row} className="grid grid-cols-4 gap-1.5">
              {[0, 1, 2, 3].map((cell) => (
                <span
                  key={cell}
                  className={`h-3 rounded-sm ${row === 0 ? "bg-signal/30 animate-blink" : "bg-white/10"}`}
                  style={row === 0 ? { animationDelay: `${cell * 0.2}s` } : undefined}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DiffusionVisual() {
  const cols = 18;
  const rows = 6;
  const cells = Array.from({ length: cols * rows }, (_, index) => {
    const x = index % cols;
    const y = Math.floor(index / cols);
    const t = (x / (cols - 1)) * 0.65 + (y / (rows - 1)) * 0.35;
    return {
      // Resolved "image": a lime → iris gradient.
      color: `color-mix(in oklab, var(--color-signal) ${Math.round((1 - t) * 100)}%, var(--color-iris))`,
      // Deterministic pseudo-noise so render output is stable.
      noise: 18 + ((index * 53) % 47),
      delay: ((index * 29) % 17) / 10,
    };
  });

  return (
    <div className="flex h-full flex-col justify-center gap-4 p-6">
      <p className="w-fit max-w-full truncate rounded-full border border-line bg-ink/70 px-3 py-1.5 font-mono text-[0.7rem] text-muted">
        <span className="text-signal">prompt ›</span> refine → generate → refine
      </p>
      <div
        className="grid gap-1 overflow-hidden rounded-xl"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {cells.map((cell, index) => (
          <span key={index} className="relative aspect-square rounded-[3px]" style={{ background: cell.color }}>
            <span
              className="absolute inset-0 rounded-[3px] animate-denoise"
              style={{ background: `hsl(0 0% ${cell.noise}%)`, animationDelay: `${cell.delay}s` }}
            />
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between font-mono text-[0.65rem] text-dim">
        <span>noise</span>
        <span className="mx-3 h-px flex-1 bg-line-strong" />
        <span>image</span>
      </div>
    </div>
  );
}

const visuals = { ocr: OcrVisual, pipeline: PipelineVisual, diffusion: DiffusionVisual };

export default function ProjectVisual({ type, className = "h-full min-h-[18rem]" }) {
  const Visual = visuals[type] ?? OcrVisual;
  return (
    <div aria-hidden="true" className={`relative overflow-hidden bg-panel ${className}`}>
      <div className="absolute inset-0 grid-lines opacity-60" />
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-signal/10 blur-3xl" />
      <div className="relative h-full">
        <Visual />
      </div>
    </div>
  );
}
