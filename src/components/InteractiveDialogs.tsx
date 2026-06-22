import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Info, Compass, ShieldAlert, Sun, MapPin, Target, Eye, 
  Activity, RotateCcw, AlertTriangle, Radio, Navigation2, 
  Tv, Cpu, Sparkles, Sliders, Smartphone, Check, Download
} from 'lucide-react';
import { ActiveToolType } from '../types';

interface DialogsProps {
  activeTool: ActiveToolType;
  onClose: () => void;
}

export default function InteractiveDialogs({ activeTool, onClose }: DialogsProps) {
  if (!activeTool) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
          className={`relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 z-10 flex flex-col max-h-[90vh] ${activeTool === 'download' ? 'w-[85vw] sm:w-full max-w-[320px] md:max-w-md' : 'w-full max-w-2xl'}`}
        >
          {/* Header */}
          {activeTool !== 'download' && (
            <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-primary/10 rounded-xl text-primary">
                  {getIcon(activeTool)}
                </span>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block leading-none mb-1">
                    Aerospace Instrumentation // {activeTool.toUpperCase()}
                  </span>
                  <h4 className="text-xl font-bold text-slate-900 leading-none">
                    {getTitle(activeTool)}
                  </h4>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Scrollable Content Container */}
          <div className={`flex-1 overflow-y-auto relative ${activeTool === 'download' ? 'p-6 pt-8 md:p-8 md:pt-10' : 'p-6 md:p-8'}`}>
            {activeTool === 'download' && (
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            {renderContent(activeTool, onClose)}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// Helper to resolve icon
function getIcon(type: ActiveToolType) {
  switch (type) {
    case 'true-north': return <Compass className="w-5 h-5" />;
    case 'ar-navigation': return <Eye className="w-5 h-5" />;
    case 'solar-path': return <Sun className="w-5 h-5" />;
    case 'waypoint': return <MapPin className="w-5 h-5" />;
    case 'target-lock': return <Target className="w-5 h-5" />;
    case 'kinetic': return <Activity className="w-5 h-5" />;
    case 'specs': return <Cpu className="w-5 h-5" />;
    case 'download': return <Download className="w-5 h-5" />;
    default: return <Info className="w-5 h-5" />;
  }
}

// Helper to resolve title
function getTitle(type: ActiveToolType) {
  switch (type) {
    case 'true-north': return 'Geomag Calibration Studio';
    case 'ar-navigation': return 'AR HUD Flight Deck';
    case 'solar-path': return 'Astronomical Path Tracer';
    case 'waypoint': return 'Waypoint Beacon Lock';
    case 'target-lock': return 'Spatial Anchoring Array';
    case 'kinetic': return 'Kinetic Analysis Engine';
    case 'specs': return 'Aerospace Specifications';
    case 'download': return 'Install Compass App';
    default: return 'Instrument Interface';
  }
}

// Main switch for content rendering
function renderContent(type: ActiveToolType, onClose: () => void) {
  switch (type) {
    case 'true-north':
      return <TrueNorthSimulator />;
    case 'ar-navigation':
      return <ArHudSimulator />;
    case 'solar-path':
      return <SolarPathSimulator />;
    case 'waypoint':
      return <WaypointSimulator />;
    case 'target-lock':
      return <TargetLockSimulator />;
    case 'kinetic':
      return <KineticSimulator />;
    case 'specs':
      return <HardwareSpecsPanel />;
    case 'download':
      return <DownloadAppPanel onClose={onClose} />;
    default:
      return <div>Standard aerospace telemetry.</div>;
  }
}

/* ==========================================
      1. TRUE NORTH CALIBRATION SIMULATOR
   ========================================== */
function TrueNorthSimulator() {
  const [heading, setHeading] = useState(137);
  const [calibrating, setCalibrating] = useState(false);
  const [calibrationProgress, setCalibrationProgress] = useState(0);
  const [magneticField, setMagneticField] = useState(48.2);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (calibrating) {
      interval = setInterval(() => {
        setCalibrationProgress(prev => {
          if (prev >= 100) {
            setCalibrating(false);
            setMagneticField(45.1 + Math.random() * 2);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [calibrating]);

  const handleCalibrate = () => {
    setCalibrating(true);
    setCalibrationProgress(0);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Animated Compass Circle */}
        <div className="relative w-48 h-48 flex items-center justify-center bg-slate-900 rounded-full shadow-inner border-[6px] border-slate-800">
          <motion.div 
            style={{ rotate: heading }}
            className="absolute inset-[15px] border-2 border-dashed border-primary/40 rounded-full"
            animate={calibrating ? { rotate: [heading, heading + 360] } : {}}
            transition={calibrating ? { repeat: Infinity, duration: 2, ease: "linear" } : {}}
          />
          <motion.div 
            style={{ rotate: -heading }}
            className="absolute inset-0 flex items-center justify-center text-white"
          >
            <div className="absolute top-2 text-xs font-bold font-mono tracking-widest text-[#00E5FF]">N</div>
            <div className="absolute bottom-2 text-xs font-bold font-mono text-slate-400">S</div>
            <div className="absolute left-2 text-xs font-bold font-mono text-slate-400">W</div>
            <div className="absolute right-2 text-xs font-bold font-mono text-slate-400">E</div>
          </motion.div>
          {/* Arrow */}
          <div className="absolute top-[20px] w-[4px] h-[74px] bg-gradient-to-b from-primary to-[#00E5FF] origin-bottom transform translate-y-[-10px] rounded-full z-10" />
          
          <div className="absolute bg-slate-950/90 rounded-full w-20 h-20 flex flex-col items-center justify-center border border-slate-700">
            <span className="text-xl font-mono text-white font-bold leading-none">{heading}°</span>
            <span className="text-[9px] font-bold text-slate-400 tracking-wider">NE</span>
          </div>
        </div>

        {/* Info & Slider controls */}
        <div className="flex-1 space-y-4 w-full">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">
              Simulate Device Rotation
            </label>
            <div className="flex items-center gap-3">
              <input 
                type="range"
                min="0"
                max="359"
                value={heading}
                onChange={(e) => setHeading(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <span className="font-mono text-sm text-slate-700 min-w-[32px]">{heading}°</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white border border-slate-200/60 rounded-xl p-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Declination</span>
              <div className="text-sm font-semibold text-slate-800">11.8° East</div>
            </div>
            <div className="bg-white border border-slate-200/60 rounded-xl p-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mag Field</span>
              <div className="text-sm font-semibold text-slate-800">{magneticField.toFixed(1)} μT</div>
            </div>
            <div className="bg-white border border-slate-200/60 rounded-xl p-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inclination</span>
              <div className="text-sm font-semibold text-slate-800">62.4°</div>
            </div>
            <div className="bg-white border border-slate-200/60 rounded-xl p-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gyro Status</span>
              <div className="text-sm font-semibold text-green-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span> Active
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calibration Game Trigger */}
      <div className="border border-slate-200 rounded-2xl p-5 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-xs font-bold text-primary tracking-widest uppercase">Precision Calibration</span>
            <h5 className="text-base font-bold text-slate-900">Interference Recalibration</h5>
            <p className="text-xs text-slate-500">Compensate for surrounding metals and electric fields using standard figure-8 motion tracking.</p>
          </div>
          <button
            onClick={handleCalibrate}
            disabled={calibrating}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
              calibrating 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                : 'bg-primary text-white hover:bg-primary-container shadow-md'
            }`}
          >
            {calibrating ? 'Recalibrating...' : 'Start Calibration'}
          </button>
        </div>

        {calibrating && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-500">Figure-8 Motion Tracking</span>
              <span className="text-primary font-bold">{calibrationProgress}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${calibrationProgress}%` }}
                className="bg-primary h-full"
              />
            </div>
          </div>
        )}

        {!calibrating && calibrationProgress === 100 && (
          <div className="bg-green-50 border border-green-100 text-green-800 rounded-xl p-3 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-green-600 shrink-0" />
            <span>Calibration Complete! Dynamic error margins reduced to <strong className="font-bold">±0.04°</strong>.</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ==========================================
      2. AR OVERLAY FLIGHT DECK HUD
   ========================================== */
function ArHudSimulator() {
  const [transparency, setTransparency] = useState(80);
  const [fov, setFov] = useState(72);
  const [hudType, setHudType] = useState<'aero' | 'topo' | 'tactical'>('aero');
  const [scanning, setScanning] = useState(true);

  return (
    <div className="space-y-6">
      {/* HUD Camera Feed mockup */}
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
        {/* Background mock camera feed scene */}
        <div className="absolute inset-0 opacity-40">
          <img 
            alt="Mock AR scene" 
            src="https://images.unsplash.com/photo-1542401886-65d6c61db217?auto=format&fit=crop&w=800&q=80" 
            className="w-full h-full object-cover blur-sm"
          />
        </div>

        {/* Simulated HUD elements */}
        <div 
          className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between font-mono text-[9px] md:text-[10px]"
          style={{ 
            opacity: transparency / 100,
            color: hudType === 'topo' ? '#4ade80' : hudType === 'tactical' ? '#ff7e33' : '#00E5FF'
          }}
        >
          {/* Top Info */}
          <div className="flex justify-between">
            <div className="space-y-1">
              <div>SYS ID: AR-COMPASS // LIVE</div>
              <div>LAT: 34.0522° N  |  LON: 118.2437° W</div>
              <div>FOV: {fov}° // SENSOR-NORMAL</div>
            </div>
            <div className="text-right space-y-1">
              <div>HDG: 137° NE</div>
              <div>ALT: 1,424M GPS // BARO</div>
              <div className="flex items-center justify-end gap-1">
                <span className={`w-1.5 h-1.5 rounded-full animate-ping ${hudType === 'topo' ? 'bg-green-500' : hudType === 'tactical' ? 'bg-orange-500' : 'bg-[#00E5FF]'}`} />
                <span>REC_ON_IMU</span>
              </div>
            </div>
          </div>

          {/* Central Target Overlay Crosshairs */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-40 h-40 border border-white/10 rounded-full flex items-center justify-center">
              {/* Spinning compass compass arc */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                className={`absolute inset-4 border border-dashed rounded-full ${hudType === 'topo' ? 'border-green-500/30' : hudType === 'tactical' ? 'border-orange-500/30' : 'border-[#00E5FF]/30'}`}
              />

              {/* Pitch and roll indicator lines */}
              <div className={`w-20 border-t ${hudType === 'topo' ? 'border-green-400' : hudType === 'tactical' ? 'border-orange-400' : 'border-[#00e5ff]'} h-0 absolute`} style={{ transform: 'rotate(2deg)' }} />
              <div className="absolute flex flex-col items-center">
                <span className="text-[8px] tracking-widest font-bold">W-WAYPOINT</span>
                <span className="text-xs font-bold font-mono">2.4KM</span>
              </div>
              <div className="absolute -top-6 animate-bounce">
                <Target className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Bottom telemetry values */}
          <div className="flex justify-between items-end">
            <div>
              <div>STABILIZATION: MULTI-AXIS</div>
              <div>ACC: ± 0.1M SPATIAL</div>
              <div className="h-1.5 w-24 bg-slate-800 rounded-full mt-1 overflow-hidden">
                <div className={`h-full w-4/5 rounded-full ${hudType === 'topo' ? 'bg-green-500' : hudType === 'tactical' ? 'bg-orange-500' : 'bg-[#00E5FF]'}`} />
              </div>
            </div>
            <div className="text-right">
              <div>DECOUPLED MAG TRACKING</div>
              <div>SPEED: 4.8 m/s</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border border-slate-200/60 rounded-2xl p-4 space-y-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Telemetry Settings</span>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 font-medium">HUD Transparency</span>
                <span className="text-slate-800 font-bold">{transparency}%</span>
              </div>
              <input 
                type="range"
                min="20"
                max="100"
                value={transparency}
                onChange={(e) => setTransparency(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg cursor-pointer accent-primary"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-600 font-medium font-mono">Camera FOV</span>
                <span className="text-slate-800 font-bold">{fov}°</span>
              </div>
              <input 
                type="range"
                min="50"
                max="110"
                value={fov}
                onChange={(e) => setFov(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg cursor-pointer accent-primary"
              />
            </div>
          </div>
        </div>

        <div className="border border-slate-200/60 rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-4">HUD Projection Profile</span>
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => setHudType('aero')}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  hudType === 'aero' 
                    ? 'bg-primary/5 text-primary border-primary' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Aero Teal
              </button>
              <button 
                onClick={() => setHudType('topo')}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  hudType === 'topo' 
                    ? 'bg-green-50/70 text-green-600 border-green-500' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Topo Green
              </button>
              <button 
                onClick={() => setHudType('tactical')}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  hudType === 'tactical' 
                    ? 'bg-orange-50/70 text-orange-600 border-orange-500' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                HUD Amber
              </button>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-500 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <span>AR projection maps in composite real-world terrain on any flat layout.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================
      3. SOLAR ELEVATION & AZIMUTH
   ========================================== */
function SolarPathSimulator() {
  const [time, setTime] = useState(11.5); // Hours (e.g. 11:30 AM)
  const [solarPanels, setSolarPanels] = useState(94); // Efficiency %

  // Calculate Elevation and Azimuth simply based on solar hour
  // Hour ranges from 6 (sunrise) to 18 (sunset)
  const isDaylight = time >= 6 && time <= 18;
  const rawElevation = isDaylight ? Math.sin((time - 6) / 12 * Math.PI) * 78 : -10;
  const elevation = rawElevation < 0 ? 0 : Number(rawElevation.toFixed(1));
  const azimuth = Number((60 + (time - 6) / 12 * 240).toFixed(1));

  // Simulated power calculation
  const efficiency = isDaylight ? Math.round(Math.sin((time - 6) / 12 * Math.PI) * 100) : 0;

  // Format hour label
  const hour = Math.floor(time);
  const minutes = Math.floor((time - hour) * 60).toString().padStart(2, '0');
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayTime = `${hour > 12 ? hour - 12 : hour}:${minutes} ${period}`;

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Sky Solar Path Arc Visualizer */}
        <div className="relative aspect-square max-w-[240px] mx-auto w-full flex items-center justify-center bg-sky-950 rounded-full border-[6px] border-slate-800 overflow-hidden shadow-inner">
          {/* Day / Night atmospheric backdrop */}
          <div className={`absolute inset-0 transition-all duration-500 ${
            time > 6 && time < 17 ? 'bg-gradient-to-b from-sky-450 to-blue-900 opacity-60' :
            time >= 17 && time <= 19 ? 'bg-gradient-to-b from-orange-400 to-indigo-950 opacity-60' :
            'bg-slate-950 opacity-80'
          }`} />

          {/* Compass grid line */}
          <div className="absolute inset-4 border border-dashed border-white/10 rounded-full" />
          <div className="absolute h-0.5 w-[90%] border-t border-dashed border-white/10" />

          {/* Golden Solar Path Symmetrical Arc */}
          <svg className="absolute inset-0 w-full h-full p-4" viewBox="0 0 100 100">
            <path 
              d="M 10 70 A 40 40 0 0 1 90 70" 
              fill="none" 
              stroke="rgba(251, 191, 36, 0.3)" 
              strokeWidth="2" 
              strokeDasharray="4"
            />
            {/* Sun indicator element if daylight */}
            {isDaylight && (
              <motion.circle 
                cx={10 + (time - 6) / 12 * 80}
                cy={70 - Math.sin((time - 6) / 12 * Math.PI) * 40}
                r="4"
                fill="#fbbf24"
                className="shadow-lg shadow-amber-300"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            )}
          </svg>

          {/* Core values inside */}
          <div className="relative text-center text-white space-y-1">
            <span className="text-[10px] font-bold text-amber-400 tracking-widest uppercase block">
              {isDaylight ? (time > 16 ? 'Sunset Arc' : time < 8 ? 'Sunrise Arc' : 'Peak Altitude') : 'Nocturnal Path'}
            </span>
            <div className="text-3xl font-mono font-bold leading-none">{elevation}°</div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Elevation Angle</span>
          </div>
        </div>

        {/* Info detail sliders */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-500 uppercase tracking-widest">Simulate Celestial Time</span>
              <span className="font-mono bg-primary/10 text-primary px-2.5 py-1 rounded-md font-bold text-sm">
                {displayTime}
              </span>
            </div>
            
            <input 
              type="range"
              min="4"
              max="21"
              step="0.5"
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-amber-500"
            />

            <div className="flex justify-between text-[10px] text-slate-400 font-bold tracking-wider">
              <span>04:00 AM (Dawn)</span>
              <span>12:00 PM (Noon)</span>
              <span>09:00 PM (Night)</span>
            </div>
          </div>

          <div className="border border-slate-200/60 rounded-xl p-4 bg-white grid grid-cols-2 gap-3">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Azi. Orientation</span>
              <div className="text-base font-bold text-slate-800 font-mono">{azimuth}° NE</div>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Solar Efficiency</span>
              <div className="text-base font-bold text-slate-800 font-mono">{efficiency}%</div>
            </div>
            <div className="col-span-2 pt-2 border-t border-slate-100 flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400" />
              <p className="text-[11px] text-slate-500">
                {isDaylight ? `Optimal panel angle tracking at ${azimuth < 180 ? 'East to South' : 'South to West'} path.` : 'Nocturnal solar elevation - tracking offline.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================
      4. WAYPOINT BEACON LOCK & VECTOR RADAR
   ========================================== */
function WaypointSimulator() {
  const [lat, setLat] = useState('34.0522');
  const [lng, setLng] = useState('-118.2437');
  const [beaconName, setBeaconName] = useState('Base Camp Alpha');
  const [locked, setLocked] = useState(true);

  // Calculated distance based on manual inputs
  const currentLat = 34.0123;
  const currentLng = -118.2132;
  const [distance, setDistance] = useState(2.4);

  const calculateDistance = () => {
    const latDiff = Math.abs(currentLat - Number(lat || 0));
    const lngDiff = Math.abs(currentLng - Number(lng || 0));
    // Super simplified Euclidean coordinate to km
    const dist = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff) * 111.3;
    setDistance(Number(dist.toFixed(1)));
    setLocked(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Form panel */}
        <div className="space-y-4 border border-slate-200/60 p-5 rounded-2xl bg-white shadow-sm">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Configure Target Coordinate</span>
          
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Beacon Identifier</label>
              <input 
                type="text"
                value={beaconName}
                onChange={(e) => setBeaconName(e.target.value)}
                placeholder="e.g. Ridge Summit 02"
                className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Latitude (°N)</label>
                <input 
                  type="text"
                  value={lat}
                  onChange={(e) => { setLat(e.target.value); setLocked(false); }}
                  placeholder="34.0522"
                  className="w-full px-3.5 py-2 text-sm font-mono border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Longitude (°W)</label>
                <input 
                  type="text"
                  value={lng}
                  onChange={(e) => { setLng(e.target.value); setLocked(false); }}
                  placeholder="-118.2437"
                  className="w-full px-3.5 py-2 text-sm font-mono border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <button 
              onClick={calculateDistance}
              className="w-full py-3 bg-slate-900 hover:bg-slate-850 text-white rounded-xl text-xs font-bold transition-all mt-2"
            >
              Re-Establish Active Beacon Lock
            </button>
          </div>
        </div>

        {/* Vector Pointer Visualizer */}
        <div className="bg-slate-950 border border-slate-900 rounded-2xl p-6 text-center space-y-6 flex flex-col items-center">
          <span className="text-[10px] font-bold text-primary tracking-widest uppercase block">Holographic Beacon Pointer</span>
          
          <div className="relative w-36 h-36 flex items-center justify-center bg-slate-900 rounded-full border-2 border-slate-800">
            {/* Spinning Radar Line */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-primary/10 rounded-full"
            />

            {/* Glowing Pointer Arrow */}
            <motion.div 
              animate={locked ? { rotate: [42, 45, 43, 45] } : { rotate: 360 }}
              transition={locked ? { repeat: Infinity, duration: 3, ease: "easeInOut" } : { repeat: Infinity, duration: 2 }}
              className="absolute inset-4 flex items-center justify-center pointer-events-none"
            >
              <Navigation2 className="w-8 h-8 text-[#00E5FF] fill-[#00E5FF] transform -rotate-45" />
            </motion.div>

            <span className="absolute bottom-2 text-[9px] font-bold font-mono text-[#00E5FF] tracking-widest uppercase">
              {locked ? 'Beacon Locked' : 'Searching...'}
            </span>
          </div>

          <div className="w-full grid grid-cols-2 gap-2 font-mono text-center">
            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
              <span className="text-[9px] text-slate-500 uppercase">Target Range</span>
              <div className="text-base text-white font-bold">{distance} km</div>
            </div>
            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
              <span className="text-[9px] text-slate-500 uppercase">Bearing Vector</span>
              <div className="text-base text-white font-bold">045° NE</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================
      5. SPATIAL ANCHORING & TARGET LOCK
   ========================================== */
function TargetLockSimulator() {
  const [lockedTarget, setLockedTarget] = useState<string | null>('Summit Outpost C');
  const [recalibrationStatus, setRecalibrationStatus] = useState('SYSTEM ACTIVE');
  const [targetJitter, setTargetJitter] = useState(0.04);

  useEffect(() => {
    const interval = setInterval(() => {
      setTargetJitter(Number((0.02 + Math.random() * 0.05).toFixed(3)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="relative w-44 h-44 flex items-center justify-center bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden shadow-inner">
          <div className="absolute inset-0">
            {/* Grid background */}
            <div className="w-full h-full bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] opacity-80" />
          </div>

          {/* Locked targets on radar */}
          <div className="absolute top-10 left-10 w-2.5 h-2.5 rounded-full bg-primary/25" />
          <div className="absolute bottom-12 right-12 w-2.5 h-2.5 rounded-full bg-primary/25" />

          {/* Active target cursor */}
          <motion.div 
            animate={{ scale: [1, 1.08, 1], rotate: [0, 90, 180, 270, 360] }}
            transition={{ repeat: Infinity, duration: 8 }}
            className="w-16 h-16 border-2 border-dashed border-[#00E5FF] rounded-full flex items-center justify-center relative"
          >
            <div className="w-8 h-8 border border-white/20 rounded-full" />
            <div className="w-1.5 h-1.5 bg-[#00E5FF] rounded-full" />
            {/* Crosshair tips */}
            <div className="absolute top-0 w-0.5 h-2 bg-[#00E5FF]" />
            <div className="absolute bottom-0 w-0.5 h-2 bg-[#00E5FF]" />
            <div className="absolute left-0 w-2 h-0.5 bg-[#00E5FF]" />
            <div className="absolute right-0 w-2 h-0.5 bg-[#00E5FF]" />
          </motion.div>

          <span className="absolute bottom-2 font-mono text-[9px] text-[#00E5FF] font-bold tracking-widest uppercase">
            Spatial Anchor locked
          </span>
        </div>

        <div className="flex-1 space-y-4 w-full">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Configure Spatial Anchor Target</span>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Summit Outpost C',
                'Observation Pt B',
                'Dropzone Omega',
                'Helipad East'
              ].map((target) => (
                <button
                  key={target}
                  onClick={() => setLockedTarget(target)}
                  className={`py-2 px-3 rounded-xl text-left border text-xs font-bold transition-all flex items-center justify-between ${
                    lockedTarget === target 
                      ? 'bg-primary/5 border-primary text-primary' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{target}</span>
                  {lockedTarget === target && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-white border border-slate-200 p-3 rounded-xl">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Jitter Variance</span>
              <div className="text-sm font-bold text-mono text-slate-800">{targetJitter} m/s²</div>
            </div>
            <div className="bg-white border border-slate-200 p-3 rounded-xl">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Lock Durability</span>
              <div className="text-sm font-bold text-green-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span> High (IMU Locked)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================
      6. KINETIC ANALYSIS & ACCELERATION SPEEDOMETER
   ========================================== */
function KineticSimulator() {
  const [speed, setSpeed] = useState(4.8);
  const [activeProfile, setActiveProfile] = useState<'hike' | 'drive' | 'flight'>('hike');
  const [peakG, setPeakG] = useState(0.24);
  const [gradient, setGradient] = useState(12);

  const simulateRun = (profile: 'hike' | 'drive' | 'flight') => {
    setActiveProfile(profile);
    if (profile === 'hike') {
      setSpeed(1.2 + Math.random() * 3.5);
      setPeakG(0.12 + Math.random() * 0.15);
      setGradient(8 + Math.floor(Math.random() * 15));
    } else if (profile === 'drive') {
      setSpeed(18.5 + Math.random() * 30);
      setPeakG(0.85 + Math.random() * 0.45);
      setGradient(2 + Math.floor(Math.random() * 8));
    } else {
      setSpeed(145.2 + Math.random() * 220);
      setPeakG(2.45 + Math.random() * 1.5);
      setGradient(0);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Gauge dial */}
        <div className="relative w-40 h-40 flex items-center justify-center bg-slate-950 rounded-full border-[6px] border-slate-800 overflow-hidden shadow-inner">
          <svg className="absolute inset-0 w-full h-full p-4 transform -rotate-90" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="40" 
              fill="none" 
              stroke="rgba(255, 255, 255, 0.05)" 
              strokeWidth="6" 
            />
            {/* Glowing active gauge indicator filling up based on value */}
            <motion.circle 
              cx="50" 
              cy="50" 
              r="40" 
              fill="none" 
              stroke="#00E5FF" 
              strokeWidth="6" 
              strokeDasharray="251.2"
              strokeDashoffset={(251.2 * (100 - Math.min((speed / (activeProfile === 'flight' ? 400 : activeProfile === 'drive' ? 60 : 6)) * 100, 100))) / 100}
              transition={{ type: "spring", stiffness: 60 }}
            />
          </svg>

          {/* Central values overlay */}
          <div className="relative text-center text-white space-y-1">
            <div className="text-3xl font-mono font-bold leading-none">{speed.toFixed(1)}</div>
            <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-widest">
              {activeProfile === 'flight' ? 'knots / hr' : 'm / s'}
            </span>
          </div>
        </div>

        <div className="flex-1 w-full space-y-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Simulate Activity Terrain</span>
          
          <div className="grid grid-cols-3 gap-2">
            <button 
              onClick={() => simulateRun('hike')}
              className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                activeProfile === 'hike' 
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Mountain Hike
            </button>
            <button 
              onClick={() => simulateRun('drive')}
              className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                activeProfile === 'drive' 
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Jeep Off-Road
            </button>
            <button 
              onClick={() => simulateRun('flight')}
              className={`py-2 px-3 rounded-xl border text-xs font-bold text-center transition-all ${
                activeProfile === 'flight' 
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Rotary Flight
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-white border border-slate-200 p-3.5 rounded-xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Peak G-Force</span>
              <div className="text-base font-bold text-slate-800 font-mono">{peakG.toFixed(2)} G</div>
            </div>
            <div className="bg-white border border-slate-200 p-3.5 rounded-xl">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Grade Angle</span>
              <div className="text-base font-bold text-slate-800 font-mono">+{gradient}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ==========================================
      7. AEROSPACE SPECIFICATIONS TABLE
   ========================================== */
function HardwareSpecsPanel() {
  const specs = [
    { category: "GNSS Array", item: "Dual-Frequency GPS + GLONASS + GALILEO + BeiDou (L1+L5 configuration) with centimeter precision RTK backup options." },
    { category: "Inertial IMU", item: "Low-noise temperature-compensated tri-axial accelerometer & gyro sampling at 400Hz frequency." },
    { category: "Magnetometer", item: "Auto-calibrating geomagnetic flux sensor unaffected by local industrial iron anomalies." },
    { category: "Altimeter Sensor", item: "High-resolution piezoresistive barometric altimeter reading absolute changes down to 10cm." },
    { category: "Latencies", item: "AR OpenGL overlay rendering latency below < 3.2 milliseconds with predictive tracking." }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white rounded-2xl p-6 flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-primary tracking-widest bg-primary/20 px-2.5 py-1 rounded-md uppercase">Hardware standard</span>
          <h5 className="text-lg font-bold">Aerospace-Grade Rigorous Calibration</h5>
          <p className="text-xs text-slate-400">Manufactured and benchmarked for Android smartphones, tablets, and rugged surveying equipment.</p>
        </div>
      </div>

      <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-[10px] font-bold tracking-widest uppercase">
              <th className="px-5 py-3">Sensor Component</th>
              <th className="px-5 py-3">Engineering Specification Detail</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {specs.map((spec, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-5 py-4 font-bold text-slate-800 min-w-[120px]">{spec.category}</td>
                <td className="px-5 py-4 text-slate-600 leading-relaxed">{spec.item}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ==========================================
      8. INSTALL APP DOWNLOAD POPUP
   ========================================== */
interface DownloadAppPanelProps {
  onClose: () => void;
}

function DownloadAppPanel({ onClose }: DownloadAppPanelProps) {
  return (
    <div className="space-y-6 md:space-y-8 text-center max-w-sm mx-auto py-4">
      {/* Official Android Logo */}
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 md:w-20 md:h-20 text-[#3DDC84] mx-auto drop-shadow-sm">
        <path d="M17.6,9.48l1.84-3.18c0.16-0.31,0.04-0.69-0.26-0.85c-0.29-0.15-0.65-0.06-0.83,0.22l-1.88,3.24 c-2.86-1.21-6.08-1.21-8.94,0L5.65,5.67c-0.19-0.29-0.58-0.38-0.86-0.22C4.5,5.61,4.38,5.99,4.54,6.3L6.4,9.48 C3.3,11.25,1.28,14.44,1,18h22C22.72,14.44,20.7,11.25,17.6,9.48z M7,15.25c-0.69,0-1.25-0.56-1.25-1.25S6.31,12.75,7,12.75 s1.25,0.56,1.25,1.25S7.69,15.25,7,15.25z M17,15.25c-0.69,0-1.25-0.56-1.25-1.25s0.56-1.25,1.25-1.25s1.25,0.56,1.25,1.25 S17.69,15.25,17,15.25z"/>
      </svg>
      <div className="space-y-2 md:space-y-3">
        <h4 className="text-xl md:text-2xl font-bold text-slate-900">Get Compass for Android</h4>
        <p className="text-sm md:text-base text-slate-500 leading-relaxed">Deploy the precision-engineered space navigation instrumentation directly to your mobile device.</p>
      </div>

      <div className="space-y-4 pt-4 md:pt-6">
        <a 
          href="https://github.com/paramjitbaral/Compass-main/releases/download/v1.0.0/compass.apk"
          className="w-full py-4 bg-primary hover:bg-primary-container text-white rounded-xl text-base font-bold shadow-md hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-2"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M17.6,9.48l1.84-3.18c0.16-0.31,0.04-0.69-0.26-0.85c-0.29-0.15-0.65-0.06-0.83,0.22l-1.88,3.24 c-2.86-1.21-6.08-1.21-8.94,0L5.65,5.67c-0.19-0.29-0.58-0.38-0.86-0.22C4.5,5.61,4.38,5.99,4.54,6.3L6.4,9.48 C3.3,11.25,1.28,14.44,1,18h22C22.72,14.44,20.7,11.25,17.6,9.48z M7,15.25c-0.69,0-1.25-0.56-1.25-1.25S6.31,12.75,7,12.75 s1.25,0.56,1.25,1.25S7.69,15.25,7,15.25z M17,15.25c-0.69,0-1.25-0.56-1.25-1.25s0.56-1.25,1.25-1.25s1.25,0.56,1.25,1.25 S17.69,15.25,17,15.25z"/>
          </svg>
          Download APK
        </a>
        <p className="text-[11px] md:text-xs text-slate-400">Compatible with Android 11+ and ARCore-enabled devices.</p>
      </div>
    </div>
  );
}
