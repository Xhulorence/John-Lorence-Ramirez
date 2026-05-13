/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Lock, ArrowLeft, ShieldCheck } from 'lucide-react';
import React, { useState } from 'react';
import { Button, Card, Input } from './UI';

interface AdminLoginPageProps {
  onLogin: () => void;
  onBack: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onLogin, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'lorence' && password === '123') {
      onLogin();
    } else {
      setError('AUTHORIZATION FAILED: INVALID CREDENTIALS');
    }
  };

  return (
    <div className="flex items-center justify-center h-full w-full p-4">
      <Card className="w-full max-w-xl p-12 border-2 border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Identity Check</h2>
          <Button id="back_login" variant="ghost" size="sm" onClick={onBack} className="font-black text-[10px] tracking-widest">
            CANCEL
          </Button>
        </div>

        <div className="flex justify-center mb-12">
          <div className="p-6 bg-slate-950 border-4 border-slate-800 rounded-3xl shadow-inner">
            <Lock size={48} className="text-indigo-500" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Personnel ID</label>
            <Input 
              id="admin_username"
              placeholder="ENTER USERNAME" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="h-16"
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] ml-1">Access Passphrase</label>
            <Input 
              id="admin_password"
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-16"
            />
          </div>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-xl text-rose-500 text-xs font-black text-center tracking-widest">
              {error}
            </div>
          )}

          <Button id="admin_login_submit" type="submit" size="lg" className="w-full h-20 shadow-2xl">
            Authorize Connection
          </Button>
        </form>
      </Card>
    </div>
  );
};
