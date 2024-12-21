import { atom, selector } from 'recoil';
import { JournalEntry } from '@/app/dashboard/components/journal/types';

export const journalEntriesState = atom<JournalEntry[]>({
  key: 'journalEntriesState',
  default: [],
});

export const journalEntriesSelector = selector({
  key: 'journalEntriesSelector',
  get: ({ get }) => {
    return get(journalEntriesState);
  },
});

export const getEntriesForDateSelector = selector({
  key: 'getEntriesForDateSelector',
  get: ({ get }) => (date: Date) => {
    const entries = get(journalEntriesState);
    return entries.filter(
      (entry) => entry.date.toDateString() === date.toDateString()
    );
  },
});