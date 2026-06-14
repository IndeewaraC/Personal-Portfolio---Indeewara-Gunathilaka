import React from 'react';
import { motion } from 'framer-motion';

const AboutMe = ({ delay, className = '' }) => {
  return (
    <motion.div
      className={`flex flex-col gap-4 justify-center ${className}`}
      data-testid="box-aboutme"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold mb-1 text-white">About Me</h3>

      <ul className="flex flex-col gap-3 m-0 p-0 list-none">
        <li className="flex items-center gap-3 text-white/90 text-[0.95rem]">
          <span className="text-xl shrink-0">🚀</span>
          <span>4+ Years QA Automation Experience</span>
        </li>
        <li className="flex items-center gap-3 text-white/90 text-[0.95rem]">
          <span className="text-xl shrink-0">🛠️</span>
          <span>Modern Test Frameworks (Playwright, Cypress)</span>
        </li>
        <li className="flex items-center gap-3 text-white/90 text-[0.95rem]">
          <span className="text-xl shrink-0">💻</span>
          <span>SDET & AI Security Testing</span>
        </li>
      </ul>
    </motion.div>
  );
};

export default AboutMe;
