import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import MobileNav from './MobileNav.jsx';
import Navbar from './Navbar.jsx';
import CommandPalette from './CommandPalette.jsx';
import AuroraBackground from '../animations/AuroraBackground.jsx';
import useCommandPalette from '../../hooks/useCommandPalette.js';
import useTheme from '../../hooks/useTheme.js';

export default function AppShell() {
  const location = useLocation();
  const { open, setOpen } = useCommandPalette();
  const { theme, toggle } = useTheme();

  return (
    <div className="relative min-h-screen">
      <AuroraBackground />
      <Sidebar />
      <div className="lg:pl-[84px]">
        <Navbar onOpenPalette={() => setOpen(true)} theme={theme} onToggleTheme={toggle} />
        <main className="mx-auto max-w-[1400px] px-5 pb-28 pt-6 lg:px-8 lg:pb-10">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
      <MobileNav />
      <CommandPalette open={open} setOpen={setOpen} />
    </div>
  );
}
