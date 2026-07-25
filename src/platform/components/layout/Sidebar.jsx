import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  GraduationCap,
  CalendarCheck,
  UtensilsCrossed,
  BookOpen,
  LayoutGrid,
  Settings,
  Orbit,
  LogOut,
} from 'lucide-react';

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/grades', label: 'Grades', icon: GraduationCap },
  { to: '/attendance', label: 'Attendance', icon: CalendarCheck },
  { to: '/canteen', label: 'Canteen', icon: UtensilsCrossed },
  { to: '/library', label: 'Library', icon: BookOpen },
  { to: '/customize', label: 'Widgets', icon: LayoutGrid },
  { to: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[84px] flex-col items-center justify-between border-r border-white/8 bg-ink-950/60 py-6 backdrop-blur-xl lg:flex">
      <div className="flex flex-col items-center gap-8">
        <NavLink to="/" className="group relative flex h-11 w-11 items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border border-dashed border-orbit-violet/40"
          />
          <Orbit className="text-orbit-violetSoft" size={22} strokeWidth={2} />
        </NavLink>

        <nav className="flex flex-col items-center gap-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `group relative flex h-11 w-11 items-center justify-center rounded-2xl transition-colors duration-200 ${
                  isActive ? 'text-white' : 'text-haze-400 hover:text-haze-100'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orbit-violet/80 to-orbit-violet/30 shadow-glow"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  <link.icon size={19} strokeWidth={2} className="relative z-10" />
                  <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg bg-ink-800 px-2.5 py-1.5 text-xs font-medium text-haze-100 opacity-0 shadow-card transition-opacity duration-150 group-hover:opacity-100">
                    {link.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <NavLink
        to="/"
        className="group relative flex h-11 w-11 items-center justify-center rounded-2xl text-haze-400 transition-colors hover:text-orbit-rose"
      >
        <LogOut size={19} strokeWidth={2} />
        <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg bg-ink-800 px-2.5 py-1.5 text-xs font-medium text-haze-100 opacity-0 shadow-card transition-opacity duration-150 group-hover:opacity-100">
          Exit to Home
        </span>
      </NavLink>
    </aside>
  );
}
