import React from 'react';
import { NPCData } from '@/data/portfolio';
import { KEYS } from '@/data/gameConfig';

interface GameHUDProps {
  nearbyNPC: NPCData | null;
}

const GameHUD: React.FC<GameHUDProps> = ({ nearbyNPC }) => {
  return (
    <>
      {/* Controls hint - bottom left, compact - hidden on mobile */}
      <div className="absolute bottom-4 left-4 z-30 pointer-events-none hidden md:block">
        <div className="bg-black/70 backdrop-blur-sm border border-white/20 rounded-lg p-2 text-xs">
          <div className="grid grid-cols-3 gap-0.5 mb-1.5 w-fit mx-auto">
            <div />
            <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center text-[10px] font-bold text-white">
              W
            </div>
            <div />
            <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center text-[10px] font-bold text-white">
              A
            </div>
            <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center text-[10px] font-bold text-white">
              S
            </div>
            <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center text-[10px] font-bold text-white">
              D
            </div>
          </div>
          <p className="text-white/60 text-[10px] text-center">Move</p>
          <div className="border-t border-white/20 mt-1.5 pt-1.5 space-y-0.5">
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-[10px] font-bold text-white">J</kbd>
              <span className="text-white/60">Talk</span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-[10px] font-bold text-white">K</kbd>
              <span className="text-white/60">Details</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interaction prompt - bottom center, above controls */}
      {nearbyNPC && (
        <div className="absolute -bottom-524 left-1/2 -translate-x-1/2 z-40">
          <div className="bg-black/80 border-2 border-primary rounded-lg px-4 py-3 shadow-lg animate-pulse">
            <p className="text-center text-white font-bold text-sm mb-2">
              {nearbyNPC.name}
            </p>
            <div className="flex gap-3 text-xs justify-center">
              <span className="text-white/90 flex items-center gap-1">
                <kbd className="px-2 py-1 bg-primary/80 rounded text-[10px] font-bold">J</kbd>
                Talk
              </span>
              <span className="text-white/90 flex items-center gap-1">
                <kbd className="px-2 py-1 bg-primary/80 rounded text-[10px] font-bold">K</kbd>
                Details
              </span>
            </div>
          </div>
        </div>
      )}


    </>
  );
};

export default GameHUD;
