import React from 'react';
import { motion } from 'framer-motion';
import { IDS } from '../../locators/testIds';
import personalInfo from '../../data/personalInfo.json';
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt, FaFileDownload } from 'react-icons/fa';

const Contact = ({ delay, className = '' }) => {
  return (
    <motion.div
      className={`flex flex-col gap-4 ${className}`}
      data-testid={IDS.boxes.contact}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
    >

      <div className="flex flex-col gap-4 h-full justify-center">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-semibold text-white"></h3>
        </div>

        {/* Location Row */}
        <div className="flex items-center gap-3">
          <FaMapMarkerAlt className="text-xl text-rose-500 shrink-0" />
          <span className="text-white/90 text-[0.95rem]">
            {personalInfo.location} ({personalInfo.timezone})
          </span>
        </div>

        {/* Email Row */}
        <div className="flex items-center gap-3">
          <FaEnvelope className="text-xl text-sky-400 shrink-0" />
          <a href={`mailto:${personalInfo.email}`} className="text-indigo-400 no-underline text-[0.95rem] break-all hover:text-indigo-300 transition-colors">
            {personalInfo.email}
          </a>
        </div>

        {/* LinkedIn Row */}
        <div className="flex items-center gap-3">
          <FaLinkedin className="text-xl text-[#0A66C2] shrink-0" />
          <a href={personalInfo.links.linkedin} target="_blank" rel="noreferrer" className="text-indigo-400 no-underline text-[0.95rem] hover:text-indigo-300 transition-colors">
            LinkedIn
          </a>
        </div>

        {/* GitHub Row */}
        <div className="flex items-center gap-3">
          <FaGithub className="text-xl text-white shrink-0" />
          <a href={personalInfo.links.github} target="_blank" rel="noreferrer" className="text-indigo-400 no-underline text-[0.95rem] hover:text-indigo-300 transition-colors">
            GitHub
          </a>
        </div>

        {/* Resume Row */}
        <div className="flex items-center gap-3 mt-1">
          <FaFileDownload className="text-xl text-emerald-500 shrink-0" />
          <a href={personalInfo.links.resume} target="_blank" rel="noreferrer" className="text-emerald-500 no-underline text-[0.95rem] font-bold hover:text-emerald-400 transition-colors">
            Download Resume
          </a>
        </div>

      </div>
    </motion.div>
  );
};

export default Contact;
