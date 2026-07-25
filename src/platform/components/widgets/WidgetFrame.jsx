import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '../ui/GlassCard.jsx';

export default function WidgetFrame({ title, subtitle, accent = 'violet', to, className = '', children, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className={className}
    >
      <GlassCard accent={accent} className="flex h-full flex-col p-5">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="font-display text-sm font-semibold text-haze-100">{title}</p>
            {subtitle && <p className="mt-0.5 text-xs text-haze-400">{subtitle}</p>}
          </div>
          {to && (
            <Link
              to={to}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-haze-400 transition-colors hover:bg-white/10 hover:text-haze-100"
            >
              <ArrowUpRight size={14} />
            </Link>
          )}
        </div>
        <div className="flex-1">{children}</div>
      </GlassCard>
    </motion.div>
  );
}
