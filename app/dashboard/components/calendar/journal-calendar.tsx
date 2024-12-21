import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EnhancedCalendar } from "./enhanced-calendar";
import { JournalEntryDialog } from "../journal/journal-entry-dialog";
import { JournalEntriesDialog } from "../journal/journal-entries-dialog";

interface JournalCalendarProps {
  date?: Date;
  onDateChange: (date: Date | undefined) => void;
}

export function JournalCalendar({ date, onDateChange }: JournalCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [showEntryDialog, setShowEntryDialog] = useState(false);
  const [showEntriesDialog, setShowEntriesDialog] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setShowEntriesDialog(true);
    }
    onDateChange(date);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Journal Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <EnhancedCalendar
            date={date}
            onDateChange={handleDateSelect}
            tooltipText="Click on any date to view existing journal entries or add a new one. Track your moods, thoughts, and experiences."
            calendarType="journal"
          />
        </CardContent>
      </Card>

      {selectedDate && (
        <>
          <JournalEntriesDialog
            isOpen={showEntriesDialog}
            onClose={() => setShowEntriesDialog(false)}
            date={selectedDate}
            onNewEntry={() => {
              setShowEntriesDialog(false);
              setShowEntryDialog(true);
            }}
          />
          <JournalEntryDialog
            isOpen={showEntryDialog}
            onClose={() => setShowEntryDialog(false)}
            date={selectedDate}
          />
        </>
      )}
    </>
  );
}