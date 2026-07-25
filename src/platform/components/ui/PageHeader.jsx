import React from 'react';
import { motion } from 'framer-motion';
import { Eyebrow } from './Badge.jsx';

export default function PageHeader({ eyebrow, title, description, action }) {
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        {eyebrow && <Eyebrow className="mb-2">{eyebrow}</Eyebrow>}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl font-semibold tracking-tight text-haze-100 sm:text-4xl"
        >
          {title}
        </motion.h1>
        {description && <p className="mt-2 max-w-xl text-sm text-haze-400">{description}</p>}
      </div>
      {action}
    </div>
  );
}
