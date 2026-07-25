import React from 'react';
import { motion } from 'framer-motion';

export default function Sparkline({ data = [], color = '#2DD8C4', width = 100, height = 32 }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1 || 1);

  const points = data.map((d, i) => `${i * step},${height - ((d - min) / range) * height}`).join(' ');

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <motion.polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </svg>
  );
}
