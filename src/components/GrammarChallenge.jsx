import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ChevronDown, CheckCircle2, XCircle, RotateCcw, Sparkles } from 'lucide-react';

const challengesBySection = {
  house: [
    {
      id: 'h-q1',
      type: 'Subject Swap (I → My sister)',
      original: 'I clean my room and take out the trash.',
      promptBefore: 'My sister',
      promptMiddle: 'her room and',
      promptAfter: 'out the trash.',
      isDoubleBlank: true,
      options: [
        { label: 'clean / take', isCorrect: false },
        { label: 'cleans / takes', isCorrect: true },
        { label: 'cleaning / taking', isCorrect: false }
      ],
      correctFill: ['cleans', 'takes'],
      explanation: 'With 3rd person singular ("My sister" = She), Present Simple verbs add -s.'
    },
    {
      id: 'h-q2',
      type: 'Who Question (Subject)',
      original: 'My mother cooks food.',
      promptBefore: 'Who',
      promptAfter: 'food?',
      isDoubleBlank: false,
      options: [
        { label: 'does cook', isCorrect: false },
        { label: 'cooks', isCorrect: true },
        { label: 'cook', isCorrect: false }
      ],
      correctFill: ['cooks'],
      explanation: 'When "Who" asks about the subject, DO NOT use do/does — keep the -s on the verb!'
    },
    {
      id: 'h-q3',
      type: 'What Question (Object)',
      original: 'My sister washes the dishes.',
      promptBefore: 'What',
      promptMiddle: 'your sister',
      promptAfter: '?',
      isDoubleBlank: true,
      options: [
        { label: 'does / washes', isCorrect: false },
        { label: 'do / wash', isCorrect: false },
        { label: 'does / wash', isCorrect: true }
      ],
      correctFill: ['does', 'wash'],
      explanation: 'Use "does" for "your sister", and return the main verb back to the base form (wash).'
    }
  ],
  freetime: [
    {
      id: 'f-q1',
      type: 'Subject Swap (I → He)',
      original: 'I study English, work on my computer, and eat healthy food.',
      promptBefore: 'He',
      promptMiddle: 'English, works on his computer, and',
      promptAfter: 'healthy food.',
      isDoubleBlank: true,
      options: [
        { label: 'study / eat', isCorrect: false },
        { label: 'studys / eats', isCorrect: false },
        { label: 'studies / eats', isCorrect: true }
      ],
      correctFill: ['studies', 'eats'],
      explanation: 'Verbs ending in consonant + y (study) change y → ies (studies) with He/She.'
    },
    {
      id: 'f-q2',
      type: 'Who Question (Subject)',
      original: 'In my free time alone, I play video games.',
      promptBefore: 'Who',
      promptAfter: 'video games alone?',
      isDoubleBlank: false,
      options: [
        { label: 'plays', isCorrect: true },
        { label: 'does play', isCorrect: false },
        { label: 'play', isCorrect: false }
      ],
      correctFill: ['plays'],
      explanation: '"Who" asks about the subject, so no do/does is used and the verb takes -s (plays).'
    },
    {
      id: 'f-q3',
      type: 'When Question (Routine)',
      original: 'I wake up early every day.',
      promptBefore: 'When',
      promptMiddle: 'you',
      promptAfter: 'up?',
      isDoubleBlank: true,
      options: [
        { label: 'are / wake', isCorrect: false },
        { label: 'do / wake', isCorrect: true },
        { label: 'does / wakes', isCorrect: false }
      ],
      correctFill: ['do', 'wake'],
      explanation: 'With "you", use auxiliary "do" + the base verb "wake".'
    }
  ],
  event: [
    {
      id: 'e-q1',
      type: 'Subject Swap (I → My brother)',
      original: 'I wear comfortable home clothes.',
      promptBefore: 'My brother',
      promptAfter: 'comfortable home clothes.',
      isDoubleBlank: false,
      options: [
        { label: 'wear', isCorrect: false },
        { label: 'wears', isCorrect: true },
        { label: 'is wear', isCorrect: false }
      ],
      correctFill: ['wears'],
      explanation: '"My brother" is 3rd person singular (He), so "wear" becomes "wears".'
    },
    {
      id: 'e-q2',
      type: 'Who Question (Subject)',
      original: 'Everyone meets, eats together, and talks.',
      promptBefore: 'Who',
      promptAfter: 'every Friday?',
      isDoubleBlank: false,
      options: [
        { label: 'does meet', isCorrect: false },
        { label: 'meet', isCorrect: false },
        { label: 'meets', isCorrect: true }
      ],
      correctFill: ['meets'],
      explanation: 'Subject question with "Who" needs no do/does and takes the singular verb (-s).'
    },
    {
      id: 'e-q3',
      type: 'When Question (Time)',
      original: 'It happens every Friday at 3:00 PM.',
      promptBefore: 'When',
      promptMiddle: 'it',
      promptAfter: '?',
      isDoubleBlank: true,
      options: [
        { label: 'does / happen', isCorrect: true },
        { label: 'does / happens', isCorrect: false },
        { label: 'do / happen', isCorrect: false }
      ],
      correctFill: ['does', 'happen'],
      explanation: '"does" takes the -s for "it", so "happen" returns to its base form!'
    }
  ]
};

