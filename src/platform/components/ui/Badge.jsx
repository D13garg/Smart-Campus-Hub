import React from 'react';

const tones = {
  violet: 'bg-orbit-violet/15 text-orbit-violetSoft border-orbit-violet/30',
  teal: 'bg-orbit-teal/15 text-orbit-teal border-orbit-teal/30',
  amber: 'bg-orbit-amber/15 text-orbit-amber border-orbit-amber/30',
  rose: 'bg-orbit-rose/15 text-orbit-rose border-orbit-rose/30',
  neutral: 'bg-white/8 text-haze-300 border-white/15',
};

export function Badge({ children, tone = 'neutral', className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function Eyebrow({ children, className = '' }) {
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.2em] text-orbit-teal ${className}`}>{children}</p>
  );
}
