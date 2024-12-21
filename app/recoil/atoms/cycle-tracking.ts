import { atom } from 'recoil';
import { addDays, startOfDay } from 'date-fns';

export interface CycleDay {
  date: Date;
  phase: 'menstrual' | 'follicular' | 'ovulation' | 'luteal';
  flow?: 'light' | 'medium' | 'heavy';
  symptoms?: string[];
  notes?: string;
}

export interface CycleData {
  startDate: Date;
  cycleLength: number;
  periodLength: number;
  cycles: CycleDay[];
}

const calculatePhases = (startDate: Date, cycleLength: number, periodLength: number): CycleDay[] => {
  const days: CycleDay[] = [];
  const follicularStart = periodLength;
  const ovulationStart = Math.floor(cycleLength / 2) - 2;
  const lutealStart = Math.floor(cycleLength / 2) + 2;

  for (let i = 0; i < cycleLength; i++) {
    const date = addDays(startDate, i);
    let phase: CycleDay['phase'];

    if (i < periodLength) {
      phase = 'menstrual';
    } else if (i < ovulationStart) {
      phase = 'follicular';
    } else if (i < lutealStart) {
      phase = 'ovulation';
    } else {
      phase = 'luteal';
    }

    days.push({
      date,
      phase,
      flow: phase === 'menstrual' ? 'medium' : undefined,
    });
  }

  return days;
};

// Initialize with dummy data
const initialStartDate = startOfDay(new Date());
const initialCycleLength = 28;
const initialPeriodLength = 5;

export const cycleTrackingState = atom<CycleData>({
  key: 'cycleTrackingState',
  default: {
    startDate: initialStartDate,
    cycleLength: initialCycleLength,
    periodLength: initialPeriodLength,
    cycles: calculatePhases(initialStartDate, initialCycleLength, initialPeriodLength),
  },
});