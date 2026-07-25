import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';
import PageHeader from '@platform/components/ui/PageHeader.jsx';
import GlassCard from '@platform/components/ui/GlassCard.jsx';
import RadialProgress from '@platform/components/charts/RadialProgress.jsx';
import BarRow from '@platform/components/charts/BarRow.jsx';
import { attendanceOverview, weeklyAttendance, attendanceBySubject, upcomingClasses } from '@platform/data/campusData.js';

const dotStyle = {
  P: { bg: 'bg-orbit-teal', icon: CheckCircle2 },
  A: { bg: 'bg-orbit-rose', icon: XCircle },
  L: { bg: 'bg-orbit-amber', icon: Clock },
};

export default function Attendance() {
  return (
    <div>
      <PageHeader
        eyebrow="Presence"
        title="Attendance Tracker"
        description="A live read on your presence across every class this term."
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <GlassCard accent="teal" hover={false} className="flex flex-col items-center gap-5 p-6">
          <RadialProgress value={attendanceOverview.overall} size={140} stroke={11} color="#2DD8C4" label="95%" sub="overall" />
          <div className="grid w-full grid-cols-3 gap-2 text-center">
            <div>
              <p className="number-mono font-display text-lg font-semibold text-orbit-teal">{attendanceOverview.present}</p>
              <p className="text-[10px] text-haze-400">Present</p>
            </div>
            <div>
              <p className="number-mono font-display text-lg font-semibold text-orbit-amber">{attendanceOverview.late}</p>
              <p className="text-[10px] text-haze-400">Late</p>
            </div>
            <div>
              <p className="number-mono font-display text-lg font-semibold text-orbit-rose">{attendanceOverview.absent}</p>
              <p className="text-[10px] text-haze-400">Absent</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard hover={false} className="p-6 lg:col-span-2">
          <p className="mb-4 font-display text-sm font-semibold text-haze-100">Weekly Attendance</p>
          <div className="space-y-3">
            {weeklyAttendance.map((w, wi) => (
              <div key={w.week} className="flex items-center gap-3">
                <span className="w-16 shrink-0 text-xs text-haze-400">{w.week}</span>
                <div className="flex flex-1 gap-2">
                  {w.days.map((d, i) => {
                    const s = dotStyle[d];
                    return (
                      <motion.span
                        key={i}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: wi * 0.05 + i * 0.03 }}
                        className={`flex h-6 w-6 items-center justify-center rounded-md ${s.bg}/20 border border-white/8`}
                      >
                        <s.icon size={12} className={s.bg.replace('bg-', 'text-')} />
                      </motion.span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-4 text-[11px] text-haze-400">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-orbit-teal" /> Present</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-orbit-amber" /> Late</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-orbit-rose" /> Absent</span>
          </div>
        </GlassCard>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        <GlassCard hover={false} className="p-6 lg:col-span-2">
          <p className="mb-5 font-display text-sm font-semibold text-haze-100">Attendance by Subject</p>
          <div className="space-y-5">
            {attendanceBySubject.map((a, i) => (
              <BarRow key={a.subject} label={a.subject} percent={a.percent} color={a.percent < 90 ? '#FBBF5A' : '#2DD8C4'} delay={i * 0.08} />
            ))}
          </div>
        </GlassCard>

        <GlassCard accent="amber" hover={false} className="p-6">
          <p className="mb-4 font-display text-sm font-semibold text-haze-100">Upcoming Classes</p>
          <ul className="space-y-4">
            {upcomingClasses.map((c) => (
              <li key={c.id} className="flex items-center justify-between text-xs">
                <div>
                  <p className="font-medium text-haze-100">{c.subject}</p>
                  <p className="text-haze-400">{c.room} · {c.faculty}</p>
                </div>
                <span className="number-mono rounded-full bg-white/6 px-2.5 py-1 text-orbit-amber">{c.time}</span>
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}
