import React, { useEffect } from 'react';
import { NPCData, PortfolioData } from '@/data/portfolio';
import { X } from 'lucide-react';

interface GameDetailPanelProps {
  npc: NPCData;
  portfolioData: PortfolioData;
  onClose: () => void;
}

const GameDetailPanel: React.FC<GameDetailPanelProps> = ({
  npc,
  portfolioData,
  onClose,
}) => {
  // Handle keyboard close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const renderContent = () => {
    switch (npc.section) {
      case 'about':
        return (
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed">{portfolioData.about.long}</p>
            <div className="space-y-2">
              <h4 className="font-bold text-foreground">Highlights:</h4>
              <ul className="space-y-1">
                {portfolioData.about.highlights.map((highlight, i) => (
                  <li key={i} className="text-muted-foreground flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-4">
            {portfolioData.projects.filter(p => p.featured).map((project) => (
              <div key={project.id} className="p-4 bg-muted rounded-lg">
                <h4 className="font-bold text-foreground mb-1">{project.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'skills':
        return (
          <div className="grid grid-cols-2 gap-4">
            {portfolioData.skills.map((skill) => (
              <div key={skill.id} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'achievements':
        return (
          <div className="space-y-4">
            {portfolioData.achievements.map((achievement) => (
              <div key={achievement.id} className="flex gap-4 p-3 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🏆</span>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{achievement.date}</p>
                  <h4 className="font-bold text-foreground">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4">
            <p className="text-foreground">{portfolioData.contact.description}</p>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <p className="text-foreground font-medium">{portfolioData.contact.email}</p>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-primary font-medium">{portfolioData.contact.availability}</p>
            </div>
          </div>
        );

      default:
        return <p className="text-muted-foreground">No details available.</p>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="game-panel bg-card w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-4 border-foreground">
          <h2 className="text-xl font-bold text-foreground">{npc.detailTitle}</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center hover:bg-muted rounded transition-colors"
            aria-label="Close panel"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-border bg-muted/50">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Press [ESC] or [K] to close
            </span>
            <button onClick={onClose} className="btn-retro text-sm">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailPanel;
