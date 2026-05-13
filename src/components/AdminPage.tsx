/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Plus, Edit2, Trash2, Save, LogOut, FileText } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { WordEntry, WordManager } from '../lib/gameEntities';
import { Button, Card, Input } from './UI';

interface AdminPageProps {
  onBack: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onBack }) => {
  const [words, setWords] = useState<WordEntry[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newWord, setNewWord] = useState('');
  const [newHint, setNewHint] = useState('');

  useEffect(() => {
    setWords(WordManager.getWords());
  }, []);

  const handleAdd = () => {
    if (!newWord || !newHint) return;
    if (words.length >= 15) {
      alert("Terminal capacity exceeded (15/15).");
      return;
    }
    WordManager.addWord(newWord, newHint);
    refresh();
    setNewWord('');
    setNewHint('');
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this encryption sequence?")) {
      WordManager.deleteWord(id);
      refresh();
    }
  };

  const handleEdit = (word: WordEntry) => {
    setEditingId(word.id);
    setNewWord(word.word);
    setNewHint(word.hint);
  };

  const handleSave = () => {
    if (editingId) {
      WordManager.updateWord(editingId, newWord, newHint);
      setEditingId(null);
      setNewWord('');
      setNewHint('');
      refresh();
    }
  };

  const refresh = () => setWords(WordManager.getWords());

  return (
    <div className="flex-grow flex h-full overflow-hidden">
      {/* Sidebar: Entry Stats */}
      <aside className="w-80 bg-slate-950 border-r border-slate-800 p-10 flex flex-col justify-between shrink-0">
        <div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-2">Central Registry</h1>
          <p className="text-slate-600 font-black text-[10px] tracking-[0.3em] uppercase mb-12">Build v2.4.0 • Authorized Personnel Only</p>
          
          <div className="space-y-12">
            <div>
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Registry Capacity</div>
              <div className="text-3xl font-black text-white">{words.length} / 15 <span className="text-xs text-slate-600">SLOTS</span></div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full mt-4">
                <div className="h-full bg-indigo-500 rounded-full shadow-[0_0_10px_#6366f1]" style={{ width: `${(words.length / 15) * 100}%` }}></div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl italic text-xs text-slate-500 leading-relaxed font-bold">
              "MANAGING THE DECRYPTION POOL REQUIRES PRECISION. ENSURE ALL HINTS ARE OPTIMIZED FOR COMPETITIVE PLAY."
            </div>
          </div>
        </div>

        <Button id="logout_admin" onClick={onBack} variant="secondary" size="md" className="w-full">
          Secure Logout
        </Button>
      </aside>

      {/* Main Viewport */}
      <div className="flex-grow flex flex-col p-12 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 h-full overflow-hidden">
          {/* Form */}
          <div className="lg:col-span-4 space-y-8">
            <Card className="border-2 border-slate-800 shadow-xl">
              <h3 className="text-xl font-black text-white mb-8 uppercase tracking-tighter flex items-center gap-3">
                <FileText size={20} className="text-indigo-500" />
                {editingId ? 'Modify Sequence' : 'New Sequence'}
              </h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Codename (Upper Case)</label>
                  <Input 
                    id="word_input"
                    placeholder="EX: INTERNET" 
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                    className="h-14 text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Context Directive</label>
                  <textarea 
                    id="hint_input"
                    className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl px-6 py-4 text-sm font-bold uppercase tracking-widest placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-all shadow-inner text-slate-100 min-h-[140px]"
                    placeholder="EXPLAIN THE CODE..."
                    value={newHint}
                    onChange={(e) => setNewHint(e.target.value)}
                  />
                </div>
                
                {editingId ? (
                  <div className="flex gap-3">
                    <Button id="save_edit" onClick={handleSave} className="flex-1">
                      Overwrite
                    </Button>
                    <Button id="cancel_edit" onClick={() => { setEditingId(null); setNewWord(''); setNewHint(''); }} variant="secondary">
                      Abort
                    </Button>
                  </div>
                ) : (
                  <Button id="add_word" onClick={handleAdd} className="w-full h-14" disabled={words.length >= 15}>
                    Register Sequence
                  </Button>
                )}
              </div>
            </Card>
          </div>

          {/* List Area */}
          <div className="lg:col-span-8 flex flex-col overflow-hidden">
            <Card className="flex-grow flex flex-col p-4 border-2 border-slate-800 overflow-hidden bg-slate-950">
              <div className="overflow-y-auto pr-2 custom-scrollbar">
                <table className="w-full text-left">
                  <thead className="sticky top-0 bg-slate-950 z-20">
                    <tr>
                      <th className="p-6 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] border-b border-slate-800">Sequence</th>
                      <th className="p-6 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] border-b border-slate-800">Directive</th>
                      <th className="p-6 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] border-b border-slate-800 text-right">Ops</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/30">
                    {words.map((w) => (
                      <tr key={w.id} className="hover:bg-slate-900/40 transition-colors group">
                        <td className="p-6">
                          <span className="font-black text-indigo-400 tracking-tighter text-lg uppercase">{w.word}</span>
                        </td>
                        <td className="p-6">
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-tight line-clamp-1 italic">"{w.hint}"</p>
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(w)} className="text-slate-400 hover:text-white transition-colors">
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => handleDelete(w)} className="text-slate-600 hover:text-rose-500 transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {words.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-20 text-slate-700">
                    <span className="block text-4xl mb-4 opacity-20">EMPTY</span>
                    <p className="text-[10px] font-black tracking-widest uppercase italic">The registry has no active encryption protocols.</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
