// import { atom } from 'recoil';

// export interface CycleStats {
//   currentPhase: 'menstrual' | 'follicular' | 'ovulation' | 'luteal';
//   currentDay: number;
//   cycleLength: number;
//   lastPeriodDate: string;
//   nextPeriodDate: string;
//   averageCycleLength: number;
//   periodLength: number;
// }

// export interface DailyLog {
//   date: string;
//   mood: 'happy' | 'neutral' | 'sad';
//   energy: number;
//   sleep: number;
//   symptoms: string[];
//   notes: string;
// }

// export interface HealthMetrics {
//   water: number;
//   exercise: number;
//   sleep: number;
//   stress: number;
// }

// const getInitialCycleStats = (): CycleStats => {
//   if (typeof window === 'undefined') return defaultCycleStats;
//   const stored = localStorage.getItem('cycleStats');
//   return stored ? JSON.parse(stored) : defaultCycleStats;
// };

// const getInitialDailyLogs = (): DailyLog[] => {
//   if (typeof window === 'undefined') return defaultDailyLogs;
//   const stored = localStorage.getItem('dailyLogs');
//   return stored ? JSON.parse(stored) : defaultDailyLogs;
// };

// const getInitialHealthMetrics = (): HealthMetrics => {
//   if (typeof window === 'undefined') return defaultHealthMetrics;
//   const stored = localStorage.getItem('healthMetrics');
//   return stored ? JSON.parse(stored) : defaultHealthMetrics;
// };

// export const cycleStatsState = atom<CycleStats>({
//   key: 'cycleStatsState',
//   default: getInitialCycleStats(),
//   effects: [
//     ({ onSet }) => {
//       onSet((newValue) => {
//         if (typeof window === 'undefined') return;
//         localStorage.setItem('cycleStats', JSON.stringify(newValue));
//       });
//     },
//   ],
// });

// export const dailyLogsState = atom<DailyLog[]>({
//   key: 'dailyLogsState',
//   default: getInitialDailyLogs(),
//   effects: [
//     ({ onSet }) => {
//       onSet((newValue) => {
//         if (typeof window === 'undefined') return;
//         localStorage.setItem('dailyLogs', JSON.stringify(newValue));
//       });
//     },
//   ],
// });

// export const healthMetricsState = atom<HealthMetrics>({
//   key: 'healthMetricsState',
//   default: getInitialHealthMetrics(),
//   effects: [
//     ({ onSet }) => {
//       onSet((newValue) => {
//         if (typeof window === 'undefined') return;
//         localStorage.setItem('healthMetrics', JSON.stringify(newValue));
//       });
//     },
//   ],
// });

// // Default values for initial state
// const defaultCycleStats: CycleStats = {
//   currentPhase: 'follicular',
//   currentDay: 7,
//   cycleLength: 28,
//   lastPeriodDate: '2024-03-01',
//   nextPeriodDate: '2024-03-29',
//   averageCycleLength: 28,
//   periodLength: 5,
// };

// const defaultDailyLogs: DailyLog[] = [
//   {
//     date: '2024-03-20',
//     mood: 'happy',
//     energy: 8,
//     sleep: 7.5,
//     symptoms: ['mild cramps', 'headache'],
//     notes: 'Feeling good overall today',
//   },
//   {
//     date: '2024-03-19',
//     mood: 'neutral',
//     energy: 6,
//     sleep: 6.5,
//     symptoms: ['fatigue'],
//     notes: 'Tired but managing',
//   },
//   // Add more default logs as needed
// ];

// const defaultHealthMetrics: HealthMetrics = {
//   water: 6,
//   exercise: 30,
//   sleep: 7.5,
//   stress: 4,
// };

import { atom } from 'recoil';

export interface CycleStats {
  currentPhase: 'menstrual' | 'follicular' | 'ovulation' | 'luteal';
  currentDay: number;
  cycleLength: number;
  lastPeriodDate: string;
  nextPeriodDate: string;
  averageCycleLength: number;
  periodLength: number;
}

export interface DailyLog {
  date: string;
  mood: 'happy' | 'neutral' | 'sad';
  energy: number;
  sleep: number;
  symptoms: string[];
  notes: string;
}

export interface HealthMetrics {
  water: number;
  exercise: number;
  sleep: number;
  stress: number;
}

// Dynamic default values
const getDefaultCycleStats = (): CycleStats => ({
  currentPhase: 'follicular',
  currentDay: 7,
  cycleLength: 28,
  lastPeriodDate: new Date().toISOString().split('T')[0],
  nextPeriodDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0],
  averageCycleLength: 28,
  periodLength: 5,
});

const getDefaultDailyLogs = (): DailyLog[] => [
  {
    date: new Date().toISOString().split('T')[0],
    mood: 'neutral',
    energy: 6,
    sleep: 7,
    symptoms: [],
    notes: 'Dynamically generated log for today.',
  },
];

const getDefaultHealthMetrics = (): HealthMetrics => ({
  water: 8,
  exercise: 30,
  sleep: 7,
  stress: 5,
});

const getInitialCycleStats = (): CycleStats => {
  if (typeof window === 'undefined') return getDefaultCycleStats();
  const stored = localStorage.getItem('cycleStats');
  return stored ? JSON.parse(stored) : getDefaultCycleStats();
};

const getInitialDailyLogs = (): DailyLog[] => {
  if (typeof window === 'undefined') return getDefaultDailyLogs();
  const stored = localStorage.getItem('dailyLogs');
  return stored ? JSON.parse(stored) : getDefaultDailyLogs();
};

const getInitialHealthMetrics = (): HealthMetrics => {
  if (typeof window === 'undefined') return getDefaultHealthMetrics();
  const stored = localStorage.getItem('healthMetrics');
  return stored ? JSON.parse(stored) : getDefaultHealthMetrics();
};

export const cycleStatsState = atom<CycleStats>({
  key: 'cycleStatsState',
  default: getInitialCycleStats(),
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem('cycleStats', JSON.stringify(newValue));
      });
    },
  ],
});

export const dailyLogsState = atom<DailyLog[]>({
  key: 'dailyLogsState',
  default: getInitialDailyLogs(),
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem('dailyLogs', JSON.stringify(newValue));
      });
    },
  ],
});

export const healthMetricsState = atom<HealthMetrics>({
  key: 'healthMetricsState',
  default: getInitialHealthMetrics(),
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        if (typeof window === 'undefined') return;
        localStorage.setItem('healthMetrics', JSON.stringify(newValue));
      });
    },
  ],
});
