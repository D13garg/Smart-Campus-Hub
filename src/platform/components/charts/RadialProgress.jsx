import React from 'react';
import { motion } from 'framer-motion';

export default function RadialProgress({ value = 0, size = 96, stroke = 9, color = '#7C6CF6', label, sub }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-lg font-semibold text-haze-100">{label}</span>
        {sub && <span className="text-[10px] text-haze-400">{sub}</span>}
      </div>
    </div>
  );
}
