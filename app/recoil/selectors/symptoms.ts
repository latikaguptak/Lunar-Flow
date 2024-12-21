import { selectorFamily } from 'recoil';

import { isSameDay } from 'date-fns';
import { selector } from 'recoil';
import { symptomsState } from '../atoms/symptoms';

export const getEntriesForDateSelector = selectorFamily({
  key: 'getEntriesForDateSelector',
  get:
    (date: Date | null) =>
    ({ get }) => {
      if (!date) return [];
      const entries = get(symptomsState);
      return entries.filter((entry) => isSameDay(new Date(entry.date), date));
    },
});

export const recentSymptomsSelector = selector({
  key: 'recentSymptomsSelector',
  get: ({ get }) => {
    const entries = get(symptomsState);
    return [...entries]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  },
});
