import React from 'react';
import { motion } from 'framer-motion';
import linkedinData from '../../data/linkedin.json';

const EducationList = ({ delay }) => {
  const educationList = linkedinData.education || [];

  return (
    <motion.div 
      className=""
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <h3 className="text-3xl font-bold mb-8 text-white">Education</h3>
      <div className="flex flex-col gap-6">
        {educationList.map((edu) => (
          <div key={edu.id} className="flex flex-col gap-2">
            <h4 className="text-2xl font-bold m-0 text-white">{edu.degree}</h4>
            <span className="text-lg text-zinc-300 font-medium">{edu.institution}</span>
            <span className="text-sm font-semibold tracking-wider uppercase text-indigo-400">{edu.year}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default EducationList;
