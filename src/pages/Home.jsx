import Hero from '../components/sections/Hero';
import Contact from '../components/sections/Contact';
import AboutMe from '../components/sections/AboutMe';
import Expertise from '../components/sections/Expertise';
import Testimonials from '../components/sections/Testimonials';
import ExperienceTimeline from '../components/sections/ExperienceTimeline';
import ProjectsList from '../components/sections/ProjectsList';
import EducationList from '../components/sections/EducationList';
import CertificationsList from '../components/sections/CertificationsList';

const Home = () => {
  return (
    <div className="flex flex-col gap-12 md:gap-24 max-w-5xl mx-auto w-full">
      {/* Helper text for Command Palette */}
      <div className="hidden md:block mb-2 text-sm text-gray-400">
        Press <kbd className="bg-gray-800 px-1.5 py-0.5 rounded text-gray-300 border border-gray-700">Ctrl+K</kbd> for Command Palette
      </div>

      <section id="about" className="scroll-mt-24 pb-16 pt-8">
        <Hero delay={0.1} className="mb-16" />
        <AboutMe delay={0.15} />
      </section>

      <section id="experience" className="scroll-mt-24 pb-16 pt-8">
        <ExperienceTimeline delay={0.2} />
      </section>

      <section id="projects" className="scroll-mt-24 pb-16 pt-8">
        <ProjectsList delay={0.3} />
      </section>

      <section id="education" className="scroll-mt-24 pb-16 pt-8">
        <EducationList delay={0.4} />
      </section>

      <section id="certifications" className="scroll-mt-24 pb-16 pt-8">
        <CertificationsList delay={0.5} />
      </section>

      <section id="tech-stack" className="scroll-mt-24 pb-16 pt-8 border-b border-white/10">
        <h2 className="text-3xl font-bold mb-8 text-white">Technical Stack & Expertise</h2>
        <Expertise delay={0.6} />
      </section>

      <section id="testimonials" className="scroll-mt-24 pb-16 pt-8">
        <h2 className="text-3xl font-bold mb-8 text-white">Testimonials</h2>
        <Testimonials delay={0.7} />
      </section>

      <section id="contact" className="scroll-mt-24 pb-16 pt-8">
        <h2 className="text-3xl font-bold mb-8 text-white">Get In Touch</h2>
        <Contact delay={0.8} />
      </section>

      {/* Footer */}
      <footer className="w-full text-center py-8 border-t border-indigo-500/20 mt-4 text-white/50 text-sm">
        <p>© {new Date().getFullYear()} Indeewara Gunathilaka. All rights reserved.</p>
        <p className="mt-2">Last Modified: {__BUILD_DATE__}</p>
      </footer>
    </div>
  );
};

export default Home;
