import React from 'react';
import { Gamepad2, Play, Sparkles, ArrowRight } from 'lucide-react';
import { useMode } from '@/context/ModeContext';
import PixelAdventureBg from '@/assets/PixelAdventure.png';

const GamePreviewSection: React.FC = () => {
  const { setMode } = useMode();

  const handlePlayGame = () => {
    setMode('sandbox');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="game" className="py-16 md:py-24 px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Interactive Experience</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore My World
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-2">
            Step into an interactive pixel art world where you can explore, discover Easter eggs, 
            and learn more about me in a fun and engaging way!
          </p>
        </div>

        {/* Game Preview Card */}
        <div className="relative group">
          {/* Preview Container */}
          <div className="relative bg-card/50 backdrop-blur-sm rounded-3xl border border-border overflow-hidden shadow-2xl">
            {/* Preview Image/Animation Area */}
            <div className="aspect-video bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 relative overflow-hidden"
                 style={{
                   backgroundImage: `url(${PixelAdventureBg})`,
                   backgroundSize: 'cover',
                   backgroundPosition: 'center',
                   backgroundRepeat: 'no-repeat'
                 }}>
              {/* Dark Overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-purple-900/60 to-slate-900/70" />
              
              {/* Animated Grid Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                  `,
                  backgroundSize: '32px 32px',
                }} />
              </div>

              {/* Floating Elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  {/* Game Icon */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 mx-auto bg-primary/20 rounded-2xl flex items-center justify-center
                                    border-2 border-primary/30 shadow-lg shadow-primary/20
                                    group-hover:scale-110 transition-transform duration-500">
                      <Gamepad2 className="w-12 h-12 text-primary" />
                    </div>
                    {/* Pulse Ring */}
                    <div className="absolute inset-0 w-24 h-24 mx-auto rounded-2xl border-2 border-primary/50 animate-ping opacity-30" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">Pixel World Adventure</h3>
                  <p className="text-white/60 text-sm max-w-md">
                    Navigate through my interactive portfolio game with WASD controls
                  </p>
                </div>
              </div>

              {/* Corner Decorations */}
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>

              {/* Floating Particles */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-primary/40 rounded-full animate-pulse"
                  style={{
                    left: `${15 + i * 15}%`,
                    top: `${20 + (i % 3) * 25}%`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
            </div>

            {/* Bottom Info Bar */}
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-card/80 to-card/60">
              <div className="text-center md:text-left">
                <h4 className="text-lg font-semibold text-foreground mb-1">Ready to Play?</h4>
                <p className="text-sm text-muted-foreground">
                  Use <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">W</kbd>
                  <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono mx-1">A</kbd>
                  <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono">S</kbd>
                  <kbd className="px-2 py-0.5 bg-muted rounded text-xs font-mono mx-1">D</kbd>
                  to move around the world
                </p>
              </div>
              
              <button
                onClick={handlePlayGame}
                className="group/btn flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground 
                           rounded-xl font-semibold text-lg shadow-lg shadow-primary/25
                           hover:scale-105 hover:shadow-xl hover:shadow-primary/30 
                           transition-all duration-300"
              >
                <Play className="w-6 h-6" />
                Enter World
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 
                          rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { icon: '🎮', title: 'Interactive Exploration', desc: 'Walk around and discover hidden areas' },
            { icon: '💬', title: 'NPC Conversations', desc: 'Chat with characters to learn more' },
            { icon: '🏆', title: 'Hidden Secrets', desc: 'Find Easter eggs throughout the world' },
          ].map((feature, i) => (
            <div key={i} className="text-center p-6 bg-card/30 backdrop-blur-sm rounded-xl border border-border/50">
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h5 className="font-semibold text-foreground mb-1">{feature.title}</h5>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GamePreviewSection;
