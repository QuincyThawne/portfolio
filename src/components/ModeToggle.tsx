import React from 'react';
import { useMode } from '@/context/ModeContext';
import { Gamepad2, ScrollText } from 'lucide-react';

const ModeToggle: React.FC = () => {
  const { mode, toggleMode } = useMode();

  const isSandbox = mode === 'sandbox';

  return (
    <button
      onClick={toggleMode}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-2 md:gap-3 
                 px-3 py-2 md:px-4 md:py-3 bg-card border-2 border-border rounded-full
                 shadow-elevated hover:shadow-soft hover:border-primary
                 transition-all duration-300 group"
      aria-label={`Switch to ${isSandbox ? 'traditional' : 'sandbox'} mode`}
    >
      <span className="text-xs md:text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors hidden sm:inline">
        {isSandbox ? 'View Portfolio' : 'Enter World'}
      </span>
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center
                      group-hover:bg-primary/20 transition-colors">
        {isSandbox ? (
          <ScrollText className="w-4 h-4 md:w-5 md:h-5 text-primary" />
        ) : (
          <Gamepad2 className="w-4 h-4 md:w-5 md:h-5 text-primary" />
        )}
      </div>
    </button>
  );
};

export default ModeToggle;
