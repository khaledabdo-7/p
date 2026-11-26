import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Armchair, Utensils, Bed, Bath, RotateCcw, ArrowRight } from 'lucide-react';

const homeIntro = {
  title: 'My Home',
  text: 'I live in a nice apartment with my family. It is big, clean, and comfortable.',
  highlightTokens: [
    { text: 'I ', isVerb: false },
    { text: 'live', isVerb: true, note: "Present Simple base form with 'I'" },
    { text: ' in a nice apartment with my family. It ', isVerb: false },
    { text: 'is', isVerb: true, note: "Verb 'to be' (singular 'it is')" },
    { text: ' big, clean, and comfortable.', isVerb: false }
  ]
};

const roomsBanner = {
  title: 'The Rooms',
  text: 'My house has a living room, a kitchen, three bedrooms, and two bathrooms.',
  highlightTokens: [
    { text: 'My house ', isVerb: false },
    { text: 'has', isVerb: true, note: "3rd person singular of 'have' (it has)" },
    { text: ' a living room, a kitchen, three bedrooms, and two bathrooms.', isVerb: false }
  ]
};

const rooms = [
  {
    id: 'living',
    name: 'Living Room',
    icon: Armchair,
    accent: 'indigo',
    text: 'The living room has a big sofa, a table, and a large TV.',
    highlightTokens: [
      { text: 'The living room ', isVerb: false },
      { text: 'has', isVerb: true, note: "3rd person singular of 'have'" },
      { text: ' a big sofa, a table, and a large TV.', isVerb: false }
    ]
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    icon: Utensils,
    accent: 'amber',
    text: 'My mother cooks food and cleans the kitchen. My sister washes the dishes.',
    highlightTokens: [
      { text: 'My mother ', isVerb: false },
      { text: 'cooks', isVerb: true, note: '3rd person singular: cook + s' },
      { text: ' food and ', isVerb: false },
      { text: 'cleans', isVerb: true, note: '3rd person singular: clean + s' },
      { text: ' the kitchen. My sister ', isVerb: false },
      { text: 'washes', isVerb: true, note: '3rd person singular: wash + es' },
      { text: ' the dishes.', isVerb: false }
    ]
  },
  {
    id: 'bedroom',
    name: 'My Bedroom',
    icon: Bed,
    accent: 'emerald',
    text: 'My bedroom has a bed, a desk, and a computer. I clean my room and take out the trash.',
    highlightTokens: [
      { text: 'My bedroom ', isVerb: false },
      { text: 'has', isVerb: true, note: "3rd person singular of 'have'" },
      { text: ' a bed, a desk, and a computer. I ', isVerb: false },
      { text: 'clean', isVerb: true, note: "Base form with 'I'" },
      { text: ' my room and ', isVerb: false },
      { text: 'take out', isVerb: true, note: "Phrasal verb with 'I'" },
      { text: ' the trash.', isVerb: false }
    ]
  },
  {
    id: 'other',
    name: '2 Bathrooms',
    icon: Bath,
    accent: 'blue',
    text: 'My house has a living room, a kitchen, three bedrooms, and two bathrooms.',
    highlightTokens: [
      { text: 'My house ', isVerb: false },
      { text: 'has', isVerb: true, note: "3rd person singular of 'have'" },
      { text: ' a living room, a kitchen, three bedrooms, and two bathrooms.', isVerb: false }
    ]
  }
];

function renderTokens(tokens, plainText, highlightVerbs) {
  if (!highlightVerbs) return plainText;
  return tokens.map((token, i) =>
    token.isVerb ? (
      <span
        key={i}
        title={token.note || 'Present Simple verb'}
        className="font-bold text-amber-300 underline decoration-amber-400/70 underline-offset-4 bg-amber-400/10 px-1 py-0.5 rounded cursor-help"
      >
        {token.text}
      </span>
    ) : (
      <span key={i}>{token.text}</span>
    )
  );
}

