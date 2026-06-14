import React from 'react';
import { motion } from 'framer-motion';
import { IDS } from '../../locators/testIds';
import linkedinData from '../../data/linkedin.json';
import { extractContextualSkills } from '../../utils/skillExtractor';

const ExperienceTimeline = ({ delay }) => {
  const experiences = linkedinData.experience || [];

  return (
    <motion.div 
      className=""
      data-testid={IDS.boxes.experience}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <h3 className="text-3xl font-bold mb-8 text-white">Experience</h3>
      <div className="flex flex-col gap-10">
        {experiences.map((job) => {
          return (
            <div key={job.id} className="border-l-4 border-indigo-500/50 pl-6 py-2">
              <h4 className="m-0 mb-1 text-2xl font-bold text-white">{job.role}</h4>
              <p className="m-0 mb-1 text-lg font-medium text-indigo-400">{job.company}</p>
              <p className="m-0 mb-4 text-sm font-semibold text-zinc-400 uppercase tracking-wider">{job.duration}</p>
              
              {Array.isArray(job.description) ? (
                <ul className="m-0 mb-6 pl-5 text-base leading-relaxed text-zinc-300 list-disc marker:text-indigo-500">
                  {job.description.map((bullet, i) => (
                    <li key={i} className="mb-2">{bullet}</li>
                  ))}
                </ul>
              ) : (
                <p className="m-0 mb-6 text-base leading-relaxed text-zinc-300">
                  {job.description}
                </p>
              )}

              {extractContextualSkills(Array.isArray(job.description) ? job.description.join(' ') : job.description).length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {extractContextualSkills(Array.isArray(job.description) ? job.description.join(' ') : job.description).map((tech, idx) => (
                    <span key={idx} className="text-xs px-3 py-1 font-medium bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-300">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ExperienceTimeline;
