import { atom } from 'recoil';

export interface SleepEntry {
  id: string;
  date: Date;
  hours: number;
  quality: number;
  wakeUpTime: string;
  bedTime: string;
  notes?: string;
}

const getInitialState = (): SleepEntry[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('sleepEntries');
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

export const sleepEntriesState = atom<SleepEntry[]>({
  key: 'sleepEntriesState',
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
        localStorage.setItem('sleepEntries', serialized);
      });
    },
  ],
});