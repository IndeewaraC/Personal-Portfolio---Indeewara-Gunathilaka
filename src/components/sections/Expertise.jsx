import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import linkedinData from '../../data/linkedin.json';

const Expertise = ({ delay, className = '' }) => {
  const allSkills = linkedinData.skills || [];

  const categorizedSkills = useMemo(() => {
    const categories = {
      qa: [],
      leadership: [],
      soft: [],
      technical: [],
    };

    const qaKeywords = ['qa', 'test', 'selenium', 'playwright', 'cucumber', 'bdd', 'bug', 'jmeter', 'postman', 'defect', 'quality', 'automation', 'cross-browser'];
    const leadKeywords = ['lead', 'manage', 'stakeholder', 'team', 'train', 'customer', 'client', 'service', 'support', 'erp', 'analysis', 'business'];
    const softKeywords = ['collaborat', 'think', 'organiz', 'detail', 'teamwork', 'analytic', 'troubleshoot', 'communication', 'attention'];

    allSkills.forEach((s) => {
      const name = s.name.toLowerCase();
      if (qaKeywords.some(k => name.includes(k))) {
        categories.qa.push(s.name);
      } else if (softKeywords.some(k => name.includes(k))) {
        categories.soft.push(s.name);
      } else if (leadKeywords.some(k => name.includes(k))) {
        categories.leadership.push(s.name);
      } else {
        categories.technical.push(s.name);
      }
    });

    return categories;
  }, [allSkills]);

  const SkillBox = ({ title, skills }) => (
    <div className="bg-indigo-900/10 border border-indigo-500/20 p-6 rounded-xl flex-1 min-w-[280px]">
      <h3 className="text-xl font-bold mb-4 text-indigo-400">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <span key={idx} className="px-3 py-1 bg-white/5 hover:bg-white/10 transition-colors text-slate-300 text-sm font-medium rounded-full border border-white/10">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div
      className={`flex flex-col gap-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SkillBox title="QA & Testing Skills" skills={categorizedSkills.qa} />
        <SkillBox title="Technical Skills" skills={categorizedSkills.technical} />
        <SkillBox title="Leadership & Management" skills={categorizedSkills.leadership} />
        <SkillBox title="Soft Skills" skills={categorizedSkills.soft} />
      </div>
    </motion.div>
  );
};

export default Expertise;
