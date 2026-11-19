import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, CornerDownLeft, FileDown, Hash, Mail, Search } from "lucide-react";
import GitHubIcon from "./GitHubIcon";
import { navLinks, personalInfo } from "../../data/portfolio";

export default function CommandPalette({ open, onClose }) {
  // The dialog is mounted fresh on every open, so its query/selection state resets for free.
  return <AnimatePresence>{open && <PaletteDialog onClose={onClose} />}</AnimatePresence>;
}

function PaletteDialog({ onClose }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const restoreFocusRef = useRef(null);

  const commands = useMemo(() => {
    const go = (href) => () => {
      onClose();
      document.querySelector(href)?.scrollIntoView();
    };
    return [
      { id: "top", group: "Navigate", label: "Home", icon: Hash, run: go("#home") },
      ...navLinks.map((link) => ({
        id: link.href,
        group: "Navigate",
        label: link.name,
        icon: Hash,
        run: go(link.href),
      })),
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: personalInfo.email,
        icon: Copy,
        keepOpen: true,
        run: async () => {
          try {
            await navigator.clipboard.writeText(personalInfo.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          } catch {
            window.location.href = `mailto:${personalInfo.email}`;
          }
        },
      },
      {
        id: "email",
        group: "Actions",
        label: "Send an email",
        icon: Mail,
        run: () => {
          onClose();
          window.location.href = `mailto:${personalInfo.email}`;
        },
      },
      {
        id: "github",
        group: "Actions",
        label: "Open GitHub profile",
        hint: `@${personalInfo.github}`,
        icon: GitHubIcon,
        external: true,
        run: () => {
          onClose();
          window.open(personalInfo.githubUrl, "_blank", "noopener,noreferrer");
        },
      },
      ...(personalInfo.resumeUrl
        ? [
            {
              id: "resume",
              group: "Actions",
              label: "Download résumé",
              icon: FileDown,
              run: () => {
                onClose();
                window.open(personalInfo.resumeUrl, "_blank", "noopener,noreferrer");
              },
            },
          ]
        : []),
    ];
  }, [onClose]);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return commands;
    return commands.filter((command) =>
      `${command.label} ${command.group} ${command.hint ?? ""}`.toLowerCase().includes(needle)
    );
  }, [commands, query]);

  useEffect(() => {
    restoreFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      restoreFocusRef.current?.focus?.();
    };
  }, []);

  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => (results.length ? (index + 1) % results.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => (results.length ? (index - 1 + results.length) % results.length : 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      results[active]?.run();
    } else if (event.key === "Tab") {
      // Keep focus inside the dialog; the list is driven by arrow keys.
      event.preventDefault();
    }
  };

  let lastGroup = null;

  return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[14vh] bg-black/70 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onKeyDown={onKeyDown}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-line-strong bg-panel shadow-[0_40px_120px_-20px_rgb(0_0_0/0.9)]"
          >
            <div className="flex items-center gap-3 px-4 border-b border-line">
              <Search className="w-4 h-4 text-dim shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActive(0);
                }}
                placeholder="Jump to a section or run an action…"
                aria-label="Search commands"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-list"
                aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
                className="flex-1 min-w-0 bg-transparent py-4 text-[0.95rem] text-fg placeholder:text-dim focus:outline-none"
              />
              <kbd className="font-mono text-[0.65rem] text-dim border border-line rounded-md px-1.5 py-1">
                ESC
              </kbd>
            </div>

            <ul
              ref={listRef}
              id="command-list"
              role="listbox"
              aria-label="Commands"
              className="max-h-[min(22rem,50vh)] overflow-y-auto p-2"
            >
              {results.length === 0 && (
                <li className="px-3 py-8 text-center text-sm text-dim">
                  Nothing matches “{query}”.
                </li>
              )}
              {results.map((command, index) => {
                const showGroup = command.group !== lastGroup;
                lastGroup = command.group;
                const isActive = index === active;
                const isCopied = command.id === "copy-email" && copied;
                const Icon = isCopied ? Check : command.icon;
                return (
                  <li key={command.id} role="presentation">
                    {showGroup && <p className="eyebrow px-3 pt-3 pb-2">{command.group}</p>}
                    <button
                      type="button"
                      id={`cmd-${command.id}`}
                      role="option"
                      aria-selected={isActive}
                      data-active={isActive}
                      tabIndex={-1}
                      onMouseMove={() => setActive(index)}
                      onClick={() => command.run()}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm transition-colors ${
                        isActive ? "bg-white/[0.07] text-fg" : "text-muted"
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-signal" : "text-dim"}`} />
                      <span className="flex-1 truncate">{isCopied ? "Copied to clipboard" : command.label}</span>
                      {command.hint && !isCopied && (
                        <span className="hidden sm:block font-mono text-xs text-dim truncate max-w-[45%]">
                          {command.hint}
                        </span>
                      )}
                      {command.external && <ArrowUpRight className="w-3.5 h-3.5 text-dim" />}
                      {isActive && !command.external && (
                        <CornerDownLeft className="w-3.5 h-3.5 text-dim" aria-hidden="true" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center justify-between gap-4 px-4 py-2.5 border-t border-line font-mono text-[0.68rem] text-dim">
              <span>↑↓ navigate · ↵ select</span>
              <span>{personalInfo.name}</span>
            </div>
          </motion.div>
        </motion.div>
  );
}
