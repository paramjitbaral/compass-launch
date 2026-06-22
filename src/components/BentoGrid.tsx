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
    title: 'AR View',
    description: 'See the compass direction overlaid directly on your live camera feed so you always know where you are looking.',
    icon: <Eye className="w-6 h-6" />,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLt0To_bKXx00WqLDLBmuFUUHXqkrWY9-buWUSCRUGOCMwo5TlNz5JvtF4JMHqKsJnXhXljOK9Tqk2SW4HidK8ADCKNJG70yDWL6H0QZMGkwwGVAT8FG5aRew86UOSdQ_iC9p2KcPr0EUv-ZSs_0HJmj23EKxVKr3svSgwRRUz0kfqEI_5Uv8agsceeFNm6lSx3lXkcQbJnKoXMtlRhIqpkrkoucqyliPIFS75l3rzLWj0tuLdH1d98cB8hn'
  },
  {
    id: 'true-north' as ActiveToolType,
    title: 'True North Compass',
    description: 'A highly accurate digital compass that relies on advanced sensors to point to True North anywhere in the world.',
    icon: <Compass className="w-6 h-6" />,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLvkLyZGrRuwRhzORYeApN6vUZLIxDWGhS7cZhqMcbU-wbbcnCe0MWR8l-wWFa1LtblNj86FeNq1j7hCmzKCHtMp5oRZi1lU2IjK11M_-05LHLHeRNnNV7AT6XhTKWMnBOxH6fvHraarO5YP4BW7dgU5yEH7eRP623bNXJCqb-FQvb0z1gsmxUt8T8IJ-lWCAbxAIBKgK6ZQKLNtFc9aBx8R0R60M4_h7Pz7M1CInwedAoNlACJA_1IvXfnE'
  },
  {
    id: 'solar-path' as ActiveToolType,
    title: 'Solar Path Tracking',
    description: "Track the sun's exact position and path across the sky throughout the day to plan your outdoor activities.",
    icon: <Sun className="w-6 h-6" />,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLuxLvyQ9mCFoMk-O1pOAwSI9vOWqZjQwnOEGwkehpODUkLZeqGtA-Cyd9XokFxkNxOCcuVzKmAg4zPmSWlCsRNq11jEwVOEiFABhdUZ6x1HCSc7zT7TKgzrI5ft261FSLsxfZCDRjh1jRK2fgeDuH6AI46XXxKvMRQeCZLwL1tJqWnHFUq11OW8MxNJaGFP9799CTbgSPA47-B3agZgqbgCdXGvCWLZr0l_n0hVFSbH2CuKFvcJXFc94kyc'
  },
  {
    id: 'waypoint' as ActiveToolType,
    title: 'Save Waypoints',
    description: 'Save specific locations and coordinates, and get a reliable arrow pointing exactly where you need to go.',
    icon: <MapPin className="w-6 h-6" />,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLujdJmI4TA6RtqS5LqO6bLdsoINT5v_i40EZ-RWWBZfyvtROhwS1JHIIYXc87OBDg4Ghd5A5SnMe432QZawxTMsXVtdfIYIqOHKYQwgG_Zca62bD1TM87ITzMiSEw_GrWoRan5zV21ClnAoC3iFCWojxf8xECjLtUuPAhAMNNXWTkxwRfosH4J9jthRfTWre7n2viAqXyoP83nzWbWKMnOaBx5CGCvdPPkvP7ibfKXXZBhm5hgfVlqt50sR'
  },
  {
    id: 'target-lock' as ActiveToolType,
    title: 'Target Lock',
    description: 'Lock your compass onto a specific direction and let the app alert you if you ever veer off course.',
    icon: <Target className="w-6 h-6" />,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLtCTxO8JXqsco2eJzRUwi4TBfjeqIQW1E3DvXKhXLPWcp8xJ70JqZBM_D1x-b-M-ut1GM-Lf8nfgI4TOo2fmRavQTx-kfKCY3_BZzQT2DFPKTiM907XxnrEFvm88jGdLVZe0vu90CAx-CN4mZJpQ96lDDPgYBXZezdedo_EtgDzICfkJuqeL97ZPZuRpR6HGE1R7wd3JEHzfXmXY0KSaurWOi_UCDj_BfbMDQZrCjw5bGtGYMwWx8yc3ZQk'
  },
  {
    id: 'kinetic' as ActiveToolType,
    title: 'Speed & Elevation',
    description: 'Monitor your walking or driving speed and track real-time elevation changes as you explore.',
    icon: <Activity className="w-6 h-6" />,
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLuvMzdZeMtH1YxvwGY_ZEppSz_8tBPy3yKQ3uTJBxvPRWZHQBZokyUYwtWaLA6_bD128ySwgW8x4ZcG_pCuDsf7yV2tM6xn9agR_9N6Z8zdtiL8AB2oqgIGj9o2kub36bq4GHQTxK3pvbmqqkAjyamQyza3avEls30CQwcjbscYtx6UniJm2VK_2zuKEwVQztSS9gKPeTSZ6hy3mlzmV7PFFRvvAvrsQno44bzOgcAKOjAViPzBK6LhrPo'
  }
];

export default function BentoGrid({ onOpenTool }: BentoGridProps) {
  return (
    <section className="py-16 md:py-20 overflow-hidden bg-white" id="explore">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Simple Section Header */}
        <div className="mb-10 md:mb-12 text-left">
          <div className="max-w-2xl space-y-1.5 md:space-y-2">
            <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] block">
              Key Features
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
              Powerful navigation tools.
            </h2>
            <p className="text-slate-500 text-[13px] md:text-[14px] leading-relaxed">
              Simple, powerful tools to help you find your way, whether you're exploring the city or the wilderness.
            </p>
          </div>
        </div>

        {/* True Minimalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 md:gap-y-10">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="flex flex-col"
            >
              {/* Flat Image - Zero shadows, zero borders */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-50 mb-4">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Clean Typography */}
              <div className="flex flex-col">
                <h3 className="flex items-center gap-2 text-[14px] font-semibold text-slate-900 mb-0.5 tracking-tight">
                  <span className="text-slate-400">
                    {React.cloneElement(feature.icon as React.ReactElement<{ className?: string }>, { className: 'w-3.5 h-3.5' })}
                  </span>
                  {feature.title}
                </h3>
                
                <p className="text-slate-500 text-[12px] leading-relaxed pr-2 md:pr-4">
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
