import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Ambient drifting mesh + soft particle field. Purely decorative, sits behind all page content.
export default function AuroraBackground({ variant = 'default' }) {
  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        size: 2 + Math.random() * 3,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 8 + Math.random() * 10,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink-900">
      <div className="absolute inset-0 bg-aurora-mesh animate-drift opacity-90" />
      <div
        className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full blur-3xl opacity-30"
        style={{ background: 'radial-gradient(circle, #7C6CF6 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-1/3 -right-32 h-[26rem] w-[26rem] rounded-full blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, #2DD8C4 0%, transparent 70%)' }}
      />
      {variant === 'hero' && (
        <div
          className="absolute bottom-0 left-1/2 h-[24rem] w-[46rem] -translate-x-1/2 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #FBBF5A 0%, transparent 70%)' }}
        />
      )}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-white/40"
          style={{ width: p.size, height: p.size, top: `${p.top}%`, left: `${p.left}%` }}
          animate={{ opacity: [0.1, 0.6, 0.1], y: [0, -18, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      <div className="noise-overlay" />
    </div>
  );
}
