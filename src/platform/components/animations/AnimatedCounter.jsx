import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function AnimatedCounter({ value, prefix = '', suffix = '', decimals = 0, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { damping: 22, stiffness: 90 });
  const display = useTransform(spring, (latest) => `${prefix}${latest.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, value, motionVal]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
