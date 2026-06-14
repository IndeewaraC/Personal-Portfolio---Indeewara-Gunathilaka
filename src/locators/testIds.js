export const IDS = {
  layout: {
    bentoGrid: 'bento-grid-container',
  },
  boxes: {
    hero: 'bento-hero-box',
    skills: 'bento-skills-box',
    projects: 'bento-projects-box',
    status: 'bento-status-box',
    contact: 'bento-contact-box',
    experience: 'bento-experience-box',
    testimonial: 'bento-testimonial-box'
  },
  hero: {
    title: 'hero-title',
    resumeBtn: 'hero-resume-btn',
    linkedinBtn: 'hero-linkedin-btn'
  },
  projects: {
    card: (id) => `project-card-${id}`,
    demoLink: (id) => `project-demo-link-${id}`
  }
};
