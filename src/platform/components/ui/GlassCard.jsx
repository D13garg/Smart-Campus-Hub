import React from 'react';
import { motion } from 'framer-motion';

const accentBar = {
  violet: 'from-orbit-violet to-orbit-violetSoft',
  teal: 'from-orbit-teal to-emerald-300',
  amber: 'from-orbit-amber to-yellow-300',
  rose: 'from-orbit-rose to-pink-300',
  none: 'from-transparent to-transparent',
};

export default function GlassCard({
  children,
  className = '',
  accent = 'none',
  hover = true,
  as: Comp = motion.div,
  ...props
}) {
  return (
    <Comp
      className={`relative overflow-hidden rounded-xl2 glass shadow-card ${
        hover ? 'transition-transform duration-300 hover:-translate-y-1 hover:shadow-glow' : ''
      } ${className}`}
      {...props}
    >
      {accent !== 'none' && (
        <span className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${accentBar[accent]}`} />
      )}
      {children}
    </Comp>
  );
}
