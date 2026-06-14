import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IDS } from '../../locators/testIds';
import linkedinData from '../../data/linkedin.json';

const Testimonials = ({ delay }) => {
  const testimonials = linkedinData.testimonials || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 8000); // cycle every 8 seconds since these are quite long
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <motion.div 
      className="flex flex-col justify-center"
      data-testid={IDS.boxes.testimonial}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold m-0 text-white">Recommendations</h3>
        <span className="text-sm font-semibold tracking-wider text-indigo-500">
          {currentIndex + 1} / {testimonials.length}
        </span>
      </div>
      
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <p className="italic text-xl md:text-2xl text-slate-100 mb-4 font-medium leading-relaxed">
                "{current.quote || current.text.substring(0, 100) + '...'}"
              </p>
              
              <details className="text-base text-zinc-300">
                <summary className="cursor-pointer text-indigo-400 font-medium inline-block mb-2 hover:text-indigo-300 transition-colors">
                  Read full recommendation
                </summary>
                <div className="mt-3 p-4 bg-white/5 rounded-lg border-l-4 border-indigo-500 leading-relaxed">
                  {current.text}
                </div>
              </details>
            </div>
            <div className="flex items-center gap-4 mt-8">
              <div className="w-12 h-12 rounded-full bg-indigo-900/50 border border-indigo-500/30 flex items-center justify-center text-xl font-bold text-indigo-300">
                {current.name.charAt(0)}
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-lg font-bold leading-snug">
                  {current.linkedinUrl ? (
                    <a href={current.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-white hover:text-indigo-400 transition-colors no-underline">
                      {current.name}
                    </a>
                  ) : (
                    <span className="text-white">{current.name}</span>
                  )}
                </div>
                <div className="text-sm text-zinc-400 mt-1 font-medium leading-snug">{current.role}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Testimonials;
