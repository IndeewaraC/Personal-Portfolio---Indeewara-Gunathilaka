import React from 'react';
import { motion } from 'framer-motion';
import { IDS } from '../../locators/testIds';
import linkedinData from '../../data/linkedin.json';
import { extractContextualSkills } from '../../utils/skillExtractor';

const ProjectsList = ({ delay }) => {
  const projectsData = linkedinData.projects || [];

  // Sort projects in descending order based on the start date (newest first)
  const sortedProjects = [...projectsData].sort((a, b) => {
    const parseDate = (str) => {
      if (!str) return 0;
      const cleanStr = str.split('-')[0].trim();
      const parsed = Date.parse(cleanStr);
      return isNaN(parsed) ? 0 : parsed;
    };
    return parseDate(b.duration) - parseDate(a.duration);
  });

  return (
    <motion.div 
      className=""
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      data-testid={IDS.boxes.projects}
    >
      <h3 className="text-3xl font-bold mb-8 text-white">Key Projects</h3>
      <div className="flex flex-col gap-10">
        {sortedProjects.map((project) => (
          <div key={project.id} className="pb-8 border-b border-white/10">
            <h4 className="text-2xl font-bold mb-2 text-white">{project.title}</h4>
            
            <div className="flex justify-between items-center mb-4 text-base">
              <span className="text-indigo-400 font-medium text-lg">{project.organization || ''}</span>
              <span className="text-zinc-400 font-semibold tracking-wider uppercase text-sm">{project.duration}</span>
            </div>
            

            
            {Array.isArray(project.description) ? (
              <ul className="m-0 mb-6 pl-5 text-base leading-relaxed text-zinc-300 list-disc marker:text-indigo-500">
                {project.description.map((bullet, i) => (
                  <li key={i} className="mb-2">{bullet}</li>
                ))}
              </ul>
            ) : (
              <p className="text-base text-zinc-300 mb-6 m-0 leading-relaxed">{project.description}</p>
            )}
            
            {/* Dynamic Skill Badges */}
            <div className="flex flex-wrap gap-2 mt-2">
              {extractContextualSkills(Array.isArray(project.description) ? project.description.join(' ') : project.description).map((skill, idx) => (
                <span key={idx} className="tech-badge text-xs px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full border border-indigo-500/20 font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectsList;
