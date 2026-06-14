import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PageLink = ({ title, description, to, delay, colSpan = 1 }) => {
  return (
    <motion.div 
      className={`flex flex-col justify-center cursor-pointer group ${colSpan > 1 ? `span-${colSpan}-col` : ''}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <Link to={to} className="no-underline text-inherit flex flex-col h-full">
        <div className="flex justify-between items-center mb-[10px]">
          <h3 className="m-0 text-[#f0f0f5]">{title}</h3>
          <span className="text-indigo-500 text-[1.2rem] transition-transform duration-300 group-hover:translate-x-1">â†’</span>
        </div>
        <p className="m-0 text-[0.85rem] text-zinc-400 leading-[1.4]">
          {description}
        </p>
      </Link>
    </motion.div>
  );
};

export default PageLink;
