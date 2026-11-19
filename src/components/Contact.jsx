import { useState } from "react";
import { ArrowUpRight, Check, Copy, MapPin, Phone, Send } from "lucide-react";
import { personalInfo } from "../data/portfolio";
import GitHubIcon from "./ui/GitHubIcon";
import { Reveal, SplitWords } from "./ui/Motion";

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${personalInfo.email}`;
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={`mailto:${personalInfo.email}`}
        className="link-underline break-all font-display text-2xl font-semibold tracking-tight sm:text-3xl"
      >
        {personalInfo.email}
      </a>
      <button
        type="button"
        onClick={copy}
        className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full border border-line px-3 font-mono text-xs text-muted transition-colors hover:border-line-strong hover:text-fg"
      >
        {copied ? <Check className="h-3.5 w-3.5 text-signal" /> : <Copy className="h-3.5 w-3.5" />}
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}

const inputs = [
  { id: "name", label: "Name", type: "text", placeholder: "Your name", autoComplete: "name" },
  { id: "email", label: "Email", type: "email", placeholder: "you@company.com", autoComplete: "email" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const update = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const onSubmit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(form.subject || "Portfolio enquiry");
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name}\n${form.email}`);
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="section border-t border-line overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-0 -z-10 h-[32rem] w-[60rem] max-w-none -translate-x-1/2 rounded-full bg-signal/[0.07] blur-3xl"
      />
      <div className="shell">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal className="mb-6 flex items-center gap-3">
              <span className="eyebrow text-signal">06</span>
              <span className="h-px w-10 bg-line-strong" />
              <span className="eyebrow">Contact</span>
            </Reveal>
            <h2 className="text-[clamp(2.5rem,5.6vw,4.5rem)] font-semibold leading-[1.02]">
              <SplitWords
                onView
                text={[{ text: "Let’s build something" }, { text: "intelligent.", accent: true }]}
              />
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-muted">
                Hiring for an AI or data role, or have a project in mind? Email is the fastest way to reach me.
              </p>
            </Reveal>

            <Reveal delay={0.25} className="mt-10">
              <CopyEmail />
              <ul className="mt-8 space-y-4 text-muted">
                <li>
                  <a href={`tel:${personalInfo.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-3 transition-colors hover:text-fg">
                    <Phone className="h-4 w-4 text-signal" aria-hidden="true" />
                    {personalInfo.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-signal" aria-hidden="true" />
                  {personalInfo.location}, {personalInfo.country} · {personalInfo.workMode}
                </li>
                <li>
                  <a
                    href={personalInfo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 transition-colors hover:text-fg"
                  >
                    <GitHubIcon className="h-4 w-4 text-signal" />
                    github.com/{personalInfo.github}
                    <ArrowUpRight className="h-3.5 w-3.5 text-dim" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-6">
            <form onSubmit={onSubmit} className="card spot p-6 sm:p-9">
              <div className="grid gap-5 sm:grid-cols-2">
                {inputs.map((input) => (
                  <div key={input.id}>
                    <label htmlFor={input.id} className="eyebrow mb-2 block">
                      {input.label}
                    </label>
                    <input
                      {...input}
                      name={input.id}
                      required
                      value={form[input.id]}
                      onChange={update}
                      className="field"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <label htmlFor="subject" className="eyebrow mb-2 block">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={update}
                  placeholder="AI engineer role, project, collaboration…"
                  className="field"
                />
              </div>

              <div className="mt-5">
                <label htmlFor="message" className="eyebrow mb-2 block">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={update}
                  placeholder="Tell me a little about what you need."
                  className="field resize-y min-h-32"
                />
              </div>

              <button type="submit" className="btn btn-primary mt-7 w-full">
                {sent ? <Check className="h-4 w-4" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
                <span aria-live="polite">{sent ? "Check your email app" : "Send message"}</span>
              </button>
              <p className="mt-4 text-center text-xs text-dim">
                Opens your email app with the message filled in — nothing is stored on this site.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
