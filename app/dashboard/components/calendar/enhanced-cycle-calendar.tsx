'use client';

import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { motion } from 'framer-motion';
import { isSameDay, addDays } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { cycleTrackingState, type CycleDay } from '@/app/recoil/atoms/cycle-tracking';
import { CyclePhaseBadge, phaseConfig } from './cycle-phase-badge';
import { CycleDayDetails } from './cycle-day-details';

export function EnhancedCycleCalendar() {
  const [cycleData, setCycleData] = useRecoilState(cycleTrackingState);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getDayInfo = (date: Date): CycleDay | undefined => {
    return cycleData.cycles.find((day) => isSameDay(day.date, date));
  };

  const modifiers = {
    menstrual: (date: Date) => getDayInfo(date)?.phase === 'menstrual',
    follicular: (date: Date) => getDayInfo(date)?.phase === 'follicular',
    ovulation: (date: Date) => getDayInfo(date)?.phase === 'ovulation',
    luteal: (date: Date) => getDayInfo(date)?.phase === 'luteal',
  };

  const modifiersClassNames = {
    menstrual: phaseConfig.menstrual.color,
    follicular: phaseConfig.follicular.color,
    ovulation: phaseConfig.ovulation.color,
    luteal: phaseConfig.luteal.color,
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    
    if (isSameDay(date, cycleData.startDate)) {
      const newStartDate = date;
      setCycleData((prev) => ({
        ...prev,
        startDate: newStartDate,
        cycles: prev.cycles.map((day, index) => ({
          ...day,
          date: addDays(newStartDate, index),
        })),
      }));
    }
  };

  const selectedDayInfo = selectedDate ? getDayInfo(selectedDate) : undefined;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-wrap gap-2">
        {(Object.keys(phaseConfig) as Array<keyof typeof phaseConfig>).map((phase) => (
          <CyclePhaseBadge key={phase} phase={phase} />
        ))}
      </div>

      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        className="rounded-md border"
      />

      {selectedDayInfo && <CycleDayDetails dayInfo={selectedDayInfo} />}
    </motion.div>
  );
}