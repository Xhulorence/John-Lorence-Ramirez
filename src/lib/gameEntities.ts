/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface WordEntry {
  id: string;
  word: string;
  hint: string;
}

export interface PlayerInfo {
  name: string;
  message: string;
}

const STORAGE_KEY_WORDS = 'jumble_master_words';
const STORAGE_KEY_PLAYER = 'jumble_master_player';

// Default words if none exist
const DEFAULT_WORDS: WordEntry[] = [
  { id: '1', word: 'INTERNET', hint: 'This technology allows people to browse websites and communicate online.' },
  { id: '2', word: 'COMPUTER', hint: 'An electronic device for storing and processing data.' },
  { id: '3', word: 'SOFTWARE', hint: 'Programs and other operating information used by a computer.' },
  { id: '4', word: 'ALGORITHM', hint: 'A process or set of rules to be followed in calculations.' },
  { id: '5', word: 'DATABASE', hint: 'A structured set of data held in a computer.' },
  { id: '6', word: 'NETWORK', hint: 'A group or system of interconnected people or things.' },
  { id: '7', word: 'SECURITY', hint: 'The state of being free from danger or threat.' },
  { id: '8', word: 'HARDWARE', hint: 'The physical parts of a computer system.' },
  { id: '9', word: 'KEYBOARD', hint: 'A panel of keys that operates a computer or typewriter.' },
  { id: '10', word: 'BROWSER', hint: 'A program with a graphical user interface for displaying HTML files.' },
  { id: '11', word: 'WIRELESS', hint: 'Using radio, microwaves, etc. (as opposed to wires) to transmit signals.' },
  { id: '12', word: 'INTERFACE', hint: 'A point where two systems, subjects, organizations, etc., meet and interact.' },
  { id: '13', word: 'PROTOCOL', hint: 'The official procedure or system of rules governing affairs of state or diplomatic occasions.' },
  { id: '14', word: 'FIREWALL', hint: 'A part of a computer system or network that is designed to block unauthorized access.' },
  { id: '15', word: 'CLOUDS', hint: 'A network of remote servers hosted on the Internet to store, manage, and process data.' },
];

export const WordManager = {
  getWords: (): WordEntry[] => {
    const stored = localStorage.getItem(STORAGE_KEY_WORDS);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY_WORDS, JSON.stringify(DEFAULT_WORDS));
      return DEFAULT_WORDS;
    }
    return JSON.parse(stored);
  },
  saveWords: (words: WordEntry[]) => {
    localStorage.setItem(STORAGE_KEY_WORDS, JSON.stringify(words.slice(0, 15)));
  },
  addWord: (word: string, hint: string) => {
    const words = WordManager.getWords();
    if (words.length >= 15) return false;
    const newWord: WordEntry = {
      id: Date.now().toString(),
      word: word.toUpperCase(),
      hint
    };
    WordManager.saveWords([...words, newWord]);
    return true;
  },
  updateWord: (id: string, newWordText: string, newHint: string) => {
    const words = WordManager.getWords();
    const index = words.findIndex(w => w.id === id);
    if (index !== -1) {
      words[index] = { ...words[index], word: newWordText.toUpperCase(), hint: newHint };
      WordManager.saveWords(words);
    }
  },
  deleteWord: (id: string) => {
    const words = WordManager.getWords();
    WordManager.saveWords(words.filter(w => w.id !== id));
  }
};

export const PlayerManager = {
  getPlayer: (): PlayerInfo | null => {
    const stored = localStorage.getItem(STORAGE_KEY_PLAYER);
    return stored ? JSON.parse(stored) : null;
  },
  savePlayer: (player: PlayerInfo) => {
    localStorage.setItem(STORAGE_KEY_PLAYER, JSON.stringify(player));
  },
  clearPlayer: () => {
    localStorage.removeItem(STORAGE_KEY_PLAYER);
  }
};

export function jumbleWord(word: string): string {
  const arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // Ensure it's actually jumbled
  const result = arr.join('');
  if (result === word && word.length > 1) return jumbleWord(word);
  return result;
}
