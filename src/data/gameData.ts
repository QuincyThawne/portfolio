// ============================================
// GAME MODE DATA
// NPC configurations, dialogues, positions, sprites
// Used by: SandboxMode, GameDialogue, GameMinimap, GameHUD
// ============================================

import { portfolioData, type PortfolioData } from './portfolioData';

// ------------------------------------------
// NPC DATA INTERFACE
// ------------------------------------------
export interface NPCData {
  id: string;
  name: string;
  section: keyof Omit<PortfolioData, 'personal'>;
  position: { x: number; y: number };
  sprite: string;
  dialogues: string[];
  detailTitle: string;
}

// ------------------------------------------
// NPC SPRITE MAPPINGS
// Map NPC IDs to their sprite image filenames
// Sprites should be in: src/assets/sprites/
// ------------------------------------------
export const npcSprites: Record<string, string> = {
  'npc-about': 'professorOak.png',      // Prof. Oak sprite
  'npc-projects': 'captain.png',         // Captain sprite
  'npc-skills': 'champion.png',          // Champion sprite
  'npc-achievements': 'oldman.png',      // Old Man sprite
  'npc-contact': 'professor.png',        // Professor sprite
};

// ------------------------------------------
// NPC MARKER COLORS (for minimap)
// ------------------------------------------
export const npcColors: Record<string, string> = {
  about: '#f59e0b',      // amber - Prof. Oak
  projects: '#3b82f6',   // blue - Captain
  skills: '#ef4444',     // red - Champion
  achievements: '#a855f7', // purple - Old Man
  contact: '#22c55e',    // green - Professor
};

// ------------------------------------------
// NPC CONFIGURATIONS
// Edit positions, dialogues, and names here
// Positions are tile coordinates (not pixels)
// ------------------------------------------
export const npcData: NPCData[] = [
  {
    id: "npc-about",
    name: "Prof. Oak",
    section: "about",
    position: { x: 13, y: 6 },  // In front of upper-left house
    sprite: "npc-sage",
    dialogues: [
      "Hello there! Welcome to the world of development!",
      "Let me tell you about Murali Vennapusa...",
      "A Web Developer, Tech Enthusiast, and Creative Coder who lives in the Internet where stories are told.",
    ],
    detailTitle: "About Me",
  },
  {
    id: "npc-projects",
    name: "Captain",
    section: "projects",
    position: { x: 4, y: 6 },  // In front of upper-right house
    sprite: "npc-architect",
    dialogues: [
      "Ahoy! Welcome to the Project Harbor!",
      "Here you'll find the greatest creations...",
      `There are ${portfolioData.projects.length} notable projects to explore.`,
    ],
    detailTitle: "My Projects",
  },
  {
    id: "npc-skills",
    name: "Champion",
    section: "skills",
    position: { x: 10, y: 2 },  // Right side of main path
    sprite: "npc-scholar",
    dialogues: [
      "So, you want to know about skills?",
      "The techniques mastered here are many...",
      "Each skill has been honed through years of practice.",
    ],
    detailTitle: "Skills & Expertise",
  },
  {
    id: "npc-achievements",
    name: "Old Man",
    section: "achievements",
    position: { x: 15, y: 9 },  // Left side near lower path
    sprite: "npc-herald",
    dialogues: [
      "Back in my day...",
      "The accomplishments here are legendary!",
      `${portfolioData.achievements.length} great achievements have been recorded.`,
    ],
    detailTitle: "Achievements",
  },
  {
    id: "npc-contact",
    name: "Professor",
    section: "contact",
    position: { x: 8, y: 11 },  // On lower path near houses
    sprite: "npc-messenger",
    dialogues: [
      "Greetings, young trainer!",
      "Want to get in touch with the developer?",
      portfolioData.contact.availability,
    ],
    detailTitle: "Get In Touch",
  },
];

// ------------------------------------------
// GAME DIALOGUE GENERATORS
// These functions generate detailed dialogues from portfolio data
// Used by GameDialogue component for typing effect
// ------------------------------------------

