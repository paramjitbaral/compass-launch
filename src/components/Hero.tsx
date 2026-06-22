import React from 'react';
import { Shield, Download, Activity, ChevronRight } from 'lucide-react';
import { ActiveToolType } from '../types';

interface HeroProps {
  onOpenTool: (type: ActiveToolType) => void;
}

export default function Hero({ onOpenTool }: HeroProps) {
  return (
    <header className="relative min-h-[80vh] flex items-center pt-20 pb-16 overflow-hidden bg-white">
      {/* Subtle Dot Pattern Background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.4]" 
        style={{ backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      />
      {/* Decorative blurred background lights */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] md:w-[600px] h-[500px] md:h-[600px] bg-radial from-electric-cyan/10 via-primary/5 to-transparent rounded-full pointer-events-none animate-pulse duration-[8s]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[450px] bg-radial from-primary/5 via-electric-cyan/5 to-transparent rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Editorial Typography Copy */}
        <div className="space-y-8 text-left">
          
          {/* No top badge */}

          {/* Large display headline */}
          <h1 className="font-sans text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tighter leading-[1.05]">
            Find Your<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">True North.</span>
          </h1>

          {/* Description */}
          <p className="text-slate-500 font-medium text-base md:text-lg leading-relaxed max-w-md">
            The most advanced digital compass for Android. Beautifully designed, aerospace-grade accuracy, and built for true explorers.
          </p>

          {/* Landing Call to actions */}
          <div className="flex flex-wrap gap-4 pt-2 w-full max-w-[280px] md:max-w-[320px]">
            <button 
              onClick={() => onOpenTool('download')}
              className="w-full justify-center py-4 px-8 bg-primary text-white font-bold text-base rounded-2xl hover:shadow-xl hover:shadow-primary/25 active:scale-[0.98] transition-all flex items-center gap-3"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" className="shrink-0">
                <path d="M17.6,9.48l1.84-3.18c0.16-0.31,0.04-0.69-0.26-0.85c-0.29-0.15-0.65-0.06-0.83,0.22l-1.88,3.24 c-2.86-1.21-6.08-1.21-8.94,0L5.65,5.67c-0.19-0.29-0.58-0.38-0.86-0.22C4.5,5.61,4.38,5.99,4.54,6.3L6.4,9.48 C3.3,11.25,1.28,14.44,1,18h22C22.72,14.44,20.7,11.25,17.6,9.48z M7,15.25c-0.69,0-1.25-0.56-1.25-1.25S6.31,12.75,7,12.75 s1.25,0.56,1.25,1.25S7.69,15.25,7,15.25z M17,15.25c-0.69,0-1.25-0.56-1.25-1.25s0.56-1.25,1.25-1.25s1.25,0.56,1.25,1.25 S17.69,15.25,17,15.25z"/>
              </svg> 
              Download for Android
            </button>
          </div>

          {/* Platform Availability */}
          <div className="pt-8 flex items-center gap-4 opacity-60 hover:opacity-100 transition-opacity">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Exclusively on</span>
            <div className="flex items-center gap-1.5">
              {/* Android icon */}
              <svg className="w-5 h-5 text-slate-700" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.6,9.48l1.84-3.18c0.16-0.31,0.04-0.69-0.26-0.85c-0.29-0.15-0.65-0.06-0.83,0.22l-1.88,3.24 c-2.86-1.21-6.08-1.21-8.94,0L5.65,5.67c-0.19-0.29-0.58-0.38-0.86-0.22C4.5,5.61,4.38,5.99,4.54,6.3L6.4,9.48 C3.3,11.25,1.28,14.44,1,18h22C22.72,14.44,20.7,11.25,17.6,9.48z M7,15.25c-0.69,0-1.25-0.56-1.25-1.25S6.31,12.75,7,12.75 s1.25,0.56,1.25,1.25S7.69,15.25,7,15.25z M17,15.25c-0.69,0-1.25-0.56-1.25-1.25s0.56-1.25,1.25-1.25s1.25,0.56,1.25,1.25 S17.69,15.25,17,15.25z"/>
              </svg>
              <span className="text-sm font-bold text-slate-700">Android</span>
            </div>
          </div>

          {/* Mini Interactive Indicator badges */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-semibold">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary" />
              <span>Offline Mapping Encrypted</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-electric-cyan" />
              <span>Real-Time Sensor Fusion</span>
            </div>
          </div>
        </div>

        {/* Right Side: Device Mockup and Glassmorphic Stats */}
        <div className="relative flex justify-center items-center py-6 md:py-8">
          
          {/* Main Image Container */}
          <div className="relative w-full max-w-[360px] md:max-w-[460px] hover:scale-[1.02] transition-transform duration-700 flex justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-electric-cyan/10 rounded-full blur-3xl -z-10 transform scale-75" />
            <img 
              alt="Compass True North Smartphone View" 
              className="w-[120%] max-w-none h-auto select-none pointer-events-none mix-blend-darken"
              style={{ 
                filter: 'contrast(1.1) brightness(1.05)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)',
                maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)'
              }}
              src="/mockup.png"
            />
          </div>

        </div>
      </div>
    </header>
  );
}
