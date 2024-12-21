import { atom } from 'recoil';
import { JournalEntry } from '@/types/journal';

// Load initial state from localStorage if available
const getInitialState = (): JournalEntry[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('journalEntries');
  if (!stored) return [];
  
  try {
    const parsed = JSON.parse(stored);
    return parsed.map((entry: any) => ({
      ...entry,
      date: new Date(entry.date)
    }));
  } catch {
    return [];
  }
};

export const journalEntriesState = atom<JournalEntry[]>({
  key: 'journalEntriesState',
  default: getInitialState(),
  effects: [
    ({ onSet }) => {
      onSet((newEntries) => {
        if (typeof window === 'undefined') return;
        
        const serialized = JSON.stringify(
          newEntries.map(entry => ({
            ...entry,
            date: entry.date.toISOString()
          }))
        );
        localStorage.setItem('journalEntries', serialized);
      });
    },
  ],
});