import linkedinData from '../data/linkedin.json';

/**
 * Dynamically extracts skills from a given text block by cross-referencing
 * the text against the user's massive 100+ skills database from LinkedIn.
 */
export const extractContextualSkills = (description) => {
  if (!description || typeof description !== 'string') return [];
  
  const allSkills = linkedinData.skills || [];
  if (allSkills.length === 0) return [];

  // Create a lowercase version of the description for fast searching
  const textLower = description.toLowerCase();

  // Filter the user's actual skills list to see which ones appear in the description
  const matchedSkills = allSkills.filter(skill => {
    // Escape regex characters in skill name just in case (e.g. C++)
    const escapedSkill = skill.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // We use a regex with word boundaries to avoid partial matches
    // e.g. "API" matching inside "CAPITAL"
    // However, some skills might have special characters like C++, C#, .NET
    // Word boundaries (\b) can be tricky with special chars, so we use a flexible approach
    try {
      const regex = new RegExp(`(^|\\s|\\W)${escapedSkill}($|\\s|\\W)`, 'i');
      return regex.test(textLower);
    } catch (e) {
      // Fallback to simple includes if regex fails
      return textLower.includes(skill.name.toLowerCase());
    }
  });

  return matchedSkills.map(skill => skill.name);
};
