import React from 'react';
import { motion } from 'framer-motion';

function FadeIn({ children, delay = 0, duration = 0.4, x = 0, y = 20, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-20px', amount: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
export default FadeIn;