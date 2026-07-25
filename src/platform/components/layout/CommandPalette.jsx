import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, CornerDownLeft, Sparkles } from 'lucide-react';
import { searchIndex } from '../../data/campusData.js';

export default function CommandPalette({ open, setOpen }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!query.trim()) return searchIndex.slice(0, 5);
    return searchIndex.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const go = (path) => {
    navigate(path);
    setOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-ink-950/70 px-4 pt-[14vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong w-full max-w-xl overflow-hidden rounded-xl3 shadow-glow"
          >
            <div className="flex items-center gap-3 border-b border-white/8 px-5 py-4">
              <Search size={18} className="text-orbit-teal" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search subjects, books, orders, settings…"
                className="w-full bg-transparent text-sm text-haze-100 placeholder:text-haze-400 focus:outline-none"
              />
              <kbd className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-haze-400">
                ESC
              </kbd>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 && (
                <div className="flex flex-col items-center gap-2 py-10 text-haze-400">
                  <Sparkles size={20} />
                  <p className="text-sm">No matches. Try a different term.</p>
                </div>
              )}
              {results.map((item) => (
                <button
                  key={item.id}
                  onClick={() => go(item.path)}
                  className="group flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left transition-colors hover:bg-white/6"
                >
                  <div>
                    <p className="text-sm font-medium text-haze-100">{item.label}</p>
                    <p className="text-xs text-haze-400">{item.type}</p>
                  </div>
                  <CornerDownLeft
                    size={14}
                    className="text-haze-400 opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
