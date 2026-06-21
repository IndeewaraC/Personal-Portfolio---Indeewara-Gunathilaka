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

      <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-xl p-6 mb-6 shadow-lg backdrop-blur-sm">
        <p className="text-white/90 leading-loose text-[0.95rem] text-justify">
          I am a <span className="text-indigo-300 font-medium">Software Quality Assurance Engineer</span> and <span className="text-indigo-300 font-medium">Application Support Specialist</span> dedicated to driving software excellence through robust automation and proactive defect management. Combining a Master of Information Technology with hands on expertise in validating complex enterprise systems including <span className="text-indigo-300 font-medium">AI driven conversational platforms</span>, I specialize in bridging the gap between end user needs and technical execution. By championing a <span className="text-indigo-300 font-medium">shift left testing approach</span>, I ensure quality is engineered from the ground up, mitigating risks early in the software development lifecycle (SDLC) and maximizing system reliability.
        </p>
      </div>

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
