'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { JournalCalendar } from '../components/calendar/journal-calendar';
import { sortedJournalEntriesSelector } from '@/app/recoil/selectors/journal';
import { MoodIcon } from '../components/journal/components/mood-icon';
import { formatJournalDate } from '@/lib/date-utils';
import { JournalEntryDialog } from '../components/journal/journal-entry-dialog';

export default function JournalPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showEntryDialog, setShowEntryDialog] = useState(false);
  const sortedEntries = useRecoilValue(sortedJournalEntriesSelector);

  const handleNewEntry = () => {
    setDate(new Date());
    setShowEntryDialog(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8"
    >
      <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
        <div>
          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-3xl font-bold">Journal Entries</h2>
            <Button onClick={handleNewEntry}>
              <Plus className="mr-2 h-4 w-4" />
              New Entry
            </Button>
          </div>

          <div className="grid gap-6">
            {sortedEntries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {formatJournalDate(entry.date)}
                    </CardTitle>
                    <MoodIcon mood={entry.mood} />
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold mb-2">{entry.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {entry.content}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <JournalCalendar date={date} onDateChange={setDate} />
        </div>
      </div>

      {date && (
        <JournalEntryDialog
          isOpen={showEntryDialog}
          onClose={() => setShowEntryDialog(false)}
          date={date}
        />
      )}
    </motion.div>
  );
}