import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartHandshake, Clock, Shirt, X, RotateCcw, Sparkles } from 'lucide-react';

const gatheringPhotos = [
  {
    id: 'g1',
    src: './images/gathering/g1.jpg',
    caption: 'Eating Together',
    rotate: -11,
    yOffset: 10
  },
  {
    id: 'g2',
    src: './images/gathering/g2.jpg',
    caption: 'Family House',
    rotate: -4,
    yOffset: -6
  },
  {
    id: 'g3',
    src: './images/gathering/g3.jpg',
    caption: 'Talking & Games',
    rotate: 2,
    yOffset: 6
  },
  {
    id: 'g4',
    src: './images/gathering/g4.jpg',
    caption: 'Fun Moments',
    rotate: 7,
    yOffset: -4
  },
  {
    id: 'g5',
    src: './images/gathering/g5.jpg',
    caption: 'Friday Night',
    rotate: 13,
    yOffset: 12
  }
];

const outfitPieces = [
  {
    id: 'tshirt',
    src: './images/outfit/tshirt.png',
    label: 'Soft T-Shirt',
    floatDelay: 0,
    floatDuration: 3.4
  },
  {
    id: 'pants',
    src: './images/outfit/pants.png',
    label: 'Comfortable Sweatpants',
    floatDelay: 0.6,
    floatDuration: 3.9
  },
  {
    id: 'slippers',
    src: './images/outfit/slippers.png',
    label: 'Slippers',
    floatDelay: 1.1,
    floatDuration: 3.1
  }
];

