import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function AnimatedWord({ word, index, total, scrollYProgress }) {
  const enterStart = (index / total) * 0.3;
  const enterEnd = enterStart + (1 / total) * 0.3;

  const exitStart = 0.7 + (index / total) * 0.3;
  const exitEnd = exitStart + (1 / total) * 0.3;

  const opacity = useTransform(
    scrollYProgress,
    [enterStart, enterEnd, exitStart, exitEnd],
    [0.15, 1, 1, 0.15]
  );

  return (
    <motion.span
      style={{
        display: 'inline',
        whiteSpace: 'normal',
        opacity
      }}
    >
      {word}{' '}
    </motion.span>
  );
}

function AnimatedText({ text, className = '', style = {} }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.1']
  });

  const words = text.split(' ');

  return (
    <p ref={ref} className={className} style={{ ...style, wordBreak: 'normal', overflowWrap: 'normal' }}>
      {words.map((word, index) => (
        <AnimatedWord
          key={index}
          word={word}
          index={index}
          total={words.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </p>
  );
}
export default AnimatedText;