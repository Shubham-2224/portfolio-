import { ArrowUp } from "lucide-react";
import { navLinks, personalInfo } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="shell pt-14 pb-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-xl font-semibold">{personalInfo.name}</p>
            <p className="mt-1 text-sm text-muted">{personalInfo.role}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="link-underline transition-colors hover:text-fg">
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline transition-colors hover:text-fg"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </nav>

          <a href="#home" className="btn btn-ghost self-start !min-h-10 !px-4 !py-2 text-sm">
            Back to top
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <p aria-hidden="true" className="wordmark mt-14 whitespace-nowrap text-center text-[clamp(2.25rem,11vw,10.75rem)]">
          {personalInfo.name}
        </p>

        <div className="mt-8 flex flex-col gap-2 border-t border-line pt-6 font-mono text-xs text-dim sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {personalInfo.name}
          </p>
          <p>Built with React, Tailwind CSS & Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}
