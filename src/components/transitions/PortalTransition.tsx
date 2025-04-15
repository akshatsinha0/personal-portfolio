// src/components/transitions/PortalTransition.tsx
'use client';
import { useMotionValue, motion, animate } from 'framer-motion';
import { useEffect } from 'react';

export const PortalTransition = ({ active }: { active: boolean }) => {
  const radius = useMotionValue(0);

  useEffect(() => {
    if (active) {
      animate(radius, 100, {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      });
    } else {
      radius.set(0);
    }
  }, [active]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none"
      style={{
        maskImage: `radial-gradient(circle at 50% 50%, black ${radius}%, transparent ${radius}%)`,
        WebkitMaskImage: `radial-gradient(circle at 50% 50%, black ${radius}%, transparent ${radius}%)`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500" />
    </motion.div>
  );
};
