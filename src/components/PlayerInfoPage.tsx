/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserCircle2, MessageSquare, ArrowRight, ArrowLeft } from 'lucide-react';
import React, { useState } from 'react';
import { PlayerManager } from '../lib/gameEntities';
import { Button, Card, Input } from './UI';

interface PlayerInfoPageProps {
  onContinue: () => void;
  onBack: () => void;
}

export const PlayerInfoPage: React.FC<PlayerInfoPageProps> = ({ onContinue, onBack }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    PlayerManager.savePlayer({ name, message });
    onContinue();
  };

  return (
    <div className="flex items-center justify-center h-full p-4 w-full">
      <Card className="w-full max-w-xl p-12 border-2 border-slate-800">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Registrar</h2>
          <Button id="back_player" variant="ghost" size="sm" onClick={onBack} className="font-black text-[10px] tracking-widest">
            GO BACK
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
              <UserCircle2 size={12} className="text-indigo-500" />
              Public Callsign
            </label>
            <Input 
              id="player_name"
              placeholder="EX: JOHN_DOE" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-16"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1 flex items-center gap-2">
              <MessageSquare size={12} className="text-indigo-500" />
              Personal Broadcast
            </label>
            <textarea 
              id="player_message"
              className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl px-6 py-4 text-xl font-bold uppercase tracking-widest placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-all shadow-inner text-slate-100 min-h-[120px]"
              placeholder="e.g. READY TO UNSCRAMBLE"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <Button id="player_continue" type="submit" size="lg" className="w-full h-20 shadow-2xl">
            INITIALIZE SESSION
            <ArrowRight size={24} />
          </Button>
        </form>
      </Card>
    </div>
  );
};