export default function HouseSplitCards({ highlightVerbs = true }) {
  const [isDivided, setIsDivided] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId) || null;

  const handleReset = () => {
    setIsDivided(false);
    setSelectedRoomId(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {/* The Rooms Sentence (Appears above the square once divided) */}
      <AnimatePresence>
        {isDivided && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-indigo-500/30 backdrop-blur-md flex items-center justify-between gap-4"
          >
            <div>
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                {roomsBanner.title}
              </span>
              <p className="text-slate-100 text-sm sm:text-base font-medium leading-relaxed">
                {renderTokens(roomsBanner.highlightTokens, roomsBanner.text, highlightVerbs)}
              </p>
            </div>
            <button
              onClick={handleReset}
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-300 transition-colors"
              title="Back to My Home"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* THE SQUARE APARTMENT CARD */}
      <div
        onClick={() => {
          if (!isDivided) setIsDivided(true);
        }}
        className={`relative w-full aspect-square max-w-[500px] mx-auto rounded-3xl bg-slate-900/85 border-2 backdrop-blur-md overflow-hidden shadow-2xl transition-colors duration-300 ${
          !isDivided
            ? 'cursor-pointer border-indigo-500/40 hover:border-indigo-400/80'
            : 'border-slate-700/80'
        }`}
      >
        {!isDivided ? (
          /* STATE 1: SINGLE SQUARE HOME CARD */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full p-8 sm:p-10 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-950/80 border border-indigo-700/50 flex items-center justify-center text-indigo-300">
                  <Home className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono text-indigo-400 font-semibold block">
                    MY HOME
                  </span>
                  <h3 className="text-2xl font-extrabold text-white font-['Outfit']">
                    {homeIntro.title}
                  </h3>
                </div>
              </div>
            </div>

            <p className="text-slate-100 text-xl sm:text-2xl leading-relaxed font-medium text-center px-2">
              {renderTokens(homeIntro.highlightTokens, homeIntro.text, highlightVerbs)}
            </p>

            <div className="flex items-center justify-center">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                <span>Click to divide into rooms</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.div>
        ) : (
          /* STATE 2: DIVIDED SQUARE WITH ANIMATED FLOOR PLAN LINES */
          <div className="relative w-full h-full">
            {/* Animated SVG Dividing Lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Main Vertical Wall (x = 46) */}
              <motion.line
                x1="46"
                y1="0"
                x2="46"
                y2="100"
                stroke="#6366f1"
                strokeWidth="0.8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
              {/* Left Horizontal Wall (y = 45, from 0 to 46) */}
              <motion.line
                x1="0"
                y1="45"
                x2="46"
                y2="45"
                stroke="#6366f1"
                strokeWidth="0.8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.2, ease: 'easeInOut' }}
              />
              {/* Right Horizontal Wall (y = 62, from 46 to 100) */}
              <motion.line
                x1="46"
                y1="62"
                x2="100"
                y2="62"
                stroke="#6366f1"
                strokeWidth="0.8"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.3, ease: 'easeInOut' }}
              />
            </svg>

            {/* Interactive Room Zones Inside the Divided Square */}
            {/* 1. Kitchen (Top-Left: 0-46% width, 0-45% height) */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              onClick={() => setSelectedRoomId(selectedRoomId === 'kitchen' ? null : 'kitchen')}
              style={{ top: 0, left: 0, width: '46%', height: '45%' }}
              className={`absolute p-4 flex flex-col items-center justify-center text-center transition-colors ${
                selectedRoomId === 'kitchen'
                  ? 'bg-amber-500/20 text-amber-200'
                  : 'hover:bg-slate-800/60 text-slate-200'
              }`}
            >
              <Utensils className={`w-6 h-6 mb-2 ${selectedRoomId === 'kitchen' ? 'text-amber-400' : 'text-slate-400'}`} />
              <span className="text-sm sm:text-base font-bold font-['Outfit']">Kitchen</span>
              <span className="text-[10px] font-mono text-slate-400 mt-1">Click to read</span>
            </motion.button>

            {/* 2. My Bedroom (Bottom-Left: 0-46% width, 45-100% height) */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              onClick={() => setSelectedRoomId(selectedRoomId === 'bedroom' ? null : 'bedroom')}
              style={{ top: '45%', left: 0, width: '46%', height: '55%' }}
              className={`absolute p-4 flex flex-col items-center justify-center text-center transition-colors ${
                selectedRoomId === 'bedroom'
                  ? 'bg-emerald-500/20 text-emerald-200'
                  : 'hover:bg-slate-800/60 text-slate-200'
              }`}
            >
              <Bed className={`w-6 h-6 mb-2 ${selectedRoomId === 'bedroom' ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span className="text-sm sm:text-base font-bold font-['Outfit']">My Bedroom</span>
              <span className="text-[10px] font-mono text-slate-400 mt-1">Click to read</span>
            </motion.button>

            {/* 3. Living Room (Top-Right: 46-100% width, 0-62% height) */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => setSelectedRoomId(selectedRoomId === 'living' ? null : 'living')}
              style={{ top: 0, left: '46%', width: '54%', height: '62%' }}
              className={`absolute p-4 flex flex-col items-center justify-center text-center transition-colors ${
                selectedRoomId === 'living'
                  ? 'bg-indigo-500/20 text-indigo-200'
                  : 'hover:bg-slate-800/60 text-slate-200'
              }`}
            >
              <Armchair className={`w-7 h-7 mb-2 ${selectedRoomId === 'living' ? 'text-indigo-400' : 'text-slate-400'}`} />
              <span className="text-base sm:text-lg font-bold font-['Outfit']">Living Room</span>
              <span className="text-[10px] font-mono text-slate-400 mt-1">Click to read</span>
            </motion.button>

            {/* 4. Other Bedrooms & 2 Bathrooms (Bottom-Right: 46-100% width, 62-100% height) */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => setSelectedRoomId(selectedRoomId === 'other' ? null : 'other')}
              style={{ top: '62%', left: '46%', width: '54%', height: '38%' }}
              className={`absolute p-3 flex flex-col items-center justify-center text-center transition-colors ${
                selectedRoomId === 'other'
                  ? 'bg-blue-500/20 text-blue-200'
                  : 'hover:bg-slate-800/60 text-slate-200'
              }`}
            >
              <Bath className={`w-5 h-5 mb-1.5 ${selectedRoomId === 'other' ? 'text-blue-400' : 'text-slate-400'}`} />
              <span className="text-xs sm:text-sm font-bold font-['Outfit']">2 Bathrooms</span>
              <span className="text-[10px] font-mono text-slate-400 mt-0.5">Click to read</span>
            </motion.button>
          </div>
        )}
      </div>

      {/* Revealed Sentence Panel when a room inside the square is clicked */}
      <AnimatePresence mode="wait">
        {isDivided && selectedRoom && (
          <motion.div
            key={selectedRoom.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="p-6 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <selectedRoom.icon className="w-5 h-5 text-indigo-400" />
              <h4 className="text-lg font-bold text-white font-['Outfit']">
                {selectedRoom.name}
              </h4>
            </div>
            <p className="text-slate-100 text-base sm:text-lg leading-relaxed">
              {renderTokens(selectedRoom.highlightTokens, selectedRoom.text, highlightVerbs)}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
