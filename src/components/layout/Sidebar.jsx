import React, { useState, useEffect } from 'react';
import { personalData } from '../../data/config';
import linkedinData from '../../data/linkedin.json';
import profileImage from '../../media/images/profile.png';
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  
  const name = linkedinData.profileInfo?.firstName ? `${linkedinData.profileInfo.firstName} ${linkedinData.profileInfo.lastName}` : personalData.profile.name;

  const closeSidebar = () => setIsOpen(false);

  // Set up intersection observer for scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the visible section that takes up the most space
        let maxVisible = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!maxVisible || entry.intersectionRatio > maxVisible.intersectionRatio) {
              maxVisible = entry;
            }
          }
        });

        if (maxVisible) {
          setActiveSection(maxVisible.target.id);
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -80% 0px', // Triggers when section hits the top 20% of the screen
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    const sections = ['about', 'experience', 'projects', 'education', 'certifications', 'tech-stack', 'testimonials', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const getLinkClasses = (sectionId) => {
    const isActive = activeSection === sectionId;
    return `px-4 py-3 rounded-lg transition-colors text-center ${isActive ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:text-white hover:bg-indigo-500/50'}`;
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-indigo-600 text-white p-4 flex justify-between items-center z-50 shadow-md">
        <span className="font-bold text-lg">{name}</span>
        <button onClick={() => setIsOpen(!isOpen)} className="text-2xl focus:outline-none">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Sidebar Container */}
      <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 w-64 bg-indigo-600 text-white transition-transform duration-300 ease-in-out z-40 flex flex-col md:static md:h-screen md:sticky md:top-0`}>
        
        <div className="flex-1 flex flex-col pt-20 md:pt-10 pb-8 px-6 overflow-y-auto">
          
          {/* Profile Area */}
          <div className={`flex flex-col items-center shrink-0 transition-all duration-500 ease-in-out origin-top ${activeSection === 'about' ? 'opacity-0 max-h-0 overflow-hidden mb-0 scale-95' : 'opacity-100 max-h-[300px] mb-10 scale-100'}`}>
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-400 mb-4 bg-white/10 shadow-xl">
              <img
                src={profileImage}
                alt={name}
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="hidden text-xs text-center p-4 text-white/50 h-full flex flex-col justify-center">
                Add profile.jpg to public/
              </div>
            </div>
            <h1 className="text-xl font-bold text-center tracking-tight leading-tight">{name}</h1>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2 font-semibold text-sm uppercase tracking-wider w-full mb-auto">
            {['about', 'experience', 'projects', 'education', 'certifications', 'tech-stack', 'testimonials', 'contact'].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={(e) => {
                  e.preventDefault();
                  closeSidebar();
                  const element = document.getElementById(section);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={getLinkClasses(section)}
              >
                {section === 'tech-stack' ? 'Expertise' : section.replace('-', ' ')}
              </a>
            ))}
          </nav>

          {/* Social Links Footer */}
          <div className="flex justify-center gap-4 mt-10 shrink-0">
            <a href={personalData.links.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-indigo-700 flex items-center justify-center text-white hover:bg-white hover:text-indigo-600 transition-colors">
              <FaLinkedin size={18} />
            </a>
            <a href={personalData.links.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-indigo-700 flex items-center justify-center text-white hover:bg-white hover:text-indigo-600 transition-colors">
              <FaGithub size={18} />
            </a>
            <a href={`mailto:${personalData.profile.email}`} className="w-10 h-10 rounded-full bg-indigo-700 flex items-center justify-center text-white hover:bg-white hover:text-indigo-600 transition-colors">
              <FaEnvelope size={18} />
            </a>
          </div>

        </div>
      </div>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
