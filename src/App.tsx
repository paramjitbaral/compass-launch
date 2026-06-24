import React, { useState, Suspense, lazy } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import InteractiveDialogs from './components/InteractiveDialogs';
import { ActiveToolType } from './types';

// Standard React Lazy Loading for heavy website sections
const Hero = lazy(() => import('./components/Hero'));
const BentoGrid = lazy(() => import('./components/BentoGrid'));
const InterfaceGallery = lazy(() => import('./components/InterfaceGallery'));


export default function App() {
  const [activeTool, setActiveTool] = useState<ActiveToolType>(null);

  const handleOpenTool = (tool: ActiveToolType) => {
    setActiveTool(tool);
  };

  const handleCloseTool = () => {
    setActiveTool(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-primary/20 select-none overflow-x-hidden relative w-full">
      {/* Top Fixed Header Menu */}
      <Navigation onOpenTool={handleOpenTool} />

      {/* Main Sections wrapped in simple Suspense fallback */}
      <main className="flex-1">
        <Suspense 
          fallback={
            <div className="w-full h-[50vh] flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-slate-200 border-t-primary rounded-full animate-spin"></div>
            </div>
          }
        >
          <Hero onOpenTool={handleOpenTool} />
          <BentoGrid onOpenTool={handleOpenTool} />
          <InterfaceGallery onOpenTool={handleOpenTool} />
        </Suspense>
      </main>

      {/* Interactive Telemetry Footer */}
      <Footer />

      {/* Dynamic Interactive Simulator Dialog System */}
      <InteractiveDialogs 
        activeTool={activeTool} 
        onClose={handleCloseTool} 
      />
    </div>
  );
}
