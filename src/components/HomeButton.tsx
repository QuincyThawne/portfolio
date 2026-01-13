import React from 'react';
import { useMode } from '@/context/ModeContext';
import { Home } from 'lucide-react';

const HomeButton: React.FC = () => {
  const { mode, setMode } = useMode();

  // Don't show on selector page
  if (mode === 'selector') return null;

  return (
    <button
      onClick={() => setMode('selector')}
      className="fixed top-6 left-6 z-50 flex items-center gap-2 
                 px-3 py-2 bg-card/80 backdrop-blur-sm border border-border rounded-lg
                 shadow-soft hover:shadow-elevated hover:bg-card
                 transition-all duration-300 group"
      aria-label="Return to mode selector"
    >
      <Home className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
        Home
      </span>
    </button>
  );
};

export default HomeButton;
