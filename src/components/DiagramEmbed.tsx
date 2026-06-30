// components/DiagramEmbed.tsx — frames a blueprint SVG on an obsidian panel with an expand-to-fullscreen view.
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "./primitives";

export function DiagramEmbed({
  src,
  title,
  caption,
  accent = "#df8c64",
}: {
  src: string;
  title: string;
  caption?: string;
  accent?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <figure className="overflow-hidden rounded-card border border-lineDark bg-obsidian shadow-lift">
        <figcaption className="flex items-center justify-between gap-3 border-b border-lineDark px-5 py-3">
          <span className="flex items-center gap-2 font-mono text-xs text-paper/70">
            <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
            {title}
          </span>
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-1.5 rounded-full border border-white/15 px-2.5 py-1 font-mono text-[11px] text-paper/60 transition-colors hover:border-white/40 hover:text-paper"
          >
            Expand <Icon.Plus className="h-3.5 w-3.5" />
          </button>
        </figcaption>
        <div className="bg-grid-obsidian p-4 sm:p-6">
          <button onClick={() => setOpen(true)} className="block w-full cursor-zoom-in" aria-label={`Expand ${title}`}>
            <img src={src} alt={title} loading="lazy" className="mx-auto h-auto w-full" />
          </button>
        </div>
        {caption && <p className="border-t border-lineDark px-5 py-3 text-xs text-paper/45">{caption}</p>}
      </figure>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-obsidian/95 p-4 sm:p-10"
          >
            <button
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-paper hover:bg-white/10"
              aria-label="Close"
            >
              <span className="text-xl leading-none">×</span>
            </button>
            <motion.img
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              src={src}
              alt={title}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full cursor-default overflow-auto rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
