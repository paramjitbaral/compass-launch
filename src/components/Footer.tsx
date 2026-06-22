import React, { useState } from 'react';
import { Compass, Globe, Share2, Heart, Shield, Activity, Sparkles } from 'lucide-react';
import { ActiveToolType } from '../types';

interface FooterProps {
  onOpenTool: (type: ActiveToolType) => void;
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] font-medium text-slate-500">
        
        {/* Left Side: Brand & Copyright */}
        <div className="flex items-center gap-4">
          <span className="font-bold text-slate-900 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-slate-900" />
            Compass
          </span>
          <span className="text-slate-300">|</span>
          <span>© 2026 Navigation Systems</span>
        </div>

        {/* Right Side: Links & Status */}
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Contact</a>
          
          {/* Status Indicator */}
          <div className="flex items-center gap-2 ml-2 pl-6 border-l border-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span>All systems nominal</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
