import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import InterfaceGallery from './components/InterfaceGallery';
import Footer from './components/Footer';
import InteractiveDialogs from './components/InteractiveDialogs';
import { ActiveToolType } from './types';

export default function App() {
  const [activeTool, setActiveTool] = useState<ActiveToolType>(null);
  const [isAppLoading, setIsAppLoading] = useState(true);

  // Keep the loader visible for 1.5s to let layout, fonts, and images settle perfectly
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenTool = (tool: ActiveToolType) => {
    setActiveTool(tool);
  };

  const handleCloseTool = () => {
    setActiveTool(null);
  };

  return (
    <>
      {/* Smooth App Loading Screen Overlay */}
      <div 
        className={`fixed inset-0 z-[999999] bg-white flex flex-col items-center justify-center font-sans transition-opacity duration-1000 ease-in-out ${
          isAppLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-12 h-12 border-4 border-slate-100 border-t-primary rounded-full animate-spin mb-6"></div>
        <div className="text-slate-500 text-[13px] font-semibold tracking-[0.15em] uppercase animate-pulse">
          Loading Compass
        </div>
      </div>

      <div className={`min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-primary/20 select-none overflow-x-hidden relative w-full transition-opacity duration-1000 ${isAppLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Top Fixed Header Menu */}
        <Navigation onOpenTool={handleOpenTool} />

        {/* Main Sections */}
        <main className="flex-1">
          {/* Dynamic Editorial Hero Banner Section */}
          <Hero onOpenTool={handleOpenTool} />

          {/* Feature Bento Grid Modules */}
          <BentoGrid onOpenTool={handleOpenTool} />

          {/* Dynamic Display Interface Slider Section */}
          <InterfaceGallery onOpenTool={handleOpenTool} />
        </main>

        {/* Interactive Telemetry Footer */}
        <Footer />

        {/* Dynamic Interactive Simulator Dialog System */}
        <InteractiveDialogs 
          activeTool={activeTool} 
          onClose={handleCloseTool} 
        />
      </div>
    </>
  );
}
