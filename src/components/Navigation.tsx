import React from 'react';
import { Compass, Menu, X, Smartphone, Sparkles, Activity } from 'lucide-react';
import { ActiveToolType } from '../types';

interface NavigationProps {
  onOpenTool: (type: ActiveToolType) => void;
}

export default function Navigation({ onOpenTool }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100">
      <div className="flex justify-between items-center px-5 md:px-12 py-3 md:py-4 max-w-7xl mx-auto">
        
        {/* Brand logo */}
        <div className="flex items-center gap-12">
          <a href="#" className="flex items-center gap-2 group">
            <span className="p-1.5 bg-slate-900 text-white rounded-xl group-hover:scale-105 transition-transform shadow-sm">
              <Compass className="w-5 h-5 md:w-6 md:h-6 stroke-[2]" />
            </span>
            <span className="font-sans text-lg md:text-xl font-bold tracking-tight text-slate-900">
              Compass
            </span>
          </a>
          
          {/* Main Desktop Links */}
          <div className="hidden md:flex gap-8">
            <a 
              href="#" 
              className="text-sm font-semibold text-slate-500 hover:text-primary transition-colors py-2"
            >
              Home
            </a>
            <a 
              href="#explore" 
              className="text-sm font-semibold text-slate-500 hover:text-primary transition-colors py-2"
            >
              Explore
            </a>
            <a 
              href="#versatility" 
              className="text-sm font-semibold text-slate-500 hover:text-primary transition-colors py-2"
            >
              Interfaces
            </a>
          </div>
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => onOpenTool('download')}
            className="bg-slate-900 text-white text-xs font-bold px-6 py-3 rounded-full hover:bg-primary transition-all shadow-sm hover:shadow-md flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.6,9.48l1.84-3.18c0.16-0.31,0.04-0.69-0.26-0.85c-0.29-0.15-0.65-0.06-0.83,0.22l-1.88,3.24 c-2.86-1.21-6.08-1.21-8.94,0L5.65,5.67c-0.19-0.29-0.58-0.38-0.86-0.22C4.5,5.61,4.38,5.99,4.54,6.3L6.4,9.48 C3.3,11.25,1.28,14.44,1,18h22C22.72,14.44,20.7,11.25,17.6,9.48z M7,15.25c-0.69,0-1.25-0.56-1.25-1.25S6.31,12.75,7,12.75 s1.25,0.56,1.25,1.25S7.69,15.25,7,15.25z M17,15.25c-0.69,0-1.25-0.56-1.25-1.25s0.56-1.25,1.25-1.25s1.25,0.56,1.25,1.25 S17.69,15.25,17,15.25z"/>
            </svg>
            Download App
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center -mr-2">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md px-6 py-4 space-y-3 shadow-lg">
          <a 
            href="#" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
          >
            Home
          </a>
          <a 
            href="#explore" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
          >
            Explore Core Modules
          </a>
          <a 
            href="#versatility" 
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-50 rounded-xl"
          >
            Interface Gallery
          </a>
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTool('download');
              }}
              className="w-full py-3 flex items-center justify-center gap-2 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-md"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.6,9.48l1.84-3.18c0.16-0.31,0.04-0.69-0.26-0.85c-0.29-0.15-0.65-0.06-0.83,0.22l-1.88,3.24 c-2.86-1.21-6.08-1.21-8.94,0L5.65,5.67c-0.19-0.29-0.58-0.38-0.86-0.22C4.5,5.61,4.38,5.99,4.54,6.3L6.4,9.48 C3.3,11.25,1.28,14.44,1,18h22C22.72,14.44,20.7,11.25,17.6,9.48z M7,15.25c-0.69,0-1.25-0.56-1.25-1.25S6.31,12.75,7,12.75 s1.25,0.56,1.25,1.25S7.69,15.25,7,15.25z M17,15.25c-0.69,0-1.25-0.56-1.25-1.25s0.56-1.25,1.25-1.25s1.25,0.56,1.25,1.25 S17.69,15.25,17,15.25z"/>
              </svg>
              Download App
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
