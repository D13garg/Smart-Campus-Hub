import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  primary:
    'bg-gradient-to-r from-orbit-violet to-orbit-violetSoft text-white shadow-glow hover:brightness-110',
  ghost: 'glass text-haze-100 hover:border-white/20',
  teal: 'bg-gradient-to-r from-orbit-teal to-emerald-300 text-ink-950 shadow-glowTeal hover:brightness-105',
  subtle: 'bg-white/5 text-haze-100 hover:bg-white/10 border border-white/10',
};

export default function Button({ children, variant = 'primary', className = '', icon: Icon, ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-colors duration-200 ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={16} strokeWidth={2.25} />}
      {children}
    </motion.button>
  );
}
