import React, { useState } from 'react';
import portfolioData from '@/data/portfolioData';
import { Award, BookOpen, Flag, Trophy, Sparkles, X, ChevronRight } from 'lucide-react';

interface AchievementDialogProps {
  achievement: {
    id: string;
    title: string;
    description: string;
    date: string;
    type: string;
    imageUrl?: string;
  };
  onClose: () => void;
  styles: {
    bg: string;
    text: string;
    border: string;
    glow: string;
  };
  icon: React.ReactNode;
}

const AchievementDialog: React.FC<AchievementDialogProps> = ({ achievement, onClose, styles, icon }) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-md h-fit max-h-md bg-card border-2 ${styles.border} rounded-2xl shadow-2xl 
                    animate-in zoom-in-95 slide-in-from-bottom-4 duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow effect */}
        <div className={`absolute -inset-1 ${styles.bg} rounded-2xl blur-xl opacity-30`} />
        
        {/* Content */}
        <div className="relative bg-card rounded-2xl overflow-hidden">
          {/* Header with Background Image */}
          <div 
            className={`relative border-b ${styles.border} ${styles.bg}`}
            style={achievement.imageUrl ? {
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.85)), url(${achievement.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '340px',
            } : {
              minHeight: '180px',
            }}
          >
            <div className="relative z-10 flex items-start justify-between p-6">
              <div className={`w-16 h-16 rounded-xl bg-card/50 backdrop-blur-sm flex items-center justify-center ${styles.text}`}>
                {icon}
              </div>
              <button 
                onClick={onClose}
                className="p-2 rounded-full bg-card/50 backdrop-blur-sm hover:bg-card transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <div className="relative z-10 px-6 pb-6">
              <span className={`text-xs font-semibold ${styles.text} ${styles.bg} px-3 py-1 rounded-full capitalize inline-block mb-2`}>
                {achievement.type}
              </span>
              <h3 className="text-2xl font-bold text-white">{achievement.title}</h3>
              <p className="text-sm text-white/80 mt-1">{achievement.date}</p>
            </div>
          </div>
          
          {/* Body */}
          <div className="p-6">
            <p className="text-foreground leading-relaxed">{achievement.description}</p>
            
            {/* Decorative elements */}
            <div className="mt-6 flex items-center gap-2 text-muted-foreground text-sm">
              <Sparkles className={`w-4 h-4 ${styles.text}`} />
              <span>Achievement Unlocked</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AchievementsSection: React.FC = () => {
  const { achievements } = portfolioData;
  const [selectedAchievement, setSelectedAchievement] = useState<typeof achievements[0] | null>(null);

  const getIcon = (type: string, size: string = "w-6 h-6") => {
    switch (type) {
      case 'award':
        return <Trophy className={size} />;
      case 'certification':
        return <Award className={size} />;
      case 'milestone':
        return <Flag className={size} />;
      case 'publication':
        return <BookOpen className={size} />;
      default:
        return <Sparkles className={size} />;
    }
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'certification':
        return {
          bg: 'bg-yellow-500/10',
          text: 'text-yellow-500',
          border: 'border-yellow-500/30',
          glow: 'shadow-yellow-500/20',
          line: 'from-yellow-500/50 to-yellow-500/10',
        };
      case 'award':
        return {
          bg: 'bg-blue-500/10',
          text: 'text-blue-500',
          border: 'border-blue-500/30',
          glow: 'shadow-blue-500/20',
          line: 'from-blue-500/50 to-blue-500/10',
        };
      case 'milestone':
        return {
          bg: 'bg-primary/10',
          text: 'text-primary',
          border: 'border-primary/30',
          glow: 'shadow-primary/20',
          line: 'from-primary/50 to-primary/10',
        };
      default:
        return {
          bg: 'bg-muted',
          text: 'text-muted-foreground',
          border: 'border-border',
          glow: '',
          line: 'from-border to-transparent',
        };
    }
  };

  return (
    <section id="achievements" className="py-16 md:py-24 px-4 md:px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
          Achievements
        </h2>
        <p className="text-sm md:text-base text-muted-foreground text-center mb-12 md:mb-16 max-w-2xl mx-auto">
          Milestones and recognitions along my journey
        </p>

        {/* Pathway Timeline */}
        <div className="relative">
          {/* Central pathway line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-primary/50 via-primary/30 to-transparent rounded-full" />
          
          {/* Achievement nodes */}
          <div className="relative space-y-8 md:space-y-12">
            {achievements.map((achievement, index) => {
              const styles = getTypeStyles(achievement.type);
              const isEven = index % 2 === 0;
              
              return (
                <div 
                  key={achievement.id}
                  className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-8`}
                >
                  {/* Connector line to center */}
                  <div className={`hidden md:block absolute top-1/2 ${isEven ? 'right-1/2 mr-6' : 'left-1/2 ml-6'} w-12 h-0.5 bg-gradient-to-r ${styles.line}`} />
                  
                  {/* Center node (milestone marker) */}
                  <div 
                    className={`absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full ${styles.bg} border-4 border-card 
                               ring-4 ring-primary/20 z-10 transition-all duration-300 hover:scale-125`}
                  >
                    <div className={`absolute inset-0 rounded-full ${styles.bg} animate-ping opacity-50`} />
                  </div>
                  
                  {/* Empty space for alignment */}
                  <div className="hidden md:block flex-1" />
                  
                  {/* Achievement Card */}
                  <button
                    onClick={() => setSelectedAchievement(achievement)}
                    className={`group relative w-full md:flex-1 mt-8 md:mt-0 text-left
                               bg-card/50 backdrop-blur-sm rounded-2xl p-5 md:p-6 border ${styles.border}
                               hover:shadow-xl hover:shadow-primary/5 hover:scale-[1.02] hover:border-primary/50
                               transition-all duration-300 cursor-pointer`}
                  >
                    {/* Hover glow effect */}
                    <div className={`absolute -inset-px ${styles.bg} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl`} />
                    
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl ${styles.bg} flex items-center justify-center ${styles.text}
                                      group-hover:scale-110 transition-transform duration-300`}>
                        {getIcon(achievement.type, "w-6 h-6 md:w-7 md:h-7")}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-medium ${styles.text} ${styles.bg} px-2 py-0.5 rounded-full capitalize`}>
                            {achievement.type}
                          </span>
                          <span className="text-xs text-muted-foreground">{achievement.date}</span>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {achievement.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {achievement.description}
                        </p>
                      </div>
                      
                      {/* Arrow indicator */}
                      <ChevronRight className={`shrink-0 w-5 h-5 ${styles.text} opacity-0 group-hover:opacity-100 
                                                group-hover:translate-x-1 transition-all duration-300`} />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
          
          {/* End marker */}
          <div className="flex justify-center mt-8">
            <div className="w-3 h-3 rounded-full bg-primary/50 ring-4 ring-primary/20" />
          </div>
        </div>
      </div>

      {/* Achievement Dialog */}
      {selectedAchievement && (
        <AchievementDialog
          achievement={selectedAchievement}
          onClose={() => setSelectedAchievement(null)}
          styles={getTypeStyles(selectedAchievement.type)}
          icon={getIcon(selectedAchievement.type, "w-8 h-8")}
        />
      )}
    </section>
  );
};

export default AchievementsSection;
