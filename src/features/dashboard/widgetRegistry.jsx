import React from 'react';
import { UtensilsCrossed, BookOpen, Flame, Award, Sunrise, Book, TrendingUp } from 'lucide-react';
import RadialProgress from '@platform/components/charts/RadialProgress.jsx';
import Sparkline from '@platform/components/charts/Sparkline.jsx';
import { Badge } from '@platform/components/ui/Badge.jsx';
import {
  upcomingClasses,
  canteenOrders,
  libraryBooks,
  announcements,
  achievements,
  subjects,
  semesterHistory,
} from '@platform/data/campusData.js';

const iconMap = { flame: Flame, award: Award, sunrise: Sunrise, book: Book };

// Every entry: { title, subtitle, accent, to, Content }
// `to` is optional (adds the little arrow-link in the widget header).
// `Content` is a plain function component with no props — it reads mock data directly,
// same as the original hardcoded blocks in Dashboard.jsx did.
export const WIDGET_REGISTRY = {
  w_cgpa: {
    title: 'CGPA',
    subtitle: 'Current semester',
    accent: 'violet',
    to: '/grades',
    Content: () => (
      <div className="flex items-center gap-4">
        <RadialProgress value={86} color="#7C6CF6" label="8.6" sub="/ 10" />
        <div className="flex-1 space-y-2">
          {subjects.slice(0, 3).map((s) => (
            <div key={s.id} className="flex items-center justify-between text-xs">
              <span className="truncate text-haze-300">{s.code}</span>
              <span className="number-mono font-semibold text-haze-100">{s.grade}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  w_attendance: {
    title: 'Attendance',
    subtitle: 'This month',
    accent: 'teal',
    to: '/attendance',
    Content: () => (
      <div className="flex items-center gap-4">
        <RadialProgress value={95} color="#2DD8C4" label="95%" sub="present" />
        <div className="flex-1">
          <p className="text-xs text-haze-400">Classes attended</p>
          <p className="font-display text-lg font-semibold text-haze-100">19 / 22</p>
          <p className="mt-2 text-[11px] text-orbit-teal">+1.4% vs last month</p>
        </div>
      </div>
    ),
  },

  w_agenda: {
    title: "Today's Agenda",
    subtitle: 'Upcoming classes',
    accent: 'amber',
    to: '/attendance',
    Content: () => (
      <ul className="space-y-3">
        {upcomingClasses.map((c) => (
          <li key={c.id} className="flex items-center justify-between text-xs">
            <div>
              <p className="font-medium text-haze-100">{c.subject}</p>
              <p className="text-haze-400">{c.room}</p>
            </div>
            <span className="number-mono text-orbit-amber">{c.time}</span>
          </li>
        ))}
      </ul>
    ),
  },

  w_announcements: {
    title: 'Announcements',
    subtitle: 'Campus-wide',
    accent: 'rose',
    Content: () => (
      <ul className="space-y-3">
        {announcements.map((a) => (
          <li key={a.id} className="flex items-start justify-between gap-3 text-xs">
            <div>
              <p className="font-medium text-haze-100">{a.title}</p>
              <p className="mt-0.5 text-haze-400">{a.date}</p>
            </div>
            <Badge tone="rose">{a.tag}</Badge>
          </li>
        ))}
      </ul>
    ),
  },

  w_canteen: {
    title: 'Canteen Orders',
    subtitle: 'Wallet balance ₹420',
    accent: 'amber',
    to: '/canteen',
    Content: () => (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {canteenOrders.map((o) => (
          <div key={o.id} className="rounded-xl2 border border-white/8 bg-white/[0.03] p-3">
            <div className="mb-2 flex items-center justify-between">
              <UtensilsCrossed size={14} className="text-orbit-amber" />
              <Badge tone={o.status === 'Delivered' ? 'teal' : 'amber'}>{o.status}</Badge>
            </div>
            <p className="text-xs text-haze-100">{o.items.join(', ')}</p>
            <p className="number-mono mt-1 text-xs text-haze-400">₹{o.total} · {o.time}</p>
          </div>
        ))}
      </div>
    ),
  },

  w_library: {
    title: 'Library',
    subtitle: 'Books issued',
    accent: 'rose',
    to: '/library',
    Content: () => (
      <div className="space-y-3">
        {libraryBooks.filter((b) => b.status === 'issued').map((b) => (
          <div key={b.id} className="flex items-center gap-3">
            <span className="h-9 w-7 rounded-sm" style={{ background: b.cover }} />
            <div className="flex-1">
              <p className="text-xs font-medium text-haze-100">{b.title}</p>
              <p className="text-[11px] text-haze-400">Due {b.due}</p>
            </div>
            <BookOpen size={14} className="text-haze-400" />
          </div>
        ))}
      </div>
    ),
  },

  w_gradetrends: {
    title: 'Grade Trends',
    subtitle: 'Last 5 assessments',
    accent: 'violet',
    to: '/grades',
    Content: () => (
      <div className="space-y-3">
        {subjects.slice(0, 3).map((s) => (
          <div key={s.id} className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-haze-100">{s.name}</p>
              <p className="text-[11px] text-haze-400">{s.code}</p>
            </div>
            <Sparkline data={s.trend} color="#7C6CF6" />
          </div>
        ))}
      </div>
    ),
  },

  w_achievements: {
    title: 'Achievements',
    subtitle: 'Gamified progress',
    accent: 'teal',
    Content: () => (
      <div className="grid grid-cols-2 gap-3">
        {achievements.map((a) => {
          const Icon = iconMap[a.icon] || Award;
          return (
            <div
              key={a.id}
              className={`flex items-center gap-2 rounded-xl2 border p-3 ${
                a.unlocked ? 'border-orbit-teal/25 bg-orbit-teal/5' : 'border-white/8 bg-white/[0.02] opacity-50'
              }`}
            >
              <Icon size={16} className={a.unlocked ? 'text-orbit-teal' : 'text-haze-400'} />
              <div>
                <p className="text-[11px] font-medium text-haze-100">{a.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    ),
  },

  // Previously a dead catalog entry with nothing rendering it — now a real widget,
  // built from data that already existed (semesterHistory + subjects).
  w_insights: {
    title: 'Study Insights',
    subtitle: 'GPA trend across semesters',
    accent: 'violet',
    to: '/grades',
    Content: () => {
      const avgScore = Math.round(subjects.reduce((sum, s) => sum + s.score, 0) / subjects.length);
      const best = [...subjects].sort((a, b) => b.score - a.score)[0];
      return (
        <div className="flex items-center gap-4">
          <Sparkline data={semesterHistory.map((s) => s.gpa)} color="#7C6CF6" />
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs text-haze-300">
              <TrendingUp size={12} className="text-orbit-teal" />
              <span>Avg. score {avgScore}%</span>
            </div>
            <p className="text-[11px] text-haze-400">Strongest: {best.name}</p>
          </div>
        </div>
      );
    },
  },
};
