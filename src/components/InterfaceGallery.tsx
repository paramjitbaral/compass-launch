import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Share2, Compass, Eye, MapPin, Activity } from 'lucide-react';
import { ActiveToolType } from '../types';

interface GalleryCard {
  id: ActiveToolType;
  title: string;
  subtitle: string;
  src: string;
}

const GALLERY_DATA: GalleryCard[] = [
  {
    id: 'true-north',
    title: 'Compass Interface',
    subtitle: 'High-fidelity traditional compass with absolute precision.',
    src: '/COMPASS.png'
  },
  {
    id: 'ar-navigation',
    title: 'AR Mode',
    subtitle: 'Augmented reality overlay for precise visual navigation.',
    src: '/AR MODE.png'
  },
  {
    id: 'kinetic',
    title: 'Speed Tracker',
    subtitle: 'High-frequency velocity analysis and tracking metrics.',
    src: '/SPEED.png'
  },
  {
    id: 'waypoint',
    title: 'Level Indicator',
    subtitle: 'Multi-axis leveling system for perfect device alignment.',
    src: '/LEVEL.png'
  },
  {
    id: 'specs',
    title: 'Gravity Mapping',
    subtitle: 'Real-time gravitational force mapping and acceleration.',
    src: '/GRAVITY.png'
  }
];

interface InterfaceGalleryProps {
  onOpenTool: (type: ActiveToolType) => void;
}

export default function InterfaceGallery({ onOpenTool }: InterfaceGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 350;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 bg-slate-50 overflow-hidden" id="versatility">
      
      {/* Header Container */}
      <div className="px-6 md:px-12 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end max-w-7xl mx-auto gap-8 text-left">
        <div className="max-w-2xl space-y-2">
          <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] block">
            Interface Gallery
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            Visual Modules.
          </h2>
          <p className="text-slate-500 text-[15px] leading-relaxed">
            Explore the professional-grade instruments and data visualizations included in the compass toolkit.
          </p>
        </div>
        
        {/* Slide controls */}
        <div className="hidden md:flex gap-3 shrink-0 mt-2 md:mt-0">
          <button 
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center text-slate-700 shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-full border border-slate-200 bg-white hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center text-slate-700 shadow-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

        {/* Horizontal Scroll Containers */}
      <div 
        ref={containerRef}
        className="flex gap-4 md:gap-6 px-6 md:px-12 overflow-x-auto select-none no-scrollbar pb-8 snap-x snap-mandatory max-w-7xl mx-auto custom-scrollbar"
      >
        {GALLERY_DATA.map((card) => (
          <div 
            key={card.title}
            className="flex-none w-[160px] sm:w-[180px] md:w-[220px] snap-center"
          >
            {/* Image container */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-white relative">
              <img 
                className="w-full h-auto object-contain select-none" 
                src={card.src} 
                alt={card.title} 
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
