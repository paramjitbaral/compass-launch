import React, { useState } from 'react';
import { 
  Eye, Compass, Sun, MapPin, Target, Activity, ArrowUpRight
} from 'lucide-react';
import { ActiveToolType } from '../types';

interface BentoGridProps {
  onOpenTool: (type: ActiveToolType) => void;
}

const features = [
  {
    id: 'ar-navigation' as ActiveToolType,
    title: 'Immersive Overlay',
    description: 'Overlay high-fidelity instrumentation directly onto your field of vision with sub-millisecond latency.',
    icon: <Eye className="w-6 h-6" />,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLt0To_bKXx00WqLDLBmuFUUHXqkrWY9-buWUSCRUGOCMwo5TlNz5JvtF4JMHqKsJnXhXljOK9Tqk2SW4HidK8ADCKNJG70yDWL6H0QZMGkwwGVAT8FG5aRew86UOSdQ_iC9p2KcPr0EUv-ZSs_0HJmj23EKxVKr3svSgwRRUz0kfqEI_5Uv8agsceeFNm6lSx3lXkcQbJnKoXMtlRhIqpkrkoucqyliPIFS75l3rzLWj0tuLdH1d98cB8hn'
  },
  {
    id: 'true-north' as ActiveToolType,
    title: 'Absolute Accuracy',
    description: 'Adaptive geomagnetic modeling ensures absolute directional accuracy across all hemispheres.',
    icon: <Compass className="w-6 h-6" />,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLvkLyZGrRuwRhzORYeApN6vUZLIxDWGhS7cZhqMcbU-wbbcnCe0MWR8l-wWFa1LtblNj86FeNq1j7hCmzKCHtMp5oRZi1lU2IjK11M_-05LHLHeRNnNV7AT6XhTKWMnBOxH6fvHraarO5YP4BW7dgU5yEH7eRP623bNXJCqb-FQvb0z1gsmxUt8T8IJ-lWCAbxAIBKgK6ZQKLNtFc9aBx8R0R60M4_h7Pz7M1CInwedAoNlACJA_1IvXfnE'
  },
  {
    id: 'solar-path' as ActiveToolType,
    title: 'Elevation & Azimuth',
    description: 'Real-time solar tracking for professional lighting analysis and celestial navigation.',
    icon: <Sun className="w-6 h-6" />,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLuxLvyQ9mCFoMk-O1pOAwSI9vOWqZjQwnOEGwkehpODUkLZeqGtA-Cyd9XokFxkNxOCcuVzKmAg4zPmSWlCsRNq11jEwVOEiFABhdUZ6x1HCSc7zT7TKgzrI5ft261FSLsxfZCDRjh1jRK2fgeDuH6AI46XXxKvMRQeCZLwL1tJqWnHFUq11OW8MxNJaGFP9799CTbgSPA47-B3agZgqbgCdXGvCWLZr0l_n0hVFSbH2CuKFvcJXFc94kyc'
  },
  {
    id: 'waypoint' as ActiveToolType,
    title: 'Coordinate Lock',
    description: 'Input any latitude and longitude for a persistent digital beacon directly in your HUD.',
    icon: <MapPin className="w-6 h-6" />,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLujdJmI4TA6RtqS5LqO6bLdsoINT5v_i40EZ-RWWBZfyvtROhwS1JHIIYXc87OBDg4Ghd5A5SnMe432QZawxTMsXVtdfIYIqOHKYQwgG_Zca62bD1TM87ITzMiSEw_GrWoRan5zV21ClnAoC3iFCWojxf8xECjLtUuPAhAMNNXWTkxwRfosH4J9jthRfTWre7n2viAqXyoP83nzWbWKMnOaBx5CGCvdPPkvP7ibfKXXZBhm5hgfVlqt50sR'
  },
  {
    id: 'target-lock' as ActiveToolType,
    title: 'Spatial Anchoring',
    description: 'Lock onto any physical landmark and intuitively maintain your heading regardless of device orientation.',
    icon: <Target className="w-6 h-6" />,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLtCTxO8JXqsco2eJzRUwi4TBfjeqIQW1E3DvXKhXLPWcp8xJ70JqZBM_D1x-b-M-ut1GM-Lf8nfgI4TOo2fmRavQTx-kfKCY3_BZzQT2DFPKTiM907XxnrEFvm88jGdLVZe0vu90CAx-CN4mZJpQ96lDDPgYBXZezdedo_EtgDzICfkJuqeL97ZPZuRpR6HGE1R7wd3JEHzfXmXY0KSaurWOi_UCDj_BfbMDQZrCjw5bGtGYMwWx8yc3ZQk'
  },
  {
    id: 'kinetic' as ActiveToolType,
    title: 'Kinetic Analysis',
    description: 'Sensor-fused velocity tracking with acceleration curves and grade analysis accurate to 0.1 m/s.',
    icon: <Activity className="w-6 h-6" />,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLuvMzdZeMtH1YxvwGY_ZEppSz_8tBPy3yKQ3uTJBxvPRWZHQBZokyUYwtWaLA6_bD128ySwgW8x4ZcG_pCuDsf7yV2tM6xn9agR_9N6Z8zdtiL8AB2oqgIGj9o2kub36bq4GHQTxK3pvbmqqkAjyamQyza3avEls30CQwcjbscYtx6UniJm2VK_2zuKEwVQztSS9gKPeTSZ6hy3mlzmV7PFFRvvAvrsQno44bzOgcAKOjAViPzBK6LhrPo'
  }
];

export default function BentoGrid({ onOpenTool }: BentoGridProps) {
  return (
    <section className="py-24 overflow-hidden bg-white" id="explore">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Simple Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8 text-left">
          <div className="max-w-2xl space-y-2">
            <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] block">
              Core Architecture
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Engineered for precision.
            </h2>
            <p className="text-slate-500 text-[15px] leading-relaxed">
              Six core modules built with aerospace-grade tracking for the most demanding environments on Earth.
            </p>
          </div>
          
          <button 
            onClick={() => onOpenTool('specs')}
            className="group flex items-center gap-2 text-slate-900 text-sm font-bold hover:text-primary transition-colors shrink-0"
          >
            All Specifications <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* True Minimalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 md:gap-y-12">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              onClick={() => onOpenTool(feature.id)}
              className="group cursor-pointer flex flex-col"
            >
              {/* Flat Image - Zero shadows, zero borders */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50 mb-4">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
                />
              </div>

              {/* Clean Typography */}
              <div className="flex flex-col">
                <h3 className="flex items-center gap-2 text-[15px] font-semibold text-slate-900 mb-0.5 tracking-tight">
                  <span className="text-slate-400">
                    {React.cloneElement(feature.icon as React.ReactElement<{ className?: string }>, { className: 'w-3.5 h-3.5' })}
                  </span>
                  {feature.title}
                </h3>
                
                <p className="text-slate-500 text-[13px] leading-relaxed pr-4">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
