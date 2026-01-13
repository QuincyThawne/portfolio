import React, { lazy, Suspense } from 'react';
import { ModeProvider, useMode } from '@/context/ModeContext';
import ModeToggle from '@/components/ModeToggle';

// Lazy load heavy components for better initial load performance
const TraditionalPortfolio = lazy(() => import('@/components/portfolio/TraditionalPortfolio'));
const SandboxMode = lazy(() => import('@/components/game/SandboxMode'));

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-white/70 text-lg">Loading...</p>
    </div>
  </div>
);

const PortfolioContent: React.FC = () => {
  const { mode } = useMode();

  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        {mode === 'traditional' && <TraditionalPortfolio />}
        {mode === 'sandbox' && <SandboxMode />}
      </Suspense>
      <ModeToggle />
    </>
  );
};

const Index: React.FC = () => {
  return (
    <ModeProvider>
      <PortfolioContent />
    </ModeProvider>
  );
};

export default Index;
