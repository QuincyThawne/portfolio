// ============================================
// PORTFOLIO DATA - RE-EXPORT HUB
// This file re-exports from both data files for backward compatibility
// 
// For traditional portfolio: import from '@/data/portfolioData'
// For game mode: import from '@/data/gameData'
// Or import everything from here: import from '@/data/portfolio'
// ============================================

// Re-export all types and data from portfolioData
export type {
  Project,
  Skill,
  Achievement,
  SocialLink,
  PortfolioData,
} from './portfolioData';

export { portfolioData } from './portfolioData';

// Re-export all types and data from gameData
export type { NPCData } from './gameData';

export {
  npcData,
  npcSprites,
  npcColors,
  getNPCById,
  getNPCBySection,
  getNPCSpriteUrl,
  dialogueGenerators,
  generateAboutDialogues,
  generateProjectDialogues,
  generateSkillsDialogues,
  generateAchievementsDialogues,
  generateContactDialogues,
} from './gameData';

// Default export for convenience
export { default } from './portfolioData';
