/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Clock, Trophy, HelpCircle, Send, LogOut, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useEffect, useCallback } from 'react';
import { WordEntry, WordManager, PlayerManager, jumbleWord } from '../lib/gameEntities';
import { Button, Card, Input } from './UI';

interface GamePageProps {
  onWin: (score: number, timeSpent: number) => void;
  onExit: () => void;
}

export const GamePage: React.FC<GamePageProps> = ({ onWin, onExit }) => {
  const player = PlayerManager.getPlayer();
  const [allWords] = useState<WordEntry[]>(() => {
    const w = WordManager.getWords();
    return [...w].sort(() => Math.random() - 0.5);
  });
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [jumbled, setJumbled] = useState('');
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);

  const MAX_ATTEMPTS = 15;
  const totalTimeRef = React.useRef(0);
  const scoreRef = React.useRef(0);
  const currentIndexRef = React.useRef(0);
  const currentWord = allWords[currentIndex];

  // Sync ref with state for use in callbacks without dependencies
  useEffect(() => {
    scoreRef.current = score;
    currentIndexRef.current = currentIndex;
  }, [score, currentIndex]);

  const loadNextWord = useCallback(() => {
    const nextIdx = currentIndexRef.current + 1;
    const isLast = nextIdx >= Math.min(allWords.length, MAX_ATTEMPTS);
    
    if (isLast) {
      onWin(scoreRef.current + 1, totalTimeRef.current);
    } else {
      setScore(s => s + 1);
      setCurrentIndex(nextIdx);
      setTimeLeft(30);
      setAnswer('');
      setFeedback(null);
    }
  }, [allWords.length, onWin]);

  const loadSkipWord = useCallback(() => {
    const nextIdx = currentIndexRef.current + 1;
    const isLast = nextIdx >= Math.min(allWords.length, MAX_ATTEMPTS);

    if (isLast) {
      onWin(scoreRef.current, totalTimeRef.current);
    } else {
      setCurrentIndex(nextIdx);
      setTimeLeft(30);
      setAnswer('');
      setFeedback(null);
    }
  }, [allWords.length, onWin]);

  useEffect(() => {
    if (currentWord) {
      setJumbled(jumbleWord(currentWord.word));
    }
  }, [currentWord]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          loadSkipWord();
          return 30;
        }
        return prev - 1;
      });
      totalTimeRef.current += 1;
      setTotalTimeSpent(totalTimeRef.current);
    }, 1000);

    return () => clearInterval(timer);
  }, [loadSkipWord]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;

    if (answer.toUpperCase() === currentWord.word) {
      setFeedback('correct');
      setTimeout(() => {
        loadNextWord();
      }, 1000);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1000);
    }
  };

  const handleSkip = () => {
    loadSkipWord();
  };

  if (!currentWord) return null;

  return (
    <div className="flex-grow flex h-full">
      {/* Left Sidebar: Player Info & Stats */}
      <aside className="w-80 bg-slate-950 border-r border-slate-800 p-10 flex flex-col justify-between shrink-0">
        <div>
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
            <ShieldCheck size={14} className="text-indigo-500" />
            Active Operator
          </div>
          <div className="text-4xl font-black mb-1 truncate text-white leading-none">
            {player?.name.toUpperCase() || 'ANONYMOUS'}
          </div>
          <div className="text-sm text-indigo-400 italic mb-12 line-clamp-2">
            "{player?.message || 'Ready for action.'}"
          </div>

          <div className="space-y-10">
            <div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Sync Progress</div>
              <div className="text-2xl font-black tracking-tighter text-white">
                {(currentIndex + 1).toString().padStart(2, '0')} / 15 <span className="text-xs text-slate-600 ml-1">SEQUENCES</span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full mt-3 border border-slate-800 p-[2px]">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentIndex + 1) / 15) * 100}%` }}
                  className="h-full bg-indigo-500 rounded-full shadow-[0_0_15px_#6366f1]"
                />
              </div>
            </div>
            
            <div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Operational Score</div>
              <div className="text-5xl font-black text-indigo-500 tracking-tighter italic leading-none">
                {(score * 500).toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-inner">
            <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-3">Emergency Protcol</div>
            <Button id="quit_game" onClick={onExit} variant="secondary" size="sm" className="w-full">
              <LogOut size={14} />
              Abandon Mission
            </Button>
          </div>
        </div>
      </aside>

      {/* Central Game Hub */}
      <section className="flex-grow flex flex-col items-center justify-center p-12 relative overflow-y-auto">
        {/* Timer Orbit */}
        <div className="absolute top-12 right-12 text-right">
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Remaining Time</div>
          <motion.div 
            key={timeLeft}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-8xl font-black tracking-tighter tabular-nums leading-none ${timeLeft <= 5 ? 'text-rose-500' : 'text-white'}`}
          >
            {timeLeft}<span className="text-2xl ml-1">s</span>
          </motion.div>
        </div>

        {/* Jumbled Word Display */}
        <div className="text-center mb-16 w-full">
          <div className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.6em] mb-4">UNSCRAMBLE THE ENCRYPTION</div>
          <h1 className="text-8xl md:text-[130px] font-black leading-none tracking-tighter text-white drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] uppercase break-all">
            {jumbled}
          </h1>
        </div>

        {/* Hint Card */}
        <div className="max-w-2xl w-full bg-slate-900 border-2 border-slate-800 p-8 rounded-3xl mb-16 text-center relative shadow-2xl">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-950 px-4 py-1 border border-slate-800 rounded-full">
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Descriptor Hint</span>
          </div>
          <p className="text-2xl text-slate-300 italic font-medium leading-relaxed">
            "{currentWord.hint}"
          </p>
        </div>

        {/* Interaction Zone */}
        <div className="w-full max-w-2xl flex flex-col gap-6">
          <form onSubmit={handleSubmit} className="flex gap-6">
            <div className="flex-grow relative">
              <Input 
                id="game_answer_field"
                autoFocus
                placeholder="TYPE YOUR ANSWER HERE..." 
                value={answer}
                onChange={(e) => setAnswer(e.target.value.toUpperCase())}
                className="h-20 text-2xl"
              />
              <AnimatePresence>
                {feedback === 'correct' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute -top-12 left-0 w-full text-center text-green-500 font-black text-sm tracking-[0.3em] uppercase"
                  >
                    DECRYPTION SUCCESSFUL
                  </motion.div>
                )}
                {feedback === 'wrong' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute -top-12 left-0 w-full text-center text-rose-500 font-black text-sm tracking-[0.3em] uppercase"
                  >
                    ACCESS DENIED: RE-ENTRY REQUIRED
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Button id="submit_answer" type="submit" size="lg" className="h-20 px-12 shadow-2xl">
              SUBMIT
            </Button>
          </form>
          
          <Button 
            id="tap_skip" 
            onClick={handleSkip} 
            variant="secondary" 
            className="w-full h-12 border-2 border-slate-800 hover:border-slate-700 font-black text-[10px] tracking-[0.5em] uppercase opacity-50 hover:opacity-100 transition-opacity"
          >
            I'M STUCK (SKIP SEQUENCE)
          </Button>
        </div>
      </section>
    </div>
  );
};
