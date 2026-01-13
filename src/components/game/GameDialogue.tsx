import React, { useEffect, useState, useRef, useCallback } from 'react';
import { NPCData, portfolioData } from '@/data/portfolio';

// Import player sprite for dialogue
import playerBackSprite from '@/assets/sprites/player_Back.png';
// Import NPC sprites
import captainSprite from '@/assets/sprites/captain.png';
import championSprite from '@/assets/sprites/champion.png';
import oldmanSprite from '@/assets/sprites/oldman.png';
import professorOakSprite from '@/assets/sprites/professorOak.png';
import professorSprite from '@/assets/sprites/professor.png';

// Map NPC sections to their sprites
const npcSpriteMap: Record<string, string> = {
  about: professorOakSprite,
  projects: captainSprite,
  skills: championSprite,
  achievements: oldmanSprite,
  contact: professorSprite,
};

// Helper function to render text with clickable links for contact section
const renderContactText = (text: string, section: string) => {
  if (section !== 'contact') {
    return text;
  }

  // Handle email
  if (text.includes('CLICK_TO_EMAIL')) {
    const email = portfolioData.contact.email;
    return (
      <span>
        📧 Email: <a 
          href={`mailto:${email}`}
          className="text-primary hover:text-primary/80 underline cursor-pointer font-medium"
          onClick={(e) => e.stopPropagation()}
        >
          Click here to email
        </a>
      </span>
    );
  }

  // Handle social links
  if (text.includes('CLICK_TO_OPEN')) {
    const match = text.match(/🔗 (.*?): CLICK_TO_OPEN/);
    if (match) {
      const platform = match[1];
      const link = portfolioData.personal.socialLinks.find(l => l.platform === platform);
      if (link) {
        return (
          <span>
            🔗 {platform}: <a 
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline cursor-pointer font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              Click here to open
            </a>
          </span>
        );
      }
    }
  }

  return text;
};

// Generate detailed dialogues from portfolio data
const generateDetailedDialogues = (section: string): string[] => {
  switch (section) {
    case 'about':
      return [
        `Hello there! Welcome to the world of development!`,
        `Let me tell you about ${portfolioData.personal.name}...`,
        `He is a Web Developer, Tech Enthusiast, and Creative Coder who lives in the Internet where stories are told and even more being written.`,
      //`Their specialties include: Web Development, Scripting, and Creative Coding.`,
        `You can find their contact by asking the other Professor.`,
        `And that's all about them! Come back anytime you want to learn more!`,
      ];
    case 'projects':
      const projectDialogues: string[] = [
        `Ahoy! Welcome to the Project Harbor!`,
        `Here you'll find the featured creations done by Murali Vennapusa. 
        Let me tell you about each one...`,
      ];
      // Show ONLY featured projects
      const featuredProjects = portfolioData.projects.filter(p => p.featured === true);
      featuredProjects.forEach((project) => {
        projectDialogues.push(`${project.title} : ${project.description}.  
          Built with: ${project.technologies.join(', ')}`);
      });
      projectDialogues.push(`And that's the featured fleet! Projects ready to set sail! Anchors aweigh!`);
      return projectDialogues;
    case 'skills':
      const skillsByCategory = {
        frontend: portfolioData.skills.filter(s => s.category === 'frontend'),
        backend: portfolioData.skills.filter(s => s.category === 'backend'),
        tools: portfolioData.skills.filter(s => s.category === 'tools'),
        soft: portfolioData.skills.filter(s => s.category === 'soft'),
      };
      const skillDialogues: string[] = [
        `So, you want to know about Murali Vennapusa's skills?`,
        `The techniques mastered by him are many... Let me break them down for you!`,
      ];
      skillDialogues.push(`press K to view skills in detail because its beter for user experience`);
      skillDialogues.push(`That's his skill set! A true champion never stops training!`);
      return skillDialogues;
    case 'achievements':
      const achievementDialogues: string[] = [
        `I'm Just an Old-Timer who knows about Murali Vennapusa's achievements ...`,
        `His accomplishments are legendary! Let me tell you about each one...`,
      ];
      // Show ALL achievements one by one
      portfolioData.achievements.forEach((achievement, index) => {
        achievementDialogues.push(`${achievement.title} : ${achievement.description}`);
      });
      achievementDialogues.push("And not bad for a youngster, eh?\n Back in my day, we had to walk uphill both ways to code!");
      return achievementDialogues;
    case 'contact':
      const contactDialogues: string[] = [
        `Greetings, young trainer!`,
        `Want to get in touch with the developer? Here's how you can reach them...`,
        `📧 Email: CLICK_TO_EMAIL`,
      ];
      portfolioData.personal.socialLinks.forEach(link => {
        contactDialogues.push(`🔗 ${link.platform}: CLICK_TO_OPEN`);
      });
      contactDialogues.push(portfolioData.contact.availability);
      contactDialogues.push(`He is Always open to connect with fellow developers and enthusiasts!`);
      contactDialogues.push(`That's all the contact info! Now go forth and connect! Your Pokédex... I mean, portfolio journey awaits!`);
      return contactDialogues;
    default:
      return ['Hello!'];
  }
};