export const generateAboutDialogues = (): string[] => {
  const { personal, about } = portfolioData;
  return [
    `Hello there! Welcome to ${personal.name}'s world!`,
    about.short,
    about.long,
    `Key highlights: ${about.highlights.join(', ')}`,
    `Based in ${personal.location}, ready to build amazing things!`,
    "That's all about me! Press K for more details or continue exploring.",
  ];
};

export const generateProjectDialogues = (): string[] => {
  const dialogues: string[] = [
    "Ahoy! Welcome to the Project Harbor!",
    `I have ${portfolioData.projects.length} amazing projects to show you!`,
  ];
  
  portfolioData.projects.forEach((project, index) => {
    dialogues.push(`Project ${index + 1}: ${project.title}`);
    dialogues.push(project.description);
    dialogues.push(`Built with: ${project.technologies.join(', ')}`);
  });
  
  dialogues.push("Those are all my projects! Press K to see full details.");
  return dialogues;
};

export const generateSkillsDialogues = (): string[] => {
  const { skills } = portfolioData;
  const dialogues: string[] = [
    "So, you want to know about my skills?",
    `I've mastered ${skills.length} different skills across various categories!`,
  ];
  
  // Group by category
  const categories = ['frontend', 'backend', 'tools', 'soft'] as const;
  const categoryNames = {
    frontend: 'Frontend',
    backend: 'Backend',
    tools: 'Tools & Technologies',
    soft: 'Soft Skills'
  };
  
  categories.forEach(cat => {
    const catSkills = skills.filter(s => s.category === cat);
    if (catSkills.length > 0) {
      dialogues.push(`${categoryNames[cat]}:`);
      catSkills.forEach(skill => {
        dialogues.push(`• ${skill.name} - ${skill.level}% mastery`);
      });
    }
  });
  
  dialogues.push("Each skill has been honed through years of practice!");
  return dialogues;
};

export const generateAchievementsDialogues = (): string[] => {
  const dialogues: string[] = [
    "Back in my day... well, let me tell you about the achievements!",
    `There are ${portfolioData.achievements.length} great accomplishments to share.`,
  ];
  
  portfolioData.achievements.forEach((achievement, index) => {
    dialogues.push(`Achievement ${index + 1}: ${achievement.title}`);
    dialogues.push(achievement.description);
    dialogues.push(`Achieved in: ${achievement.date}`);
  });
  
  dialogues.push("Those are the legendary accomplishments! Press K for details.");
  return dialogues;
};

export const generateContactDialogues = (): string[] => {
  const { contact, personal } = portfolioData;
  const dialogues: string[] = [
    "Greetings! Want to get in touch?",
    contact.description,
    contact.availability,
    `Email: ${contact.email}`,
  ];
  
  if (personal.socialLinks.length > 0) {
    dialogues.push("You can also find me on:");
    personal.socialLinks.forEach(link => {
      dialogues.push(`• ${link.platform}: ${link.url}`);
    });
  }
  
  dialogues.push("Looking forward to hearing from you!");
  return dialogues;
};

// ------------------------------------------
// DIALOGUE GENERATOR MAP
// Maps NPC sections to their dialogue generators
// ------------------------------------------
export const dialogueGenerators: Record<string, () => string[]> = {
  about: generateAboutDialogues,
  projects: generateProjectDialogues,
  skills: generateSkillsDialogues,
  achievements: generateAchievementsDialogues,
  contact: generateContactDialogues,
};

// ------------------------------------------
// HELPER FUNCTIONS
// ------------------------------------------

export const getNPCById = (id: string): NPCData | undefined => {
  return npcData.find(npc => npc.id === id);
};

export const getNPCBySection = (section: string): NPCData | undefined => {
  return npcData.find(npc => npc.section === section);
};

export const getNPCSpriteUrl = (npcId: string): string => {
  return npcSprites[npcId] || 'professor.png';
};

export default npcData;
