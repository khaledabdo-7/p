import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, 
  Laptop, 
  Gamepad2, 
  Users, 
  Moon, 
  Copy, 
  Check 
} from 'lucide-react';

// 24-Hour Routine Schedule matching Khaled's exact content and hours
const scheduleRanges = [
  {
    startMin: 420,  // Exactly 07:00 AM
    endMin: 660,    // Exactly 11:00 AM
    title: "Daily Activities • Morning Routine",
    text: "I wake up early every day and eat healthy food.",
    icon: Sun,
    color: "amber",
    tag: "Morning (07:00 AM - 11:00 AM)",
    highlightTokens: [
      { text: "I ", isVerb: false },
      { text: "wake up", isVerb: true, note: "Present Simple habit with 'I'" },
      { text: " early every day and ", isVerb: false },
      { text: "eat", isVerb: true, note: "Base form with 'I'" },
      { text: " healthy food.", isVerb: false }
    ],
    keywords: ["wake up early", "healthy food", "every day"]
  },
  {
    startMin: 660,  // Exactly 11:00 AM
    endMin: 1020,   // Exactly 05:00 PM
    title: "Daily Activities • Study & Work",
    text: "I study English and work on my computer.",
    icon: Laptop,
    color: "indigo",
    tag: "Productive Hours (11:00 AM - 05:00 PM)",
    highlightTokens: [
      { text: "I ", isVerb: false },
      { text: "study", isVerb: true, note: "Base form with 'I'" },
      { text: " English and ", isVerb: false },
      { text: "work", isVerb: true, note: "Base form with 'I'" },
      { text: " on my computer.", isVerb: false }
    ],
    keywords: ["study English", "work on computer"]
  },
  {
    startMin: 1020, // Exactly 05:00 PM
    endMin: 1200,   // Exactly 08:00 PM
    title: "Free Time Alone",
    text: "In my free time alone, I play video games, watch movies, and listen to music.",
    icon: Gamepad2,
    color: "violet",
    tag: "Solo Recreation (05:00 PM - 08:00 PM)",
    highlightTokens: [
      { text: "In my free time alone, I ", isVerb: false },
      { text: "play", isVerb: true, note: "Base form with 'I'" },
      { text: " video games, ", isVerb: false },
      { text: "watch", isVerb: true, note: "Base form with 'I'" },
      { text: " movies, and ", isVerb: false },
      { text: "listen", isVerb: true, note: "Base form with 'I'" },
      { text: " to music.", isVerb: false }
    ],
    keywords: ["video games", "watch movies", "listen to music"]
  },
  {
    startMin: 1200, // Exactly 08:00 PM
    endMin: 1440,   // 12:00 AM midnight
    title: "With My Friends",
    text: "With my friends, I play basketball. We also go to the mall, drink coffee, and talk together.",
    icon: Users,
    color: "emerald",
    tag: "Evening Routine (08:00 PM - 12:00 AM)",
    highlightTokens: [
      { text: "With my friends, I ", isVerb: false },
      { text: "play", isVerb: true, note: "Base form with 'I'" },
      { text: " basketball. We also ", isVerb: false },
      { text: "go", isVerb: true, note: "Base form with 'We'" },
      { text: " to the mall, ", isVerb: false },
      { text: "drink", isVerb: true, note: "Base form with 'We'" },
      { text: " coffee, and ", isVerb: false },
      { text: "talk", isVerb: true, note: "Base form with 'We'" },
      { text: " together.", isVerb: false }
    ],
    keywords: ["play basketball", "go to mall", "drink coffee", "talk together"]
  },
  {
    startMin: 0,    // 12:00 AM
    endMin: 420,    // Exactly 07:00 AM
    title: "Night Rest & Sleep",
    text: "I sleep early so I can wake up fresh and energetic every morning.",
    icon: Moon,
    color: "blue",
    tag: "Night Rest (12:00 AM - 07:00 AM)",
    highlightTokens: [
      { text: "I ", isVerb: false },
      { text: "sleep", isVerb: true, note: "Base form with 'I'" },
      { text: " early so I can ", isVerb: false },
      { text: "wake up", isVerb: true, note: "Phrasal verb" },
      { text: " fresh and energetic every morning.", isVerb: false }
    ],
    keywords: ["sleep early", "wake up fresh", "night rest"]
  }
];

