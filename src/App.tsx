/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { AdminLoginPage } from './components/AdminLoginPage';
import { AdminPage } from './components/AdminPage';
import { GamePage } from './components/GamePage';
import { MenuPage } from './components/MenuPage';
import { PlayerInfoPage } from './components/PlayerInfoPage';
import { ResultPage } from './components/ResultPage';
import { StartPage } from './components/StartPage';

type ViewState = 'menu' | 'admin-login' | 'admin-dashboard' | 'player-info' | 'start-page' | 'game-page' | 'result-page';

export default function App() {
  const [view, setView] = useState<ViewState>('menu');
  const [finalResult, setFinalResult] = useState<{ score: number; time: number } | null>(null);

  const handleWin = (score: number, timeSpent: number) => {
    setFinalResult({ score, time: timeSpent });
    setView('result-page');
  };

  const renderView = () => {
    switch (view) {
      case 'menu':
        return <MenuPage onSelectAdmin={() => setView('admin-login')} onSelectPlayer={() => setView('player-info')} />;
      case 'admin-login':
        return <AdminLoginPage onLogin={() => setView('admin-dashboard')} onBack={() => setView('menu')} />;
      case 'admin-dashboard':
        return <AdminPage onBack={() => setView('menu')} />;
      case 'player-info':
        return <PlayerInfoPage onContinue={() => setView('start-page')} onBack={() => setView('menu')} />;
      case 'start-page':
        return <StartPage onStart={() => setView('game-page')} onBack={() => setView('player-info')} />;
      case 'game-page':
        return <GamePage onWin={handleWin} onExit={() => setView('menu')} />;
      case 'result-page':
        return (
          <ResultPage 
            score={finalResult?.score || 0} 
            timeSpent={finalResult?.time || 0} 
            onPlayAgain={() => setView('game-page')} 
            onMenu={() => setView('menu')} 
          />
        );
      default:
        return <MenuPage onSelectAdmin={() => setView('admin-login')} onSelectPlayer={() => setView('player-info')} />;
    }
  };

  return (
    <div className="h-screen bg-slate-950 text-slate-50 font-sans flex flex-col overflow-hidden select-none border-8 border-slate-900 selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation Bar */}
      <nav className="h-16 w-full bg-slate-900 flex items-center justify-between px-8 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-black text-xl">J</div>
          <span className="font-bold tracking-tighter text-2xl uppercase">JUMBLE<span className="text-indigo-400 font-light tracking-widest text-lg ml-1">PRO</span></span>
        </div>
        <div className="flex gap-6 items-center text-xs font-black text-slate-400 tracking-widest">
          <span className={view === 'game-page' ? 'text-indigo-400' : 'hover:text-slate-200 cursor-pointer'} onClick={() => view !== 'game-page' && setView('menu')}>GAMEPLAY</span>
          <span className={view === 'admin-dashboard' ? 'text-indigo-400' : 'hover:text-slate-200 cursor-pointer'} onClick={() => setView('admin-login')}>ADMIN PORTAL</span>
          <div className="h-4 w-[1px] bg-slate-700"></div>
          <button className="hover:text-white transition-colors" onClick={() => window.close()}>EXIT APPLICATION</button>
        </div>
      </nav>

      <main className="flex-grow flex overflow-hidden relative justify-center items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full h-full flex items-center justify-center overflow-hidden"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Bar */}
      <footer className="h-12 w-full bg-indigo-600 flex items-center px-8 justify-between text-[10px] font-black shrink-0">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-white animate-pulse"></div> SYSTEM STATUS: OPTIMAL</span>
          <span className="opacity-50 tracking-widest uppercase">Encryption Mode: Active</span>
        </div>
        <div className="flex gap-8 tracking-[0.2em]">
          <span>BUILD v2.4.0 (CODENAME: BOLD)</span>
          <button className="hover:underline uppercase" onClick={() => setView('menu')}>Reset Session</button>
        </div>
      </footer>
    </div>
  );
}

