import personalInfo from './personalInfo.json';

export const personalData = {
  profile: {
    name: "Indeewara",
    title: "QA Engineer & Automation Expert",
    bio: "I build robust automation frameworks and ensure flawless product quality. Specializing in E2E testing, API validation, and Performance optimization for modern web applications.",
    email: personalInfo.email,
    availability: personalInfo.availability,
    location: personalInfo.location,
    timezone: personalInfo.timezone,
  },
  links: personalInfo.links,
  skills: [
    { name: 'Playwright', icon: '🎭' },
    { name: 'Cypress', icon: '🌲' },
    { name: 'Selenium', icon: '🤖' },
    { name: 'Postman', icon: '📮' },
    { name: 'JMeter', icon: '⚡' },
    { name: 'JavaScript', icon: '💛' },
    { name: 'TypeScript', icon: '💙' },
    { name: 'GitHub Actions', icon: '⚙️' }
  ],
  testimonials: [
    {
      quote: "One of the most dependable and thorough automation engineers. Writes clean, well-tested code and takes full ownership.",
      author: "Principal Architect",
      company: "Tech Corp Inc."
    },
    {
      quote: "Transformed our QA process. The migration to Playwright saved us hundreds of hours in regression testing.",
      author: "Engineering Manager",
      company: "Global Software Solutions"
    }
  ]
};
