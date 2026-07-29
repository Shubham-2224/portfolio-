import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "../data/portfolio";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const menuButtonRef = useRef(null);
  const menuWasOpenedRef = useRef(false);
  const sectionIds = useMemo(() => navLinks.map((link) => link.href.slice(1)), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter(Boolean);

    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds]);

  useEffect(() => {
    if (!isOpen && menuWasOpenedRef.current) {
      menuButtonRef.current?.focus();
      return undefined;
    }
    if (isOpen) menuWasOpenedRef.current = true;

    const handleEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="section-container">
          <nav
            className={`flex items-center justify-between px-4 md:px-6 py-3 rounded-2xl transition-all duration-500 ${
              scrolled
                ? "glass-strong shadow-2xl shadow-black/20 border border-white/8"
                : "bg-transparent"
            }`}
          >
            <a href="#home" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-display font-black text-sm group-hover:scale-105 transition-transform">
                  SD
                </div>
                <div className="absolute -inset-1 rounded-xl bg-primary/20 blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="hidden sm:block">
                <p className="font-display font-bold text-sm leading-none">Shubham Desai</p>
                <p className="text-[10px] text-slate-500 font-mono mt-0.5">AI Engineer</p>
              </div>
            </a>

            <div className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeSection === link.href.slice(1)
                      ? "text-white"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {activeSection === link.href.slice(1) && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-primary/20 border border-primary/30 rounded-lg"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <a
                href="#contact"
                className="hidden md:inline-flex btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold"
              >
                Hire Me
              </a>
              <button
                ref={menuButtonRef}
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2.5 rounded-xl glass border border-white/8"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                aria-controls="mobile-nav-menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            id="mobile-nav-menu"
            className="fixed inset-x-4 top-[88px] z-40 lg:hidden glass-strong rounded-2xl border border-white/8 overflow-hidden"
          >
            <div className="p-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === link.href.slice(1)
                      ? "bg-primary/15 text-white"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 rounded-xl btn-primary text-center text-sm font-semibold mt-2"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
