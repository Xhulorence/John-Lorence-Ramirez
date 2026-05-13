/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Trophy, RotateCcw, Home, Timer } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';
import { PlayerManager } from '../lib/gameEntities';
import { Button, Card } from './UI';

interface ResultPageProps {
  score: number;
  timeSpent: number;
  onPlayAgain: () => void;
  onMenu: () => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({ score, timeSpent, onPlayAgain, onMenu }) => {
  const player = PlayerManager.getPlayer();
  
  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}M ${sec.toString().padStart(2, '0')}S`;
  };

  const isPerfect = score >= 15;

  return (
    <div className="flex items-center justify-center h-full p-4 w-full">
      <Card className="w-full max-w-3xl text-center relative overflow-hidden p-16 border-4 border-slate-900 shadow-[0_0_80px_rgba(0,0,0,0.6)] group">
        {/* Animated accent */}
        <div className="absolute top-0 left-0 w-full h-3 bg-indigo-500 shadow-[0_0_20px_#6366f1] z-30" />
        
        {/* Backlight shine */}
        <div className="absolute -inset-24 bg-indigo-500/10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

        <div className="mb-12 relative z-10">
          <div className="inline-flex items-center justify-center p-8 rounded-full mb-8 bg-slate-950 border-4 border-slate-800 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
            <Trophy size={100} className={isPerfect ? 'text-yellow-500' : 'text-indigo-500'} />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-4 leading-none italic">
              {isPerfect ? 'MASTERMIND' : 'MISSION COMPLETE'}
            </h1>
            <p className="text-indigo-500 font-black text-2xl uppercase tracking-[0.3em] mb-4">
              {player?.name || 'OPERATOR'}
            </p>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest italic">
              {isPerfect ? 'FLAWLESS DECRYPTION PERFORMANCE' : 'OPERATIONAL PARAMETERS COMPLETED'}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-950 border-2 border-slate-800 p-10 rounded-3xl group/stat hover:border-indigo-500/50 transition-colors"
          >
            <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 group-hover/stat:text-indigo-400">Sequences Resolved</span>
            <span className="text-6xl font-black text-white leading-none">{score} <span className="text-slate-700 text-2xl">/ 15</span></span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-950 border-2 border-slate-800 p-10 rounded-3xl group/stat hover:border-indigo-500/50 transition-colors"
          >
            <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 group-hover/stat:text-indigo-400">Sync Duration</span>
            <span className="text-4xl font-black text-white leading-none block pt-2">{formatTime(timeSpent)}</span>
          </motion.div>
        </div>

        <div className="flex flex-col gap-6">
          <Button id="play_again" onClick={onPlayAgain} size="lg" className="h-24 text-3xl italic shadow-indigo-500/40 relative overflow-hidden group">
            <motion.div 
              className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"
            />
            RE-ENGAGE SYSTEM
          </Button>
          <div className="flex gap-6">
            <Button id="back_to_menu_result" onClick={onMenu} variant="secondary" className="flex-1 h-20 text-xs tracking-widest uppercase">
              RETURN TO COMMAND HUB
            </Button>
          </div>
        </div>

        {player?.message && (
          <div className="mt-12 pt-8 border-t border-slate-800 font-bold italic text-slate-500 text-lg">
             "{player.message.toUpperCase()}"
          </div>
        )}
      </Card>
    </div>
  );
};