export default function AnalogRoutineClock({ highlightVerbs = true }) {
  // Total minutes from 0 to 1439 (Starts at 07:00 AM = 420 minutes)
  const [totalMinutes, setTotalMinutes] = useState(420);
  const [activeDragTarget, setActiveDragTarget] = useState(null); // 'hour' | 'minute' | null
  const [copied, setCopied] = useState(false);

  const clockRef = useRef(null);
  const prevAngleRef = useRef(null);

  // Time calculations
  const hours24 = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  const isPM = hours24 >= 12;
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;

  // Angles for clock hands (360 degrees)
  const minuteAngle = minutes * 6; // 360 / 60 = 6 deg/min
  const hourAngle = (hours24 % 12) * 30 + (minutes / 60) * 30; // 30 deg/hour

  // Format 12-hour string (e.g. 07:00 AM)
  const formattedTime = `${String(hours12).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${isPM ? 'PM' : 'AM'}`;

  // Find active card for this minute
  const activeCard = scheduleRanges.find((r) => totalMinutes >= r.startMin && totalMinutes < r.endMin) || scheduleRanges[0];

  // Toggle AM / PM explicitly
  const toggleAmPm = () => {
    setTotalMinutes((prev) => {
      if (prev >= 720) {
        return prev - 720; // PM -> AM
      } else {
        return prev + 720; // AM -> PM
      }
    });
  };

  // Preset jump handler
  const jumpToTime = (targetMins) => {
    setTotalMinutes(targetMins);
  };

  // Convert client coordinate to angle relative to clock center (0 deg at top 12 o'clock, clockwise)
  const getAngleFromEvent = (e) => {
    if (!clockRef.current) return 0;
    const rect = clockRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const clientX = e.clientX !== undefined ? e.clientX : e.touches?.[0]?.clientX;
    const clientY = e.clientY !== undefined ? e.clientY : e.touches?.[0]?.clientY;
    if (clientX === undefined || clientY === undefined) return null;

    const dx = clientX - centerX;
    const dy = clientY - centerY;

    let deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (deg < 0) deg += 360;
    return { deg, dist: Math.sqrt(dx * dx + dy * dy) };
  };

  // Pointer down: decide if dragging minute hand, hour hand, or clock dial
  const handlePointerDown = (e) => {
    const info = getAngleFromEvent(e);
    if (!info) return;

    // Radius of clock face is ~130px.
    // Inner area (< 65px) or near hour angle -> hour hand
    // Outer area (> 65px) -> minute hand
    let target = 'minute';
    if (info.dist < 75) {
      target = 'hour';
    } else {
      // Check proximity to hour angle vs minute angle
      const diffHour = Math.min(Math.abs(info.deg - hourAngle), 360 - Math.abs(info.deg - hourAngle));
      const diffMin = Math.min(Math.abs(info.deg - minuteAngle), 360 - Math.abs(info.deg - minuteAngle));
      target = diffHour < diffMin && diffHour < 35 ? 'hour' : 'minute';
    }

    setActiveDragTarget(target);
    prevAngleRef.current = info.deg;
  };

  // Pointer move: update time with full 24-hour rollover
  const handlePointerMove = (e) => {
    if (!activeDragTarget) return;
    const info = getAngleFromEvent(e);
    if (!info || prevAngleRef.current === null) return;

    let delta = info.deg - prevAngleRef.current;
    // Handle wrap around 0 / 360 boundary
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    prevAngleRef.current = info.deg;

    if (activeDragTarget === 'minute') {
      // 1 full revolution of minute hand (360 deg) = 60 minutes = 1 hour
      // 6 deg = 1 minute
      const deltaMins = Math.round(delta / 6);
      if (deltaMins !== 0) {
        setTotalMinutes((prev) => {
          let updated = (prev + deltaMins) % 1440;
          if (updated < 0) updated += 1440;
          return updated;
        });
      }
    } else if (activeDragTarget === 'hour') {
      // 1 full revolution of hour hand (360 deg) = 12 hours = 720 minutes
      // 30 deg = 60 minutes -> 1 deg = 2 minutes
      const deltaMins = Math.round(delta * 2);
      if (deltaMins !== 0) {
        setTotalMinutes((prev) => {
          let updated = (prev + deltaMins) % 1440;
          if (updated < 0) updated += 1440;
          return updated;
        });
      }
    }
  };

  const handlePointerUp = () => {
    setActiveDragTarget(null);
    prevAngleRef.current = null;
  };

  // Global pointer up listener
  useEffect(() => {
    const handleGlobalUp = () => {
      setActiveDragTarget(null);
      prevAngleRef.current = null;
    };
    window.addEventListener('pointerup', handleGlobalUp);
    return () => window.removeEventListener('pointerup', handleGlobalUp);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${activeCard.title}: ${activeCard.text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const Icon = activeCard.icon;

  const colorStyles = {
    amber: {
      border: 'border-amber-500/40',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      accent: 'text-amber-400'
    },
    indigo: {
      border: 'border-indigo-500/40',
      badge: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      accent: 'text-indigo-400'
    },
    violet: {
      border: 'border-purple-500/40',
      badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      accent: 'text-purple-400'
    },
    emerald: {
      border: 'border-emerald-500/40',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      accent: 'text-emerald-400'
    },
    blue: {
      border: 'border-blue-500/40',
      badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      accent: 'text-blue-400'
    }
  }[activeCard.color];

  // 1 to 12 dial numbers - Completely clean and uniform (no custom colors on 7, 11, etc.)
  const clockNumbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  return (
    <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-slate-900/85 border border-slate-800 backdrop-blur-xl relative overflow-hidden shadow-2xl">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 mb-2 font-mono">
            <span>24H Interactive Analog Clock</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-['Outfit']">
            Move The Hands Across Day & Night
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Drag the <strong className="text-amber-300 font-semibold">Hour Hand</strong> or <strong className="text-indigo-300 font-semibold">Minute Hand</strong>. Completing a full turn switches between AM and PM.
          </p>
        </div>

        {/* Quick Time Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => jumpToTime(420)} // 07:00 AM
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              totalMinutes >= 420 && totalMinutes < 660
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30 font-bold'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
            }`}
          >
            07:00 AM Wake Up
          </button>

          <button
            onClick={() => jumpToTime(660)} // 11:00 AM
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              totalMinutes >= 660 && totalMinutes < 1020
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/30 font-bold'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
            }`}
          >
            11:00 AM Study
          </button>

          <button
            onClick={() => jumpToTime(1020)} // 05:00 PM
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              totalMinutes >= 1020 && totalMinutes < 1200
                ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/30 font-bold'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
            }`}
          >
            05:00 PM Alone
          </button>

          <button
            onClick={() => jumpToTime(1200)} // 08:00 PM
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              totalMinutes >= 1200 && totalMinutes < 1440
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-600/30 font-bold'
                : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
            }`}
          >
            08:00 PM Friends
          </button>
        </div>
      </div>

      {/* Clock + Active Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Premium Realistic Analog Clock (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          
          <div 
            ref={clockRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full cursor-grab active:cursor-grabbing select-none touch-none p-3 bg-gradient-to-br from-slate-900 via-[#0a0f1d] to-[#040711] border-[6px] border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.1)] flex items-center justify-center group"
          >
            {/* Outer minute track with 60 precision marks */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 300">
              {Array.from({ length: 60 }).map((_, i) => {
                const isFiveMin = i % 5 === 0;
                return (
                  <line
                    key={i}
                    x1="150"
                    y1={isFiveMin ? "18" : "22"}
                    x2="150"
                    y2="28"
                    stroke={isFiveMin ? "#94a3b8" : "#334155"}
                    strokeWidth={isFiveMin ? "2" : "1"}
                    transform={`rotate(${i * 6} 150 150)`}
                  />
                );
              })}
            </svg>

            {/* Clean, Uniform Numbers 1 to 12 (No irregular colors) */}
            {clockNumbers.map((num) => {
              const angle = num * 30;
              const rad = (angle - 90) * (Math.PI / 180);
              const radius = 112; // Radius from center
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;

              return (
                <div
                  key={num}
                  style={{
                    position: 'absolute',
                    transform: `translate(${x}px, ${y}px)`
                  }}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold font-mono text-slate-300 pointer-events-none"
                >
                  {num}
                </div>
              );
            })}

            {/* Clean AM / PM Subdial Aperture in Center */}
            <div 
              onClick={toggleAmPm}
              title="Click to toggle AM / PM"
              className="absolute top-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 border border-slate-700/80 cursor-pointer hover:border-indigo-400 transition-colors z-10 shadow-inner"
            >
              {isPM ? (
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span className={`text-xs font-mono font-extrabold tracking-wider ${isPM ? 'text-indigo-300' : 'text-amber-300'}`}>
                {isPM ? 'PM' : 'AM'}
              </span>
            </div>

            {/* Hands Layer via SVG */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              viewBox="0 0 300 300"
            >
              <defs>
                <filter id="handShadow" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.7" />
                </filter>
              </defs>

              {/* Hour Hand (Thicker, Gold/Amber Accent, Points to Hour) */}
              <g 
                transform={`rotate(${hourAngle} 150 150)`}
                filter="url(#handShadow)"
              >
                {/* Hand line */}
                <line
                  x1="150"
                  y1="165"
                  x2="150"
                  y2="82"
                  stroke="#fbbf24"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                {/* Pointer tip */}
                <polygon points="146,85 154,85 150,70" fill="#fbbf24" />
                {/* Inner accent stripe */}
                <line
                  x1="150"
                  y1="155"
                  x2="150"
                  y2="90"
                  stroke="#1e293b"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </g>

              {/* Minute Hand (Longer, Sleek Silver/White, Points to Minutes) */}
              <g 
                transform={`rotate(${minuteAngle} 150 150)`}
                filter="url(#handShadow)"
              >
                {/* Counterbalance tail */}
                <line
                  x1="150"
                  y1="175"
                  x2="150"
                  y2="150"
                  stroke="#94a3b8"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                {/* Main hand */}
                <line
                  x1="150"
                  y1="150"
                  x2="150"
                  y2="42"
                  stroke="#f1f5f9"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                {/* Pointer tip */}
                <polygon points="147,45 153,45 150,30" fill="#f1f5f9" />
              </g>

              {/* Center Pivot Metallic Pin */}
              <circle cx="150" cy="150" r="10" fill="#fbbf24" />
              <circle cx="150" cy="150" r="6" fill="#0f172a" />
              <circle cx="150" cy="150" r="2.5" fill="#f1f5f9" />
            </svg>

            {/* Bottom hint label */}
            <div className="absolute bottom-16 text-[10px] font-mono text-slate-500 uppercase tracking-widest pointer-events-none">
              Drag Either Hand
            </div>
          </div>

          {/* Live digital readout below analog clock */}
          <div className="mt-5 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-2xl bg-slate-950 border border-slate-800 shadow-md">
              <span className={`w-2.5 h-2.5 rounded-full ${isPM ? 'bg-indigo-400' : 'bg-amber-400'} animate-pulse`} />
              <span className="text-xl font-extrabold text-white font-mono tracking-wider">
                {formattedTime}
              </span>
              <button
                onClick={toggleAmPm}
                className="ml-1 text-[11px] px-2 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono transition-colors"
                title="Switch AM / PM"
              >
                Toggle {isPM ? 'AM' : 'PM'}
              </button>
            </div>
            <span className="text-xs text-slate-400 mt-1.5 font-medium">
              Turn hands past 12 to flip between Day & Night
            </span>
          </div>

        </div>

        {/* Right Column: Active Routine Card Matching the Current Time (7 cols) */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCard.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className={`p-6 sm:p-7 rounded-2xl bg-slate-950/75 border ${colorStyles.border} shadow-2xl flex flex-col justify-between`}
            >
              <div>
                {/* Card Top: Time Tag, Icon & Copy */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white shadow-md">
                      <Icon className={`w-6 h-6 ${colorStyles.accent}`} />
                    </div>
                    <div>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colorStyles.badge} font-mono mb-1`}>
                        {activeCard.tag}
                      </span>
                      <h4 className="text-lg sm:text-xl font-bold text-white font-['Outfit']">
                        {activeCard.title}
                      </h4>
                    </div>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={handleCopy}
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white transition-colors"
                    title="Copy this sentence"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Sentence with Present Simple Highlights */}
                <div className="py-3">
                  <p className="text-slate-100 text-base sm:text-lg leading-relaxed font-normal">
                    {highlightVerbs ? (
                      activeCard.highlightTokens.map((token, i) => (
                        token.isVerb ? (
                          <span 
                            key={i}
                            title={token.note || "Present Simple verb"}
                            className="font-bold text-amber-300 underline decoration-amber-400/80 underline-offset-8 bg-amber-400/10 px-1.5 py-0.5 rounded cursor-help"
                          >
                            {token.text}
                          </span>
                        ) : (
                          <span key={i}>{token.text}</span>
                        )
                      ))
                    ) : (
                      activeCard.text
                    )}
                  </p>
                </div>
              </div>

              {/* Keywords at bottom */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap gap-2">
                {activeCard.keywords.map((kw, i) => (
                  <span 
                    key={i} 
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/60 font-mono"
                  >
                    {kw}
                  </span>
                ))}
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
