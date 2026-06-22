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
  );
}