export default function EventSection({ highlightVerbs = true }) {
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [hoveredOutfit, setHoveredOutfit] = useState(null);
  const [isAssembled, setIsAssembled] = useState(false);
  const [dragKey, setDragKey] = useState(0);
  const stageRef = useRef(null);

  const handleToggleAssemble = () => {
    setIsAssembled((prev) => !prev);
    setDragKey((k) => k + 1);
  };

  return (
    <div className="space-y-10">
      {/* PART 1: THE EVENT + TIME & PLACE + POLAROID PHOTO STACK */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-amber-500/25 backdrop-blur-xl relative overflow-hidden shadow-2xl">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/10 blur-[110px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-indigo-500/10 blur-[110px] rounded-full pointer-events-none" />

        {/* Two Cards: The Event & Time/Place */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10 relative z-10">
          {/* Card 1: The Event */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-slate-800/90">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-700/50 flex items-center justify-center text-amber-300">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-['Outfit']">The Event</h3>
            </div>
            <p className="text-slate-200 text-base leading-relaxed">
              {highlightVerbs ? (
                <>
                  I usually{' '}
                  <span className="font-bold text-amber-300 underline decoration-amber-400/70 underline-offset-4 bg-amber-400/10 px-1 py-0.5 rounded">
                    attend
                  </span>{' '}
                  our weekly family gathering. Everyone{' '}
                  <span className="font-bold text-amber-300 underline decoration-amber-400/70 underline-offset-4 bg-amber-400/10 px-1 py-0.5 rounded">
                    meets
                  </span>
                  ,{' '}
                  <span className="font-bold text-amber-300 underline decoration-amber-400/70 underline-offset-4 bg-amber-400/10 px-1 py-0.5 rounded">
                    eats
                  </span>{' '}
                  together, and{' '}
                  <span className="font-bold text-amber-300 underline decoration-amber-400/70 underline-offset-4 bg-amber-400/10 px-1 py-0.5 rounded">
                    talks
                  </span>
                  .
                </>
              ) : (
                'I usually attend our weekly family gathering. Everyone meets, eats together, and talks.'
              )}
            </p>
          </div>

          {/* Card 2: Time & Place */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/70 border border-slate-800/90">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-700/50 flex items-center justify-center text-amber-300">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white font-['Outfit']">Time & Place</h3>
            </div>
            <p className="text-slate-200 text-base leading-relaxed">
              {highlightVerbs ? (
                <>
                  It{' '}
                  <span className="font-bold text-amber-300 underline decoration-amber-400/70 underline-offset-4 bg-amber-400/10 px-1 py-0.5 rounded">
                    happens
                  </span>{' '}
                  every Friday at 3:00 PM. We{' '}
                  <span className="font-bold text-amber-300 underline decoration-amber-400/70 underline-offset-4 bg-amber-400/10 px-1 py-0.5 rounded">
                    meet
                  </span>{' '}
                  at our family house.
                </>
              ) : (
                'It happens every Friday at 3:00 PM. We meet at our family house.'
              )}
            </p>
          </div>
        </div>

        {/* Fanned Polaroid Photo Stack (Dark Theme matching site colors) */}
        <div className="relative z-10 pt-2 pb-4">
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-3 sm:gap-0 sm:-space-x-6 py-4">
            {gatheringPhotos.map((photo, idx) => (
              <motion.button
                key={photo.id}
                onClick={() => setLightboxPhoto(photo)}
                initial={{ opacity: 0, y: 20, rotate: photo.rotate }}
                whileInView={{ opacity: 1, y: photo.yOffset, rotate: photo.rotate }}
                viewport={{ once: true }}
                whileHover={{
                  rotate: 0,
                  y: -14,
                  scale: 1.08,
                  zIndex: 40,
                  transition: { type: 'spring', stiffness: 300, damping: 20 }
                }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                style={{ zIndex: 10 + idx }}
                className="relative group w-40 sm:w-44 md:w-48 p-2.5 pb-7 rounded-xl bg-[#111827] border border-slate-700/80 hover:border-amber-400/60 shadow-[0_18px_35px_rgba(0,0,0,0.65)] hover:shadow-[0_22px_45px_rgba(245,158,11,0.2)] text-center cursor-pointer transition-colors"
              >
                <div className="w-full aspect-[4/4.3] rounded-lg overflow-hidden bg-slate-950 border border-slate-800">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="absolute bottom-2 left-0 right-0 text-[11px] font-mono font-semibold text-slate-300 group-hover:text-amber-300 transition-colors">
                  {photo.caption}
                </span>
              </motion.button>
            ))}
          </div>
          <p className="text-center text-[11px] font-mono text-slate-500 mt-2">
            Hover or click any photo to enlarge
          </p>
        </div>
      </div>

      {/* PART 2: 3 DRAGGABLE FLOATING OUTFIT PIECES (LEFT / CENTER / RIGHT) + WHAT I WEAR */}
      <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl relative overflow-hidden shadow-2xl">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

        {/* Stage Controls Header */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className="text-xs font-mono text-slate-400">
            🖱️ Drag each piece with your mouse to stack the outfit together!
          </span>
          <button
            onClick={handleToggleAssemble}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            {isAssembled ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>Scatter Pieces</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Auto Stack</span>
              </>
            )}
          </button>
        </div>

        {/* Interactive Drag Stage */}
        <div
          ref={stageRef}
          className="relative h-[420px] sm:h-[460px] w-full max-w-4xl mx-auto rounded-2xl bg-slate-950/40 border border-dashed border-slate-800/80 flex items-center justify-center mb-6 z-10 overflow-hidden"
        >
          {outfitPieces.map((item) => {
            const isHovered = hoveredOutfit === item.id;

            // Scattered positions: Pants Left, T-Shirt Center, Slippers Right
            const scatteredPos = {
              pants: { x: -210, y: 0, rotate: -5 },
              tshirt: { x: 0, y: -20, rotate: 0 },
              slippers: { x: 210, y: 20, rotate: 5 }
            }[item.id];

            // Assembled vertical outfit stack: T-Shirt top, Pants middle, Slippers bottom
            const assembledPos = {
              tshirt: { x: 0, y: -125, rotate: 0 },
              pants: { x: 0, y: 35, rotate: 0 },
              slippers: { x: 0, y: 170, rotate: 0 }
            }[item.id];

            const targetPos = isAssembled ? assembledPos : scatteredPos;
            const imgHeight =
              item.id === 'slippers'
                ? 'h-14 sm:h-16'
                : item.id === 'pants'
                  ? 'h-40 sm:h-48'
                  : 'h-32 sm:h-36';

            return (
              <motion.div
                key={`${item.id}-${dragKey}`}
                drag
                dragConstraints={stageRef}
                dragElastic={0.12}
                dragMomentum={false}
                initial={{ x: targetPos.x, y: targetPos.y, rotate: targetPos.rotate }}
                animate={{ x: targetPos.x, y: targetPos.y, rotate: targetPos.rotate }}
                whileHover={{ scale: 1.08, zIndex: 40 }}
                whileDrag={{ scale: 1.12, zIndex: 50, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                onMouseEnter={() => setHoveredOutfit(item.id)}
                onMouseLeave={() => setHoveredOutfit(null)}
                className="absolute cursor-grab active:cursor-grabbing select-none flex flex-col items-center"
                style={{ zIndex: item.id === 'tshirt' ? 30 : item.id === 'pants' ? 20 : 25 }}
              >
                {/* Continuous gentle floating bob */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: item.floatDuration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: item.floatDelay
                  }}
                  className="flex flex-col items-center pointer-events-none"
                >
                  <div className={`${imgHeight} flex items-center justify-center`}>
                    <img
                      src={item.src}
                      alt={item.label}
                      draggable={false}
                      className={`max-h-full w-auto object-contain transition-all duration-300 ${
                        isHovered
                          ? 'drop-shadow-[0_18px_28px_rgba(245,158,11,0.4)]'
                          : 'drop-shadow-[0_14px_20px_rgba(0,0,0,0.75)]'
                      }`}
                    />
                  </div>
                  <span
                    className={`mt-1.5 text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border whitespace-nowrap transition-all ${
                      isHovered
                        ? 'bg-amber-500/20 border-amber-400/60 text-amber-300'
                        : 'bg-slate-950/85 border-slate-800 text-slate-400'
                    }`}
                  >
                    {item.label}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* BOTTOM: What I Wear Sentence Centered */}
        <div className="relative z-10 max-w-2xl mx-auto text-center pt-4 space-y-4">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-amber-950/70 border border-amber-700/40 text-amber-300 text-xs font-mono font-semibold">
            <Shirt className="w-4 h-4" />
            <span>What I Wear</span>
          </div>

          <p className="text-slate-100 text-lg sm:text-xl md:text-2xl leading-relaxed font-medium">
            {highlightVerbs ? (
              <>
                I{' '}
                <span className="font-bold text-amber-300 underline decoration-amber-400/70 underline-offset-4 bg-amber-400/10 px-1 py-0.5 rounded">
                  wear
                </span>{' '}
                comfortable home clothes. I{' '}
                <span className="font-bold text-amber-300 underline decoration-amber-400/70 underline-offset-4 bg-amber-400/10 px-1 py-0.5 rounded">
                  wear
                </span>{' '}
                a soft t-shirt, comfortable sweatpants, and slippers.
              </>
            ) : (
              'I wear comfortable home clothes. I wear a soft t-shirt, comfortable sweatpants, and slippers.'
            )}
          </p>
        </div>
      </div>

      {/* Lightbox Modal when clicking a Polaroid photo */}
      <AnimatePresence>
        {lightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxPhoto(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full p-4 pb-10 rounded-2xl bg-[#111827] border border-slate-700 shadow-2xl text-center"
            >
              <button
                onClick={() => setLightboxPhoto(null)}
                className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-slate-800 hover:bg-rose-600 border border-slate-600 text-white flex items-center justify-center shadow-lg transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
              <img
                src={lightboxPhoto.src}
                alt={lightboxPhoto.caption}
                className="w-full max-h-[70vh] object-contain rounded-xl bg-slate-950"
              />
              <div className="mt-3 text-sm font-mono font-semibold text-amber-300">
                {lightboxPhoto.caption}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
