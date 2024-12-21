'use client';

import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedCalendar } from './enhanced-calendar';
import { DailyDetailsDialog } from './daily-details-dialog';
import { getLogForDateSelector } from '@/app/recoil/selectors/cycle';
import { Badge } from '@/components/ui/badge';

interface CycleCalendarProps {
  date?: Date;
  onDateChange: (date: Date | undefined) => void;
}

interface CyclePhase {
  start: number;
  end: number;
  color: string;
  label: string;
}

// You can adapt these start/end ranges and colors to match your app’s logic
const cyclePhases: Record<string, CyclePhase> = {
  menstrual: {
    start: 1,
    end: 5,
    color: 'hsl(var(--primary))',
    label: 'Menstrual Phase',
  },
  follicular: {
    start: 6,
    end: 11,
    color: 'hsl(var(--secondary)/0.3)',
    label: 'Follicular Phase',
  },
  ovulation: {
    start: 12,
    end: 16,
    color: 'hsl(var(--secondary))',
    label: 'Ovulation Phase',
  },
  luteal: {
    start: 17,
    end: 28,
    color: 'hsl(var(--secondary)/0.2)',
    label: 'Luteal Phase',
  },
};

export function CycleCalendar({ date, onDateChange }: CycleCalendarProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(date);

  // Recoil selector that returns a CycleLog for a given date, if any
  const getLogForDate = useRecoilValue(getLogForDateSelector);

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setSelectedDate(newDate);
      setShowDetails(true);
    }
    onDateChange(newDate);
  };

  // Return a background color based on the log.flow (light, medium, heavy)
  const getDayClassNames = (currentDate: Date) => {
    const log = getLogForDate(currentDate);
    if (!log) return '';

    const flowColors: Record<string, string> = {
      light: 'bg-primary/20',
      medium: 'bg-primary/50',
      heavy: 'bg-primary/80',
    };
    return flowColors[log.flow] ?? '';
  };

  // Provide a tooltip containing flow/mood/notes info
  const getDayTooltip = (currentDate: Date) => {
    const log = getLogForDate(currentDate);
    if (!log) return 'Click to add cycle data';

    return `Flow: ${log.flow}\nEnergy: ${log.energy}\nMood: ${log.mood}${
      log.notes ? `\nNotes: ${log.notes}` : ''
    }`;
  };

  /**
   * Return the current cycle phase or undefined if not found/none
   */
  const getCurrentPhase = (
    currentDate: Date
  ): { label: string; color: string } | undefined => {
    const log = getLogForDate(currentDate);
    if (!log) return undefined; // no log, no phase

    // Simplistic approach: use the day of the month as the "cycle day"
    const cycleDay = currentDate.getDate();

    // Find the phase that matches the cycleDay range
    const phaseEntry = Object.entries(cyclePhases).find(
      ([_, phase]) => cycleDay >= phase.start && cycleDay <= phase.end
    );
    // If found, return { label, color }; else undefined
    return phaseEntry
      ? { label: phaseEntry[1].label, color: phaseEntry[1].color }
      : undefined;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cycle Calendar</CardTitle>
        <div className="flex flex-wrap gap-2 mt-2">
          {Object.entries(cyclePhases).map(([key, phase]) => (
            <Badge
              key={key}
              variant="outline"
              style={{ backgroundColor: phase.color }}
            >
              {phase.label}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <EnhancedCalendar
          // Use the local selectedDate or the prop-based date
          date={selectedDate}
          onDateChange={handleDateSelect}
          getDayClassNames={getDayClassNames}
          getDayTooltip={getDayTooltip}
          tooltipText="Click any date to log or view cycle data"
        />

        {selectedDate && (
          <DailyDetailsDialog
            isOpen={showDetails}
            onClose={() => setShowDetails(false)}
            date={selectedDate}
            cycleDay={selectedDate.getDate()}
            cyclePhase={getCurrentPhase(selectedDate)} // Now returns either { label, color } or undefined
          />
        )}
      </CardContent>
    </Card>
  );
}
