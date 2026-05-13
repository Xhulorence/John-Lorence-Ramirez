/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Gamepad2, UserCog, User } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';
import { Button } from './UI';

interface MenuPageProps {
  onSelectAdmin: () => void;
  onSelectPlayer: () => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({ onSelectAdmin, onSelectPlayer }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full text-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-indigo-600 rounded-2xl shadow-2xl shadow-indigo-500/40">
            <Gamepad2 size={64} className="text-white" />
          </div>
        </div>
        <h1 className="text-7xl md:text-[110px] font-black text-white tracking-tighter uppercase leading-none mb-4">
          JUMBLE<span className="text-indigo-500">PRO</span>
        </h1>
        <p className="text-slate-500 text-sm md:text-base font-bold uppercase tracking-[0.4em]">
          Strategic Word Decryption Terminal
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col md:flex-row gap-6 w-full max-w-2xl px-4"
      >
        <Button 
          id="admin_button"
          onClick={onSelectAdmin}
          variant="secondary" 
          size="xl" 
          className="flex-1 group h-32 md:h-56 border-4 border-slate-900 hover:border-indigo-500/50 rounded-3xl"
        >
          <div className="flex flex-col items-center gap-4">
            <UserCog size={40} className="group-hover:text-indigo-400 transition-colors" />
            <span className="text-sm tracking-widest">ADMIN PORTAL</span>
          </div>
        </Button>
        <Button 
          id="player_button"
          onClick={onSelectPlayer}
          size="xl" 
          className="flex-1 h-32 md:h-56 rounded-3xl shadow-2xl"
        >
          <div className="flex flex-col items-center gap-4">
            <User size={40} />
            <span className="text-sm tracking-widest">START SESSION</span>
          </div>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-12 text-slate-600 text-[10px] font-black tracking-[0.5em] uppercase"
      >
        CORE SYSTEM ONLINE • BUILD v2.4.0
      </motion.div>
    </div>
  );
};
