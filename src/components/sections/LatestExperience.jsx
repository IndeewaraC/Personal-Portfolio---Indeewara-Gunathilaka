import React from 'react';
import { motion } from 'framer-motion';
import linkedinData from '../../data/linkedin.json';

const LatestExperience = ({ delay, className = '' }) => {
  // Grab the very first experience item
  const recentJob = linkedinData.experience[0];

  return (
    <motion.div
      className={`flex flex-col gap-3 ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="flex justify-between items-start mb-1">
        <h3 className="text-xl font-semibold text-white m-0">Recent Experience</h3>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
          Current Role
        </span>
      </div>
      
      <div className="flex flex-col gap-1">
        <h4 className="text-[1.1rem] text-indigo-400 font-semibold m-0">{recentJob.role}</h4>
        <div className="flex items-center gap-2 text-[0.85rem] text-white/60 font-medium">
          <span>{recentJob.company}</span>
          <span>â€¢</span>
          <span>{recentJob.duration}</span>
        </div>
      </div>
      
      <p className="text-[0.95rem] text-white/80 m-0 leading-relaxed mt-2 overflow-hidden text-ellipsis display-webkit-box webkit-line-clamp-2 webkit-box-orient-vertical">
        {recentJob.description[0]}
      </p>
    </motion.div>
  );
};

export default LatestExperience;
