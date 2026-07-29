import { ArrowUp, Mail } from "lucide-react";
import GitHubIcon from "./ui/GitHubIcon";
import { personalInfo, navLinks } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="section-container py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-display font-black text-sm">
                SD
              </div>
              <div>
                <p className="font-display font-bold">{personalInfo.name}</p>
                <p className="text-xs text-slate-500">{personalInfo.title}</p>
              </div>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Delivering production-ready AI systems focused on automation, accuracy, and measurable business value.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4 text-slate-300">Navigation</h4>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-slate-500 hover:text-accent transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4 text-slate-300">Connect</h4>
            <div className="space-y-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                {personalInfo.email}
              </a>
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors"
              >
                <GitHubIcon className="w-4 h-4" />
                @{personalInfo.github}
              </a>
            </div>
          </div>
        </div>

        <div className="section-divider mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-xs text-slate-600 font-mono">
            Designed with React · Tailwind · Framer Motion
          </p>
          <a
            href="#home"
            className="p-3 rounded-xl glass border border-white/8 hover:border-primary/30 transition-all group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 text-slate-500 group-hover:text-accent transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  );
}
