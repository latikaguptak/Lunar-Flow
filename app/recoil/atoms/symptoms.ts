import { atom } from 'recoil';
import { SymptomEntry } from '@/types/symptoms';

// Load initial state from localStorage if available
const getInitialState = (): SymptomEntry[] => {
  if (typeof window === 'undefined') return [];

  const stored = localStorage.getItem('symptomEntries');
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored);
    return parsed.map((entry: any) => ({
      ...entry,
      date: new Date(entry.date), // Ensure dates are deserialized
    }));
  } catch (error) {
    console.error('Error loading symptom entries:', error);
    return [];
  }
};

export const symptomsState = atom<SymptomEntry[]>({
  key: 'symptomsState',
  default: getInitialState(),
  effects: [
    ({ onSet }) => {
      onSet((newEntries) => {
        if (typeof window === 'undefined') return;

        const serialized = JSON.stringify(
          newEntries.map((entry) => ({
            ...entry,
            date: entry.date.toISOString(), // Serialize dates
          }))
        );
        localStorage.setItem('symptomEntries', serialized);
      });
    },
  ],
});
