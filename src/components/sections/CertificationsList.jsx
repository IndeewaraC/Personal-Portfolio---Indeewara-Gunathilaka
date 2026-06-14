import React from 'react';
import { motion } from 'framer-motion';
import linkedinData from '../../data/linkedin.json';

const CertificationsList = ({ delay }) => {
  const certs = linkedinData.certifications || [];

  return (
    <motion.div 
      className=""
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <h3 className="text-3xl font-bold mb-8 text-white">Certifications</h3>
      <div className="flex flex-col gap-6 pr-2">
        {certs.map((cert) => (
          <div key={cert.id} className="flex flex-col gap-2">
            <h4 className="text-xl font-bold m-0 text-white">
              {cert.url ? <a href={cert.url} target="_blank" rel="noreferrer" className="text-inherit no-underline hover:text-indigo-400 transition-colors">{cert.name} 🔗</a> : cert.name}
            </h4>
            <span className="text-base text-zinc-400 font-medium">{cert.authority}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CertificationsList;
