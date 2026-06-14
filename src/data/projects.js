export const projectsData = [
  {
    id: 1,
    title: "Playwright E2E Suite",
    description: "Automated regression testing for a global e-commerce platform. Implemented Page Object Model and parallel execution.",
    type: "Automation",
    techStack: ["Playwright", "TypeScript", "GitHub Actions"],
    link: "#"
  },
  {
    id: 2,
    title: "Postman API Framework",
    description: "Collection of tests for 50+ microservices using Newman. Automated schema validation and data-driven testing.",
    type: "Backend",
    techStack: ["Postman", "Newman", "JavaScript"],
    link: "#"
  },
  {
    id: 3,
    title: "JMeter Performance Lab",
    description: "Stress-tested high-traffic checkout flows to identify bottlenecks. Simulated 10,000+ concurrent users.",
    type: "Performance",
    techStack: ["JMeter", "Groovy", "Grafana"],
    link: "#"
  }
];

export const fileSystem = [
  { name: 'README.md', type: 'file', contentId: 'readme' },
  { name: 'projects.json', type: 'file', contentId: 'projects' },
  { name: 'skills.js', type: 'file', contentId: 'skills' },
  { name: 'contact.yaml', type: 'file', contentId: 'contact' },
  { name: 'run_tests.sh', type: 'file', contentId: 'runTests' }
];