export default function GrammarChallenge({ sectionId, themeColor = 'indigo' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [solved, setSolved] = useState({}); // { [qId]: true }
  const [wrongAttempt, setWrongAttempt] = useState({}); // { [qId]: optionLabel }

  const questions = challengesBySection[sectionId] || [];
  if (questions.length === 0) return null;

  const score = Object.values(solved).filter(Boolean).length;

  const handleSelect = (q, option) => {
    if (solved[q.id]) return;
    if (option.isCorrect) {
      setSolved((prev) => ({ ...prev, [q.id]: true }));
      setWrongAttempt((prev) => ({ ...prev, [q.id]: null }));
    } else {
      setWrongAttempt((prev) => ({ ...prev, [q.id]: option.label }));
    }
  };

  const handleReset = () => {
    setSolved({});
    setWrongAttempt({});
  };

  const accentBorder =
    themeColor === 'emerald'
      ? 'border-emerald-500/30 hover:border-emerald-500/50'
      : themeColor === 'amber'
        ? 'border-amber-500/30 hover:border-amber-500/50'
        : 'border-indigo-500/30 hover:border-indigo-500/50';

  return (
    <div className="mt-10">
      {/* Collapsible Trigger Bar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl bg-slate-900/75 border ${accentBorder} backdrop-blur-md transition-all group`}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Zap className="w-4 h-4" />
          </div>
          <div className="text-left">
            <div className="text-sm sm:text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
              <span>Grammar Challenge: Test Present Simple</span>
              {score > 0 && (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {score}/{questions.length}
                </span>
              )}
            </div>
            <div className="text-xs text-slate-400">
              Subject swaps, Who questions, and Do/Does transformations ({questions.length} Questions)
            </div>
          </div>
        </div>

        <ChevronDown
          className={`w-5 h-5 text-slate-400 group-hover:text-white transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Expandable Questions Panel */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden"
          >
            <div className="pt-5 space-y-4">
              {/* Top Score & Reset Bar */}
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-mono text-slate-400">
                  Score:{' '}
                  <strong className={score === questions.length ? 'text-emerald-400' : 'text-amber-300'}>
                    {score} / {questions.length}
                  </strong>
                </span>
                {score > 0 && (
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Quiz</span>
                  </button>
                )}
              </div>

              {/* 3 Question Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {questions.map((q, idx) => {
                  const isSolved = !!solved[q.id];
                  const wrongChoice = wrongAttempt[q.id];

                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-2xl bg-slate-950/80 border transition-colors flex flex-col justify-between ${
                        isSolved ? 'border-emerald-500/50' : 'border-slate-800'
                      }`}
                    >
                      <div>
                        {/* Type Badge */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-indigo-300 border border-slate-700">
                            Q{idx + 1} • {q.type}
                          </span>
                          {isSolved && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                        </div>

                        {/* Original Sentence */}
                        <div className="text-xs text-slate-400 mb-3 pb-2.5 border-b border-slate-800/80">
                          <span className="text-slate-500 font-mono">Original:</span> "{q.original}"
                        </div>

                        {/* Challenge Prompt with Blank(s) */}
                        <p className="text-sm sm:text-base font-medium text-white leading-relaxed mb-4">
                          {q.promptBefore}{' '}
                          <span
                            className={`inline-block px-2 py-0.5 mx-0.5 rounded font-mono text-xs sm:text-sm font-bold border ${
                              isSolved
                                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                                : 'bg-slate-900 border-dashed border-amber-500/50 text-amber-300'
                            }`}
                          >
                            {isSolved ? q.correctFill[0] : '_____'}
                          </span>
                          {q.isDoubleBlank && (
                            <>
                              {' '}
                              {q.promptMiddle}{' '}
                              <span
                                className={`inline-block px-2 py-0.5 mx-0.5 rounded font-mono text-xs sm:text-sm font-bold border ${
                                  isSolved
                                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                                    : 'bg-slate-900 border-dashed border-amber-500/50 text-amber-300'
                                }`}
                              >
                                {isSolved ? q.correctFill[1] : '_____'}
                              </span>
                            </>
                          )}{' '}
                          {q.promptAfter}
                        </p>
                      </div>

                      {/* Options or Explanation */}
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {q.options.map((opt) => {
                            const isThisCorrectSolved = isSolved && opt.isCorrect;
                            const isThisWrong = !isSolved && wrongChoice === opt.label;

                            return (
                              <motion.button
                                key={opt.label}
                                onClick={() => handleSelect(q, opt)}
                                disabled={isSolved}
                                animate={isThisWrong ? { x: [0, -5, 5, -4, 4, 0] } : {}}
                                transition={{ duration: 0.3 }}
                                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold border transition-all flex items-center gap-1.5 ${
                                  isThisCorrectSolved
                                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                                    : isThisWrong
                                      ? 'bg-rose-500/20 border-rose-500/60 text-rose-300'
                                      : isSolved
                                        ? 'bg-slate-900/40 border-slate-800/60 text-slate-500 cursor-default'
                                        : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200 cursor-pointer'
                                }`}
                              >
                                {isThisWrong && <XCircle className="w-3.5 h-3.5 text-rose-400" />}
                                <span>{opt.label}</span>
                              </motion.button>
                            );
                          })}
                        </div>

                        {/* Explanation shown once solved */}
                        {isSolved && (
                          <motion.div
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/25 text-[11px] text-emerald-200 leading-relaxed flex items-start gap-1.5"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{q.explanation}</span>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
