import React, { useEffect, useState } from 'react';
import { Gamepad2 } from 'lucide-react';

interface GameLoadingScreenProps {
  onLoadingComplete: () => void;
  minDuration?: number;
}

const GameLoadingScreen: React.FC<GameLoadingScreenProps> = ({ 
  onLoadingComplete, 
  minDuration = 2000 
}) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  const [showPixels, setShowPixels] = useState(false);

  const loadingMessages = [
    'Initializing...',
    'Loading sprites...',
    'Building world...',
    'Placing NPCs...',
    'Almost there...',
    'Get ready!',
  ];

  useEffect(() => {
    setShowPixels(true);
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return Math.min(newProgress, 100);
      });
    }, minDuration / 10);

    // Update loading text based on progress
    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        const currentIndex = loadingMessages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingMessages.length;
        return loadingMessages[nextIndex];
      });
    }, minDuration / 6);

    // Complete loading after minimum duration
    const timeout = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        onLoadingComplete();
      }, 300);
    }, minDuration);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
      clearTimeout(timeout);
    };
  }, [minDuration, onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#1a1a2e] flex flex-col items-center justify-center overflow-hidden">
      {/* Pixel art background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '16px 16px',
          }}
        />
      </div>

      {/* Floating pixels animation */}
      {showPixels && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/40 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Game icon with bounce animation */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 bg-primary/20 rounded-2xl flex items-center justify-center
                          border-4 border-primary/40 shadow-lg shadow-primary/20
                          animate-bounce">
            <Gamepad2 className="w-12 h-12 text-primary" />
          </div>
          
          {/* Pixel particles around icon */}
          <div className="absolute -top-2 -left-2 w-3 h-3 bg-primary animate-ping" />
          <div className="absolute -top-2 -right-2 w-2 h-2 bg-accent animate-ping" style={{ animationDelay: '0.5s' }} />
          <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-accent animate-ping" style={{ animationDelay: '0.3s' }} />
          <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-primary animate-ping" style={{ animationDelay: '0.7s' }} />
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 pixel-art tracking-wider">
          ENTERING WORLD
        </h2>
        
        {/* Loading text */}
        <p className="text-primary text-sm sm:text-base mb-8 font-mono">
          {loadingText}
        </p>

        {/* Progress bar container */}
        <div className="w-64 sm:w-80 h-6 bg-gray-800 rounded-lg overflow-hidden border-2 border-gray-700 relative">
          {/* Progress fill */}
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
          
          {/* Pixel pattern overlay on progress */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,0,0,0.3) 4px, rgba(0,0,0,0.3) 8px)',
            }}
          />
          
          {/* Progress text */}
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow-lg">
            {Math.round(progress)}%
          </span>
        </div>

        {/* Controls hint */}
        <div className="mt-8 flex flex-col items-center text-gray-500 text-xs sm:text-sm">
          <p className="mb-2">Controls:</p>
          <div className="flex gap-4 flex-wrap justify-center">
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-400 font-mono">WASD</kbd>
              <span>Move</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-400 font-mono">J</kbd>
              <span>Talk</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-2 py-1 bg-gray-800 rounded text-gray-400 font-mono">K</kbd>
              <span>Details</span>
            </span>
          </div>
        </div>
      </div>

      {/* Bottom decoration - pixel art style */}
      <div className="absolute bottom-0 left-0 right-0 h-8 flex">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i}
            className="flex-1 bg-gray-800"
            style={{
              height: `${Math.random() * 100}%`,
              marginTop: 'auto',
              opacity: 0.5 + Math.random() * 0.5,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GameLoadingScreen;
