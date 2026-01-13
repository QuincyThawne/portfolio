import React from 'react';
import { useMode } from '@/context/ModeContext';
import { Gamepad2, ScrollText } from 'lucide-react';
import portfolioData from '@/data/portfolio';

const ModeSelector: React.FC = () => {
  const { setMode } = useMode();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      {/* Hero Section */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
          {portfolioData.personal.name}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-2">
          {portfolioData.personal.title}
        </p>
        <p className="text-lg text-primary font-medium">
          {portfolioData.personal.tagline}
        </p>
      </div>

      {/* Mode Selection */}
      <div className="text-center mb-8">
        <p className="text-muted-foreground text-lg mb-6">
          Choose your experience
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full">
        {/* Sandbox Mode Card */}
        <button
          onClick={() => setMode('sandbox')}
          className="group relative bg-card border-2 border-border rounded-lg p-8 
                     hover:border-primary hover:shadow-elevated transition-all duration-300
                     flex flex-col items-center text-center"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6
                          group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
            <Gamepad2 className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-card-foreground mb-3">
            Enter the World
          </h2>
          <p className="text-muted-foreground mb-4">
            Explore my portfolio as an interactive adventure. Walk around, talk to NPCs, 
            and discover my work in a gamified experience.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
              WASD to move
            </span>
            <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
              J to interact
            </span>
          </div>
          <div className="absolute inset-0 border-2 border-primary rounded-lg opacity-0 
                          group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </button>

        {/* Traditional Mode Card */}
        <button
          onClick={() => setMode('traditional')}
          className="group relative bg-card border-2 border-border rounded-lg p-8 
                     hover:border-accent hover:shadow-elevated transition-all duration-300
                     flex flex-col items-center text-center"
        >
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6
                          group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
            <ScrollText className="w-10 h-10 text-accent" />
          </div>
          <h2 className="text-2xl font-bold text-card-foreground mb-3">
            View Portfolio
          </h2>
          <p className="text-muted-foreground mb-4">
            Classic portfolio experience. Scroll through my work, skills, and achievements 
            in a clean, professional layout.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
              Scroll to explore
            </span>
            <span className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
              Mobile friendly
            </span>
          </div>
          <div className="absolute inset-0 border-2 border-accent rounded-lg opacity-0 
                          group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </button>
      </div>

      {/* Footer hint */}
      <p className="mt-12 text-sm text-muted-foreground animate-fade-in">
        You can switch modes anytime using the toggle button
      </p>
    </div>
  );
};

export default ModeSelector;
