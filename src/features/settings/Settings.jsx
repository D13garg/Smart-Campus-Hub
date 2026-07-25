import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Eye, Keyboard, Palette } from 'lucide-react';
import PageHeader from '@platform/components/ui/PageHeader.jsx';
import GlassCard from '@platform/components/ui/GlassCard.jsx';
import { Badge } from '@platform/components/ui/Badge.jsx';
import useTheme from '@platform/hooks/useTheme.js';

const accents = [
  { id: 'violet', color: '#7C6CF6' },
  { id: 'teal', color: '#2DD8C4' },
  { id: 'rose', color: '#F97C9B' },
  { id: 'amber', color: '#FBBF5A' },
];

const shortcuts = [
  { keys: ['Ctrl', 'K'], desc: 'Open command palette' },
  { keys: ['G', 'D'], desc: 'Go to Dashboard' },
  { keys: ['G', 'G'], desc: 'Go to Grades' },
  { keys: ['Esc'], desc: 'Close any overlay' },
];

export default function Settings() {
  const { theme, toggle } = useTheme();
  const [accent, setAccent] = useState('violet');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  return (
    <div>
      <PageHeader eyebrow="Preferences" title="Settings" description="Fine-tune how Orbit looks, moves and responds." />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <GlassCard hover={false} className="p-6">
          <div className="mb-5 flex items-center gap-2">
            <Palette size={16} className="text-orbit-violetSoft" />
            <p className="font-display text-sm font-semibold text-haze-100">Appearance</p>
          </div>

          <div className="mb-5 flex items-center justify-between">
            <span className="text-sm text-haze-200">Theme</span>
            <button
              onClick={toggle}
              className="flex items-center gap-2 rounded-full glass px-3.5 py-2 text-xs text-haze-200"
            >
              {theme === 'dark' ? <Moon size={13} /> : <Sun size={13} />}
              {theme === 'dark' ? 'Dark' : 'Light'}
            </button>
          </div>

          <div>
            <span className="mb-3 block text-sm text-haze-200">Accent Color</span>
            <div className="flex gap-3">
              {accents.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setAccent(a.id)}
                  className="relative h-9 w-9 rounded-full"
                  style={{ background: a.color }}
                >
                  {accent === a.id && (
                    <motion.span
                      layoutId="accent-ring"
                      className="absolute -inset-1 rounded-full border-2"
                      style={{ borderColor: a.color }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </GlassCard>

        <GlassCard hover={false} className="p-6">
          <div className="mb-5 flex items-center gap-2">
            <Eye size={16} className="text-orbit-teal" />
            <p className="font-display text-sm font-semibold text-haze-100">Accessibility</p>
          </div>
          <div className="space-y-4">
            <Toggle label="Reduce motion" value={reducedMotion} onChange={setReducedMotion} />
            <Toggle label="High contrast text" value={highContrast} onChange={setHighContrast} />
          </div>
        </GlassCard>

        <GlassCard hover={false} className="p-6 lg:col-span-2">
          <div className="mb-5 flex items-center gap-2">
            <Keyboard size={16} className="text-orbit-amber" />
            <p className="font-display text-sm font-semibold text-haze-100">Keyboard Shortcuts</p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {shortcuts.map((s) => (
              <div key={s.desc} className="flex items-center justify-between rounded-xl2 border border-white/8 bg-white/[0.02] px-4 py-3">
                <span className="text-xs text-haze-300">{s.desc}</span>
                <div className="flex gap-1">
                  {s.keys.map((k) => (
                    <kbd key={k} className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] text-haze-200">
                      {k}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

function Toggle({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-haze-200">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`relative h-6 w-11 rounded-full transition-colors ${value ? 'bg-orbit-teal' : 'bg-white/10'}`}
      >
        <motion.span
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow"
          style={{ left: value ? 22 : 2 }}
        />
      </button>
    </div>
  );
}
