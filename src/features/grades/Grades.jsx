import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, TrendingUp } from 'lucide-react';
import PageHeader from '@platform/components/ui/PageHeader.jsx';
import GlassCard from '@platform/components/ui/GlassCard.jsx';
import RadialProgress from '@platform/components/charts/RadialProgress.jsx';
import Sparkline from '@platform/components/charts/Sparkline.jsx';
import { Badge } from '@platform/components/ui/Badge.jsx';
import { gradeSummary, subjects, semesterHistory } from '@platform/data/campusData.js';

const gradeTone = (g) => (g.startsWith('A+') ? 'teal' : g.startsWith('A') ? 'violet' : g.startsWith('B+') ? 'amber' : 'rose');

export default function Grades() {
  const [sortBy, setSortBy] = useState('default');

  const sorted = [...subjects].sort((a, b) => {
    if (sortBy === 'score') return b.score - a.score;
    if (sortBy === 'credits') return b.credits - a.credits;
    return 0;
  });

  return (
    <div>
      <PageHeader
        eyebrow="Academics"
        title="Grades Overview"
        description="Your semester performance, subject by subject, with trendlines you can act on."
        action={
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-full glass px-4 py-2 text-xs text-haze-200 focus:outline-none"
          >
            <option value="default">Sort: Default</option>
            <option value="score">Sort: Highest Score</option>
            <option value="credits">Sort: Most Credits</option>
          </select>
        }
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <GlassCard accent="violet" hover={false} className="flex flex-col items-center gap-4 p-6 lg:col-span-1">
          <RadialProgress value={86} size={140} stroke={11} color="#7C6CF6" label="8.6" sub="CGPA" />
          <div className="grid w-full grid-cols-2 gap-3">
            {gradeSummary.map((g) => (
              <div key={g.grade} className="rounded-xl2 border border-white/8 bg-white/[0.03] p-3 text-center">
                <p className="font-display text-sm font-semibold" style={{ color: g.color }}>{g.grade}</p>
                <p className="number-mono text-[11px] text-haze-400">{g.percent}%</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard accent="teal" hover={false} className="p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-display text-sm font-semibold text-haze-100">GPA Trajectory</p>
            <Badge tone="teal"><TrendingUp size={11} className="mr-1 inline" />Improving</Badge>
          </div>
          <div className="flex items-end gap-4">
            {semesterHistory.map((s, i) => (
              <div key={s.sem} className="flex flex-1 flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(s.gpa / 10) * 140}px` }}
                  transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full rounded-t-lg bg-gradient-to-t from-orbit-violet/30 to-orbit-teal"
                  style={{ maxWidth: 44 }}
                />
                <span className="number-mono text-[11px] text-haze-400">{s.gpa}</span>
                <span className="text-[10px] text-haze-400">{s.sem}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="mt-6">
        <GlassCard hover={false} className="overflow-hidden">
          <div className="border-b border-white/8 p-5">
            <p className="font-display text-sm font-semibold text-haze-100">Subject Performance</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-haze-400">
                  <th className="px-5 py-3 font-medium">Subject</th>
                  <th className="px-5 py-3 font-medium">Credits</th>
                  <th className="px-5 py-3 font-medium">Grade</th>
                  <th className="px-5 py-3 font-medium">Score</th>
                  <th className="px-5 py-3 font-medium">Trend</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((s, i) => (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="border-t border-white/6 transition-colors hover:bg-white/[0.03]"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orbit-violet/12">
                          <GraduationCap size={14} className="text-orbit-violetSoft" />
                        </span>
                        <div>
                          <p className="font-medium text-haze-100">{s.name}</p>
                          <p className="text-[11px] text-haze-400">{s.code} · {s.faculty}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 number-mono text-haze-300">{s.credits}</td>
                    <td className="px-5 py-3.5"><Badge tone={gradeTone(s.grade)}>{s.grade}</Badge></td>
                    <td className="px-5 py-3.5 number-mono text-haze-100">{s.score}</td>
                    <td className="px-5 py-3.5"><Sparkline data={s.trend} color="#7C6CF6" /></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
