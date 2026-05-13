/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Play, ArrowLeft, Trophy, Info } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';
import { PlayerManager } from '../lib/gameEntities';
import { Button, Card } from './UI';

interface StartPageProps {
  onStart: () => void;
  onBack: () => void;
}

export const StartPage: React.FC<StartPageProps> = ({ onStart, onBack }) => {
  const player = PlayerManager.getPlayer();

  return (
    <div className="flex items-center justify-center h-full p-4 w-full">
      <Card className="w-full max-w-3xl text-center p-16 border-2 border-slate-800">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12"
        >
          <div className="inline-flex items-center justify-center p-6 bg-indigo-500/10 text-indigo-500 rounded-3xl mb-8 border border-indigo-500/20">
            <Trophy size={64} />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
            Welcome, <span className="text-indigo-500">{player?.name || 'OPERATOR'}</span>
          </h1>
          <p className="text-slate-500 font-black text-[10px] tracking-[0.5em] uppercase">NEURAL LINK ESTABLISHED • SESSION PENDING</p>
        </motion.div>

        <Card className="bg-slate-950 border-2 border-slate-800 mb-12 text-left p-8 rounded-3xl">
          <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-6 flex items-center gap-3">
            <Info size={18} className="text-indigo-500" />
            Mission Directives
          </h3>
          <ul className="space-y-4 text-slate-400 text-base font-bold uppercase tracking-tight">
            <li className="flex gap-4">
              <span className="text-indigo-500">01</span>
              Decipher 15 scrambled sequences to achieve total victory.
            </li>
            <li className="flex gap-4">
              <span className="text-indigo-500">02</span>
              You have exactly 30 seconds for each encryption lifecycle.
            </li>
            <li className="flex gap-4">
              <span className="text-indigo-500">03</span>
              Contextual hints are provided to optimize decoding.
            </li>
            <li className="flex gap-4">
              <span className="text-indigo-500">04</span>
              Failure result in session termination. Good luck.
            </li>
          </ul>
        </Card>

        <div className="flex flex-col md:flex-row gap-6">
          <Button id="back_to_profile" onClick={onBack} variant="secondary" size="lg" className="flex-1 h-20">
            Modify Identity
          </Button>
          <Button id="start_game_launch" onClick={onStart} size="lg" className="flex-[2] h-20 text-2xl shadow-2xl">
            <Play size={24} className="mr-2" />
            Engage Decryption
          </Button>
        </div>
      </Card>
    </div>
  );
};
