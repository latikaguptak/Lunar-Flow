import { selector } from 'recoil';
import { cycleLogsState } from '../atoms/cycle';
import { isSameDay } from 'date-fns';

export const getLogForDateSelector = selector({
  key: 'getLogForDateSelector',
  get: ({ get }) => (date: Date) => {
    const logs = get(cycleLogsState);
    return logs.find(log => isSameDay(log.date, date));
  },
});

export const recentLogsSelector = selector({
  key: 'recentLogsSelector',
  get: ({ get }) => {
    const logs = get(cycleLogsState);
    return [...logs].sort((a, b) => b.date.getTime() - a.date.getTime());
  },
});