import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, GraduationCap, CalendarCheck, UtensilsCrossed, BookOpen } from 'lucide-react';

const links = [
  { to: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { to: '/grades', label: 'Grades', icon: GraduationCap },
  { to: '/attendance', label: 'Attend.', icon: CalendarCheck },
  { to: '/canteen', label: 'Canteen', icon: UtensilsCrossed },
  { to: '/library', label: 'Library', icon: BookOpen },
];

export default function MobileNav() {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-between rounded-3xl border border-white/10 bg-ink-900/85 px-2 py-2 shadow-card backdrop-blur-2xl lg:hidden">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className="relative flex flex-1 flex-col items-center gap-1 rounded-2xl py-2 text-[10px] font-medium"
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.span
                  layoutId="mobile-active"
                  className="absolute inset-1 rounded-xl bg-orbit-violet/20"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              <link.icon
                size={18}
                strokeWidth={2}
                className={`relative z-10 ${isActive ? 'text-orbit-violetSoft' : 'text-haze-400'}`}
              />
              <span className={`relative z-10 ${isActive ? 'text-haze-100' : 'text-haze-400'}`}>{link.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
