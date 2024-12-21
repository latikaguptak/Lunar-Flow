import { atom } from 'recoil';

export interface CycleLog {
  id: string;
  date: Date;
  flow: 'light' | 'medium' | 'heavy';
  symptoms: string[];
  mood: 'happy' | 'neutral' | 'sad';
  temperature?: number;
  energy: number;
  notes?: string;
  cycleDay: number;
  cycleLength: number;
  periodLength: number;
  ovulationDay?: number;
  fertileWindowStart?: number;
  fertileWindowEnd?: number;
}

const getInitialState = (): CycleLog[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('cycleLogs');
  if (!stored) return [];
  
  try {
    const parsed = JSON.parse(stored);
    return parsed.map((log: any) => ({
      ...log,
      date: new Date(log.date)
    }));
  } catch {
    return [];
  }
};

export const cycleLogsState = atom<CycleLog[]>({
  key: 'cycleLogsState',
  default: getInitialState(),
  effects: [
    ({ onSet }) => {
      onSet((newLogs) => {
        if (typeof window === 'undefined') return;
        
        const serialized = JSON.stringify(
          newLogs.map(log => ({
            ...log,
            date: log.date.toISOString()
          }))
        );
        localStorage.setItem('cycleLogs', serialized);
      });
    },
  ],
});

export const cycleSettingsState = atom({
  key: 'cycleSettingsState',
  default: {
    averageCycleLength: 28,
    averagePeriodLength: 5,
    lastPeriodStart: new Date(),
  },
});