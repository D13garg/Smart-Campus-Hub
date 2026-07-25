import React from 'react';
import { motion } from 'framer-motion';

export default function BarRow({ label, percent, color = '#7C6CF6', delay = 0 }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="text-haze-300">{label}</span>
        <span className="number-mono text-haze-400">{percent}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/6">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}