interface GameDialogueProps {
  npc: NPCData;
  onClose: () => void;
  onOpenDetail: () => void;
}

const GameDialogue: React.FC<GameDialogueProps> = ({
  npc,
  onClose,
  onOpenDetail,
}) => {
  // Generate detailed dialogues based on NPC section
  const detailedDialogues = generateDetailedDialogues(npc.section);
  
  // Manage dialogue index internally
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const isLastDialogue = dialogueIndex >= detailedDialogues.length - 1;
  
  // Typing effect state
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const typingSpeed = 6; // ms per character
  const currentDialogue = detailedDialogues[dialogueIndex] || '';
  
  // Scroll ref for auto-scroll
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Determine if it's NPC's turn (even indices) or player response turn
  const isNPCTurn = dialogueIndex % 2 === 0;
  
  const npcSprite = npcSpriteMap[npc.section] || professorOakSprite;

  // Typing effect
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    let index = 0;
    
    const typingInterval = setInterval(() => {
      if (index < currentDialogue.length) {
        setDisplayedText(currentDialogue.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, typingSpeed);
    
    return () => clearInterval(typingInterval);
  }, [currentDialogue, dialogueIndex]);

  // Auto-scroll to bottom when text updates
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [displayedText]);

  // Handle next dialogue internally
  const handleNextDialogue = useCallback(() => {
    if (isLastDialogue) {
      onClose();
    } else {
      setDialogueIndex(prev => prev + 1);
    }
  }, [isLastDialogue, onClose]);

  // Stable callback refs for keyboard handling
  const onCloseRef = useRef(onClose);
  const onOpenDetailRef = useRef(onOpenDetail);
  const handleNextRef = useRef(handleNextDialogue);
  
  // Keep refs updated
  useEffect(() => {
    onCloseRef.current = onClose;
    onOpenDetailRef.current = onOpenDetail;
    handleNextRef.current = handleNextDialogue;
  }, [onClose, onOpenDetail, handleNextDialogue]);

  // Handle keyboard controls for dialogue
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      if (key === 'j' || e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        if (isTyping) {
          // Skip typing animation
          setDisplayedText(currentDialogue);
          setIsTyping(false);
        } else {
          handleNextRef.current();
        }
      } else if (key === 'k') {
        e.preventDefault();
        e.stopPropagation();
        onOpenDetailRef.current();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onCloseRef.current();
      }
    };

    // Use capture phase to ensure we get the event first
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isTyping, currentDialogue]);

  const handleNext = () => {
    if (isTyping) {
      setDisplayedText(currentDialogue);
      setIsTyping(false);
    } else {
      handleNextDialogue();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 pb-20 pointer-events-none">
      <div 
        className="relative bg-black/90 border-2 border-primary rounded-xl w-full shadow-2xl pointer-events-auto"
        style={{
          maxWidth: '900px',
          minHeight: '280px',
          maxHeight: '45vh',
          marginBottom: '20px',
          background: 'linear-gradient(180deg, rgba(26,26,46,0.98) 0%, rgba(22,33,62,0.98) 100%)',
          boxShadow: '0 0 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 60px rgba(var(--primary), 0.1)'
        }}
      >
        {/* NPC Sprite - Top Right */}
        <div 
          className="absolute -top-14 right-6 flex flex-col items-center"
          style={{
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.6))'
          }}
        >
          <div 
            className="w-20 h-20 rounded-full border-3 border-primary overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #4a5568 0%, #2d3748 100%)',
              boxShadow: '0 0 20px rgba(var(--primary), 0.4)'
            }}
          >
            <img 
              src={npcSprite} 
              alt={npc.name}
              className="w-full h-full object-contain scale-160"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
          <span 
            className="mt-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded"
            style={{
              background: 'linear-gradient(180deg, #4a5568 0%, #2d3748 100%)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            {npc.name}
          </span>
        </div>

        {/* Player Sprite - Bottom Left */}
        <div 
          className="absolute -bottom-20 left-6 flex flex-col items-center"
          style={{
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.6))'
          }}
        >
          <div 
            className="w-16 h-16 rounded-full border-3 border-green-500 overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #22c55e 0%, #166534 100%)',
              boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)'
            }}
          >
            <img 
              src={playerBackSprite} 
              alt="Player"
              className="w-full h-full object-contain scale-150"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
          <span 
            className="mb-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded"
            style={{
              background: 'linear-gradient(180deg, #22c55e 0%, #166534 100%)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            You
          </span>
        </div>

        {/* Section Title */}
        <div 
          className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest"
          style={{
            background: 'linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(var(--primary)/0.8) 100%)',
            color: 'hsl(var(--primary-foreground))',
            boxShadow: '0 4px 15px rgba(var(--primary), 0.4)'
          }}
        >
          {npc.detailTitle}
        </div>

        {/* Dialogue Content */}
        <div className="p-6 pt-8 pb-5 h-full flex flex-col">
          {/* Speaker indicator */}
          <div className={`flex ${isNPCTurn ? 'justify-start' : 'justify-start'} mb-3`}>
            <div 
              className={`top-left inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                isNPCTurn 
                  ? 'bg-primary/20 text-primary border border-primary/30' 
                  : 'bg-green-500/20 text-green-400 border border-green-500/30'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isNPCTurn ? 'bg-primary' : 'bg-green-500'} ${isTyping ? 'animate-pulse' : ''}`}></span>
              {npc.name}
              {isTyping && <span className="text-[10px] opacity-60">typing...</span>}
            </div>
          </div>
          
          {/* Dialogue Text Box */}
          <div 
            ref={contentRef}
            className={`relative flex-1 p-5 rounded-lg overflow-hidden${
              isNPCTurn 
                ? 'bg-white/5 border border-white/10' 
                : 'bg-green-500/10 border border-green-500/20'
            }`}
            style={{
              minHeight: '120px',
              maxHeight: '200px'
            }}
          >
            {/* Speech bubble pointer */}
            <div 
              className={`absolute justify-center top-10 w-4 h-4 rotate-45 ${
                isNPCTurn 
                  ? '-right-2 bg-white/5 border-r border-b border-white/10' 
                  : '-right-2 bg-green-500/10 border-r border-t border-green-500/20'
              }`}
            />
            
            <p className="text-white text-lg leading-relaxed relative z-10 font-light">
              {renderContactText(displayedText, npc.section)}
              {isTyping && <span className="inline-block w-0.5 h-5 bg-primary ml-1 animate-pulse" />}
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-4">
            <div className="flex items-center gap-4">
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm text-white/70 hover:text-white transition-colors rounded-lg hover:bg-white/10 border border-white/20"
              >
                <span className="opacity-50 mr-1.5 text-xs">ESC</span> Close
              </button>
              <button
                onClick={onOpenDetail}
                className="px-4 py-2 text-sm text-amber-400 hover:text-amber-300 transition-colors rounded-lg hover:bg-amber-500/10 border border-amber-500/30 bg-amber-500/5"
              >
                <span className="opacity-70 mr-1.5 text-xs">K</span> Details
              </button>
              <button
                onClick={handleNext}
                className="px-5 py-2 bg-primary text-primary-foreground text-sm font-bold rounded-lg hover:bg-primary/80 transition-all"
                style={{
                  boxShadow: '0 4px 15px rgba(var(--primary), 0.4)'
                }}
              >
                {isTyping ? (
                  <>
                    <span className="opacity-70 mr-1.5 text-xs">J</span> Skip
                  </>
                ) : isLastDialogue ? (
                  <>
                    <span className="opacity-70 mr-1.5 text-xs">J</span> Finish
                  </>
                ) : (
                  <>
                    <span className="opacity-70 mr-1.5 text-xs">J</span> Next →
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDialogue;
