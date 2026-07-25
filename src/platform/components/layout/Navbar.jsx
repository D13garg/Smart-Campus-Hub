import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Bell, Moon, Sun, Command } from 'lucide-react';
import { student, notifications } from '../../data/campusData.js';

export default function Navbar({ onOpenPalette, theme, onToggleTheme }) {
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-white/6 bg-ink-900/70 px-5 py-4 backdrop-blur-xl lg:px-8">
      <div className="hidden flex-col sm:flex">
        <p className="font-display text-lg font-semibold text-haze-100">
          Welcome back, <span className="text-gradient">{student.name.split(' ')[0]}</span>
        </p>
        <p className="text-xs text-haze-400">{student.program} · {student.year}</p>
      </div>

      <button
        onClick={onOpenPalette}
        className="flex flex-1 items-center gap-2 rounded-full glass px-4 py-2.5 text-sm text-haze-400 transition-colors hover:border-white/20 sm:max-w-xs"
      >
        <Search size={15} />
        <span className="hidden sm:inline">Search anything…</span>
        <span className="ml-auto hidden items-center gap-1 sm:flex">
          <Command size={11} />
          <span className="text-[11px]">K</span>
        </span>
      </button>

      <div className="flex items-center gap-2 sm:gap-3">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onToggleTheme}
          className="flex h-10 w-10 items-center justify-center rounded-full glass text-haze-300 transition-colors hover:text-orbit-amber"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
        </motion.button>

        <Link
          to="/notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-full glass text-haze-300 transition-colors hover:text-orbit-teal"
        >
          <Bell size={16} />
          {unread > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-orbit-rose text-[9px] font-bold text-white">
              {unread}
            </span>
          )}
        </Link>

        <Link to="/profile" className="flex items-center gap-2 rounded-full glass py-1 pl-1 pr-3 hover:border-white/20">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orbit-violet to-orbit-teal text-xs font-bold text-white">
            {student.avatarInitials}
          </span>
          <span className="hidden text-xs font-medium text-haze-100 md:inline">{student.rollNo}</span>
        </Link>
      </div>
    </header>
  );
}
