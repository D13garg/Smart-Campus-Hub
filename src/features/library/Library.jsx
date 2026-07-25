import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, CheckCircle, Clock3 } from 'lucide-react';
import PageHeader from '@platform/components/ui/PageHeader.jsx';
import GlassCard from '@platform/components/ui/GlassCard.jsx';
import Button from '@platform/components/ui/Button.jsx';
import { Badge } from '@platform/components/ui/Badge.jsx';
import { libraryBooks, libraryRecommendations } from '@platform/data/campusData.js';

export default function Library() {
  const [tab, setTab] = useState('issued');
  const [renewed, setRenewed] = useState({});

  const filtered = libraryBooks.filter((b) => (tab === 'issued' ? b.status === 'issued' : b.status === 'returned'));

  return (
    <div>
      <PageHeader
        eyebrow="Library"
        title="Your Bookshelf"
        description="Track issued books, renewal windows, and discover what to read next."
        action={
          <div className="flex gap-2">
            {['issued', 'history'].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-4 py-2 text-xs font-medium capitalize transition-colors ${
                  tab === t ? 'bg-orbit-rose text-white' : 'glass text-haze-300 hover:text-haze-100'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((b, i) => (
          <motion.div key={b.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <GlassCard accent="rose" className="flex h-full gap-4 p-5">
              <span className="h-24 w-16 shrink-0 rounded-md shadow-lg" style={{ background: b.cover }} />
              <div className="flex flex-1 flex-col">
                <p className="font-display text-sm font-semibold leading-snug text-haze-100">{b.title}</p>
                <p className="mt-1 text-xs text-haze-400">{b.author}</p>
                <div className="mt-3 space-y-1 text-[11px] text-haze-400">
                  <p>Issued {b.issued}</p>
                  <p className={b.status === 'issued' ? 'text-orbit-amber' : 'text-orbit-teal'}>
                    {b.status === 'issued' ? `Due ${b.due}` : 'Returned'}
                  </p>
                </div>
                {b.status === 'issued' && (
                  <Button
                    variant={renewed[b.id] ? 'subtle' : 'ghost'}
                    className="mt-auto w-full !py-1.5 text-xs"
                    icon={renewed[b.id] ? CheckCircle : RotateCcw}
                    onClick={() => setRenewed((r) => ({ ...r, [b.id]: true }))}
                    disabled={renewed[b.id]}
                  >
                    {renewed[b.id] ? 'Renewed' : 'Renew Book'}
                  </Button>
                )}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center gap-2">
          <Clock3 size={15} className="text-orbit-violetSoft" />
          <p className="font-display text-sm font-semibold text-haze-100">Recommended for you</p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {libraryRecommendations.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <GlassCard accent="violet" className="flex items-center gap-3 p-4">
                <span className="h-14 w-10 shrink-0 rounded-sm" style={{ background: r.cover }} />
                <div>
                  <p className="text-xs font-medium text-haze-100">{r.title}</p>
                  <p className="text-[11px] text-haze-400">{r.author}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
