import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, ArrowUpRight } from 'lucide-react';
import PageHeader from '@platform/components/ui/PageHeader.jsx';
import GlassCard from '@platform/components/ui/GlassCard.jsx';
import { Badge } from '@platform/components/ui/Badge.jsx';
import { searchIndex } from '@platform/data/campusData.js';

export default function Search() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const results = useMemo(
    () => (query.trim() ? searchIndex.filter((i) => i.label.toLowerCase().includes(query.toLowerCase())) : searchIndex),
    [query]
  );

  return (
    <div>
      <PageHeader eyebrow="Find" title="Search Orbit" description="Look across grades, library, canteen and settings in one go." />

      <GlassCard hover={false} className="mb-6 flex items-center gap-3 px-5 py-3.5">
        <SearchIcon size={17} className="text-orbit-teal" />
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search subjects, books, orders, settings…"
          className="w-full bg-transparent text-sm text-haze-100 placeholder:text-haze-400 focus:outline-none"
        />
      </GlassCard>

      <div className="grid grid-cols-1 gap-3">
        {results.map((r, i) => (
          <motion.button
            key={r.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => navigate(r.path)}
            className="text-left"
          >
            <GlassCard className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm font-medium text-haze-100">{r.label}</p>
                <Badge tone="neutral" className="mt-1.5">{r.type}</Badge>
              </div>
              <ArrowUpRight size={16} className="text-haze-400" />
            </GlassCard>
          </motion.button>
        ))}
        {results.length === 0 && <p className="py-10 text-center text-sm text-haze-400">No results for "{query}"</p>}
      </div>
    </div>
  );
}
