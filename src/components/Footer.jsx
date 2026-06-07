import { Heart, ArrowUp } from "lucide-react";
import { personalInfo } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm flex items-center gap-1">
            © {new Date().getFullYear()} {personalInfo.name}. Built with
            <Heart className="w-4 h-4 text-red-500 inline mx-1" />
            React &amp; AI
          </p>

          <p className="text-slate-600 text-xs font-mono">
            AI &amp; Data Science Engineer | Generative AI Developer
          </p>

          <a
            href="#home"
            className="p-3 rounded-xl glass hover:bg-white/10 transition-colors group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 text-slate-400 group-hover:text-accent transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  );
}
