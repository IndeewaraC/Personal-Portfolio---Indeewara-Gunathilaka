import React from 'react';
import { motion } from 'framer-motion';
import { IDS } from '../../locators/testIds';
import { personalData } from '../../data/config';
import linkedinData from '../../data/linkedin.json';
import profileImage from '../../media/images/profile.png';

const Hero = ({ delay, className = '' }) => {
  // Use LinkedIn data if available, fallback to config
  const name = linkedinData.profileInfo?.firstName ? `${linkedinData.profileInfo.firstName} ${linkedinData.profileInfo.lastName}` : personalData.profile.name;
  const headline = (
    <>
      Software Quality Automation Engineer | AI Agent Testing | <br className="hidden md:block" />
      Playwright & Modern Frameworks | Automated & Manual QA | <br className="hidden md:block" />
      Open to Work in Canada
    </>
  );

  return (
    <motion.div
      className={`${className}`}
      data-testid={IDS.boxes.hero}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 flex-wrap-reverse justify-center">
        <div className="flex-1 min-w-[min(100%,300px)] text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-10 text-white tracking-tight">
            Hi, I'm <span className="text-indigo-500">{name}</span> 👋
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: delay + 0.2 }}
            className="mb-10"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-indigo-500 to-purple-500 leading-snug drop-shadow-sm pb-2">
              {headline}
            </h2>
          </motion.div>
        </div>

        {/* Profile Image */}
        <div className="w-64 h-64 md:w-[320px] md:h-[320px] lg:w-[380px] lg:h-[380px] rounded-full overflow-hidden border-[3px] border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)] shrink-0 bg-white/5 flex items-center justify-center text-center text-xs text-zinc-400">
          <img
            src={profileImage}
            alt={name}
            className="w-full h-full object-cover object-center scale-[0.99] origin-[center_28%]"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div className="hidden p-4">
            Add <b>profile.jpg</b><br />to the <b>public/</b> folder
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
