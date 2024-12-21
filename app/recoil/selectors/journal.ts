import { selector } from 'recoil';
import { journalEntriesState } from '../atoms/journal';

export const sortedJournalEntriesSelector = selector({
  key: 'sortedJournalEntriesSelector',
  get: ({ get }) => {
    const entries = get(journalEntriesState);
    return [...entries].sort((a, b) => 
      b.date.getTime() - a.date.getTime()
    );
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