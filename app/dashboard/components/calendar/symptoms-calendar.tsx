import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedCalendar } from './enhanced-calendar';

interface SymptomsCalendarProps {
  date?: Date;
  onDateChange: (date: Date | undefined) => void;
}

export function SymptomsCalendar({
  date,
  onDateChange,
}: SymptomsCalendarProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Symptom Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <EnhancedCalendar
          date={date}
          onDateChange={onDateChange}
          tooltipText="Track and monitor your symptoms by date. Click to log physical and emotional symptoms, or view previously recorded symptoms."
          calendarType="symptoms"
        />
      </CardContent>
    </Card>
  );
}
