import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Orbit,
  ArrowRight,
  GraduationCap,
  CalendarCheck,
  UtensilsCrossed,
  BookOpen,
  LayoutGrid,
  Boxes,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import AuroraBackground from '@platform/components/animations/AuroraBackground.jsx';
import GlassCard from '@platform/components/ui/GlassCard.jsx';
import Button from '@platform/components/ui/Button.jsx';
import { Eyebrow, Badge } from '@platform/components/ui/Badge.jsx';
import AnimatedCounter from '@platform/components/animations/AnimatedCounter.jsx';

const stats = [
  { label: 'Students on Orbit', value: 10000, suffix: '+' },
  { label: 'Partner Departments', value: 50, suffix: '+' },
  { label: 'Platform Uptime', value: 99.9, suffix: '%', decimals: 1 },
  { label: 'Avg. Satisfaction', value: 4.8, suffix: '/5', decimals: 1 },
];

const features = [
  {
    icon: LayoutGrid,
    title: 'One dashboard, every module',
    desc: 'Grades, attendance, canteen and library, unified into a single living overview — no more app-switching.',
    accent: 'violet',
  },
  {
    icon: Boxes,
    title: 'Widgets that rearrange themselves',
    desc: 'Add, remove, resize and reorder — your dashboard adapts to how you actually use campus, not the other way round.',
    accent: 'teal',
  },
  {
    icon: Sparkles,
    title: 'Micro-frontend architecture',
    desc: 'Each module ships and scales independently, so the platform grows without ever feeling patched together.',
    accent: 'amber',
  },
  {
    icon: Smartphone,
    title: 'Designed for every screen',
    desc: 'A dedicated mobile experience, not a squeezed desktop — Orbit feels native everywhere you open it.',
    accent: 'rose',
  },
];

const modules = [
  { icon: GraduationCap, label: 'Grades', to: '/grades', accent: 'violet', metric: '8.6 CGPA' },
  { icon: CalendarCheck, label: 'Attendance', to: '/attendance', accent: 'teal', metric: '95% present' },
  { icon: UtensilsCrossed, label: 'Canteen', to: '/canteen', accent: 'amber', metric: '₹420 wallet' },
  { icon: BookOpen, label: 'Library', to: '/library', accent: 'rose', metric: '3 books due' },
];

export default function Home() {
  return (
    <div className="relative">
      <AuroraBackground variant="hero" />

      {/* Top bar */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-dashed border-orbit-violet/50"
          >
            <Orbit size={17} className="text-orbit-violetSoft" />
          </motion.div>
          <span className="font-display text-lg font-semibold tracking-tight">Orbit</span>
        </div>
        <nav className="hidden items-center gap-8 text-sm text-haze-300 md:flex">
          <a href="#modules" className="transition-colors hover:text-haze-100">Modules</a>
          <a href="#features" className="transition-colors hover:text-haze-100">Features</a>
          <a href="#about" className="transition-colors hover:text-haze-100">About</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <Button variant="primary" icon={ArrowRight}>Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 pb-20 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pt-16">
        <div>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Eyebrow>Smart Campus SaaS Platform</Eyebrow>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-4 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-haze-100 sm:text-6xl lg:text-[4.2rem]"
          >
            Your campus,
            <br />
            <span className="text-gradient">in one orbit.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-5 max-w-lg text-base leading-relaxed text-haze-400"
          >
            Orbit brings grades, attendance, canteen and library into a single, living dashboard —
            built on customizable widgets and a micro-frontend core, so every module moves at its own speed
            without ever feeling disconnected.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link to="/dashboard">
              <Button variant="primary" icon={ArrowRight}>Get Started</Button>
            </Link>
            <a href="#features">
              <Button variant="ghost">Explore Features</Button>
            </a>
          </motion.div>

          <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              >
                <p className="number-mono font-display text-2xl font-semibold text-haze-100 sm:text-3xl">
                  <AnimatedCounter value={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
                </p>
                <p className="mt-1 text-xs text-haze-400">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Floating dashboard preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <GlassCard accent="violet" hover={false} className="p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs text-haze-400">Overview</p>
                  <p className="font-display text-lg font-semibold text-haze-100">This Week on Campus</p>
                </div>
                <Badge tone="teal">Live</Badge>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {modules.map((m) => (
                  <div key={m.label} className="rounded-xl2 border border-white/8 bg-white/[0.03] p-4">
                    <m.icon size={16} className="mb-3 text-orbit-teal" />
                    <p className="text-sm font-medium text-haze-100">{m.label}</p>
                    <p className="number-mono mt-1 text-xs text-haze-400">{m.metric}</p>
                  </div>
                ))}
              </div>
            </GlassCard>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-10 -left-8 w-52"
            >
              <GlassCard accent="teal" hover={false} className="p-4">
                <p className="text-xs text-haze-400">Attendance</p>
                <p className="font-display text-2xl font-semibold text-orbit-teal">95%</p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/8">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '95%' }}
                    transition={{ duration: 1.2, delay: 0.6 }}
                    className="h-full rounded-full bg-orbit-teal"
                  />
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
              className="absolute -right-6 -top-8 w-44"
            >
              <GlassCard accent="amber" hover={false} className="p-4">
                <p className="text-xs text-haze-400">CGPA</p>
                <p className="font-display text-2xl font-semibold text-orbit-amber">8.6</p>
                <p className="mt-1 text-[11px] text-orbit-teal">+0.2 this sem</p>
              </GlassCard>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Modules strip */}
      <section id="modules" className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <Eyebrow>Modules</Eyebrow>
        <h2 className="mt-3 font-display text-3xl font-semibold text-haze-100 sm:text-4xl">
          Four campus systems. One orbit.
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link to={m.to}>
                <GlassCard accent={m.accent} className="flex h-full flex-col justify-between p-6">
                  <m.icon size={22} className="text-haze-100" />
                  <div className="mt-8">
                    <p className="font-display text-lg font-semibold text-haze-100">{m.label}</p>
                    <p className="mt-1 number-mono text-xs text-haze-400">{m.metric}</p>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <Eyebrow>Why Orbit</Eyebrow>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-haze-100 sm:text-4xl">
          Built like a product, not a portal.
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <GlassCard accent={f.accent} className="h-full p-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/6">
                  <f.icon size={20} className="text-haze-100" />
                </span>
                <p className="mt-5 font-display text-lg font-semibold text-haze-100">{f.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-haze-400">{f.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="about" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <GlassCard accent="violet" hover={false} className="flex flex-col items-center gap-6 p-12 text-center">
          <Eyebrow>Ready when you are</Eyebrow>
          <h2 className="max-w-xl font-display text-3xl font-semibold text-haze-100 sm:text-4xl">
            Step into your campus, all in one place.
          </h2>
          <Link to="/dashboard">
            <Button variant="primary" icon={ArrowRight}>Open Dashboard</Button>
          </Link>
        </GlassCard>
      </section>

      <footer className="mx-auto max-w-7xl px-6 pb-10 text-center text-xs text-haze-400 lg:px-10">
        Orbit — Smart Campus Hub · Built for Frontend Wars · Frontend only, mock data
      </footer>
    </div>
  );
}
