import React from 'react';
import { Compass } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-5 md:py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-2.5 md:gap-4 text-[11px] md:text-[13px] font-medium text-slate-500">
        
        {/* Left Side: Brand & Copyright */}
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
          <span className="font-bold text-slate-900 flex items-center gap-1.5 textxs md:text-[13px]">
            <Compass className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-900" />
            Compass
          </span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span>© 2026 Navigation Systems</span>
        </div>

        {/* Right Side: Links & Status */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 md:gap-6">
          <div className="flex items-center gap-3 md:gap-6">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Contact</a>
          </div>
          
          {/* Status Indicator */}
          <div className="flex items-center gap-1.5 md:gap-2 pl-0 sm:pl-6 sm:border-l border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span>All systems nominal</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
