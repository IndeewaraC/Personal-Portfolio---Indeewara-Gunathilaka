import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { personalData } from '../data/config';

const CommandPalette = ({ isTechnical, setIsTechnical }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Handle Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleScroll = (id) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const commands = [
    { id: 1, name: 'Toggle Technical Mode', action: () => setIsTechnical(!isTechnical), icon: '💻' },
    { id: 2, name: 'Go to About', action: () => handleScroll('about'), icon: '🏠' },
    { id: 3, name: 'View Experience', action: () => handleScroll('experience'), icon: '💼' },
    { id: 4, name: 'View Projects', action: () => handleScroll('projects'), icon: '🚀' },
    { id: 6, name: 'View Education', action: () => handleScroll('education'), icon: '🎓' },
    { id: 7, name: 'View Certifications', action: () => handleScroll('certifications'), icon: '📜' },
    { id: 8, name: 'Download Resume', action: () => window.open(personalData.links.resume, '_blank'), icon: '📄' },
    { id: 9, name: 'View LinkedIn', action: () => window.open(personalData.links.linkedin, '_blank'), icon: '🔗' },
    { id: 10, name: 'Email Me', action: () => window.location.href = `mailto:${personalData.profile.email}`, icon: '✉️' },
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className={`fixed top-[20%] left-1/2 -translate-x-1/2 w-[90%] max-w-[600px] rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] z-[9999] overflow-hidden ${
              isTechnical 
                ? 'bg-black border border-[#333] font-mono' 
                : 'bg-[#1e1e2e] border border-white/10 font-sans'
            }`}
          >
            <div className="p-[15px] border-b border-white/10">
              <input 
                autoFocus
                type="text"
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent border-none text-white text-[1.1rem] outline-none font-inherit"
              />
            </div>
            
            <div className="max-h-[300px] overflow-y-auto py-2.5">
              {filteredCommands.length === 0 ? (
                <div className="px-5 py-[15px] text-[#888]">No commands found.</div>
              ) : (
                filteredCommands.map((cmd) => (
                  <div 
                    key={cmd.id}
                    onClick={() => {
                      cmd.action();
                      setIsOpen(false);
                      setSearch('');
                    }}
                    className="flex items-center gap-3 px-5 py-3 cursor-pointer text-[#ddd] transition-colors hover:bg-white/5"
                  >
                    <span>{cmd.icon}</span>
                    <span>{cmd.name}</span>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
