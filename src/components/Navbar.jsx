import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { navLinks, personalInfo } from "../data/portfolio";

const SECTION_IDS = ["home", ...navLinks.map((link) => link.href.slice(1))];

function useActiveSection() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const measure = () => {
      ticking = false;
      setScrolled(window.scrollY > 24);
      const probe = window.innerHeight * 0.35;
      let current = SECTION_IDS[0];
      for (const id of SECTION_IDS) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= probe) current = id;
      }
      // Pin the last section once the page bottom is reached.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = SECTION_IDS[SECTION_IDS.length - 1];
      }
      setActive(current);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { active, scrolled };
}

export default function Navbar({ onOpenPalette }) {
  const { active, scrolled } = useActiveSection();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 pt-3 md:pt-4"
      >
        <div className="shell">
          <nav
            aria-label="Primary"
            className={`flex items-center justify-between gap-3 rounded-full border pl-2 pr-2 py-2 transition-[background-color,border-color,box-shadow] duration-500 ${
              scrolled || menuOpen
                ? "border-line bg-ink/75 backdrop-blur-xl shadow-[0_12px_40px_-12px_rgb(0_0_0/0.8)]"
                : "border-transparent bg-transparent"
            }`}
          >
            <a href="#home" className="flex items-center gap-3 rounded-full pr-3 group" aria-label={`${personalInfo.name} — home`}>
              <span className="grid place-items-center w-10 h-10 rounded-full bg-fg text-ink font-display font-bold text-sm tracking-tight transition-colors duration-300 group-hover:bg-[#dfe3ff]">
                {personalInfo.initials}
              </span>
              <span className="hidden sm:block leading-tight">
                <span className="block font-display font-semibold text-sm">{personalInfo.name}</span>
                <span className="block font-mono text-[0.65rem] text-dim">{personalInfo.role}</span>
              </span>
            </a>

            <ul className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive = active === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative block px-3.5 py-2 rounded-full text-sm transition-colors duration-300 ${
                        isActive ? "text-fg" : "text-muted hover:text-fg"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-full bg-white/[0.08] border border-line"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">{link.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onOpenPalette}
                aria-label="Open command palette"
                className="flex items-center gap-2 h-10 px-3 rounded-full border border-line text-dim hover:text-fg hover:border-line-strong transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <kbd className="hidden md:inline font-mono text-[0.68rem]">Ctrl K</kbd>
              </button>
              <a href="#contact" className="btn btn-primary hidden sm:inline-flex !min-h-10 !py-2 !px-4 text-sm">
                Let’s talk
              </a>
              <button
                ref={menuButtonRef}
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="lg:hidden grid place-items-center w-10 h-10 rounded-full border border-line text-fg cursor-pointer"
              >
                {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden bg-ink/95 backdrop-blur-xl pt-28 pb-10 overflow-y-auto"
          >
            <div className="shell flex flex-col min-h-full">
              <ul className="flex-1">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + index * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-line"
                  >
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-baseline justify-between py-5"
                    >
                      <span className="font-display text-4xl font-semibold tracking-tight">{link.name}</span>
                      <span className="eyebrow">0{index + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a
                href={`mailto:${personalInfo.email}`}
                className="btn btn-primary mt-10 w-full"
                onClick={() => setMenuOpen(false)}
              >
                {personalInfo.email}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
