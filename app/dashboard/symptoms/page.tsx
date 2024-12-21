'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { SymptomsCalendar } from '../components/calendar/symptoms-calendar';
import { LogSymptomsDialog } from '../components/symptoms/log-symptoms-dialog';
import { SymptomsDetailsDialog } from '../components/symptoms/symptoms-details-dialog';
import {
  getEntriesForDateSelector,
  recentSymptomsSelector,
} from '@/app/recoil/selectors/symptoms';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { PHYSICAL_SYMPTOMS, EMOTIONAL_SYMPTOMS } from '@/types/symptoms';

export default function SymptomsPage() {
  const [date, setDate] = useState<Date | null>(null);
  const [showLogDialog, setShowLogDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  // Use the selectorFamily by calling it like a function with `date`
  const entriesForDate = useRecoilValue(getEntriesForDateSelector(date));
  const recentSymptoms = useRecoilValue(recentSymptomsSelector);

  useEffect(() => {
    setDate(new Date());
  }, []);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!selectedDate) return;
    setDate(selectedDate);
  };

  // Whenever date or entriesForDate changes, show the appropriate dialog
  useEffect(() => {
    if (!date) return;

    if (entriesForDate.length > 0) {
      // If there are entries, show details
      setShowLogDialog(false);
      setShowDetailsDialog(true);
    } else {
      // If no entries, show log dialog
      setShowDetailsDialog(false);
      setShowLogDialog(true);
    }
  }, [date, entriesForDate]);

  if (!date) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8"
    >
      <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
        <div className="space-y-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Symptom Tracking</CardTitle>
              <Button size="sm" onClick={() => setShowLogDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Log Symptoms
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Track your physical and emotional symptoms throughout your
                cycle. Click on any date to log symptoms or view existing
                entries.
              </p>
              <div className="w-full">
                <SymptomsCalendar date={date} onDateChange={handleDateSelect} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Symptoms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSymptoms.map((entry) => (
                  <div
                    key={entry.id}
                    className="border-b pb-4 last:border-0 last:pb-0"
                  >
                    <p className="text-sm font-medium mb-2">
                      {format(entry.date, 'MMMM d, yyyy')}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(entry.physical).map(([key, value]) => (
                        <Badge key={key} variant="secondary">
                          {
                            PHYSICAL_SYMPTOMS[
                              key as keyof typeof PHYSICAL_SYMPTOMS
                            ]
                          }{' '}
                          ({value.severity})
                        </Badge>
                      ))}
                      {Object.entries(entry.emotional).map(([key, value]) => (
                        <Badge key={key} variant="outline">
                          {
                            EMOTIONAL_SYMPTOMS[
                              key as keyof typeof EMOTIONAL_SYMPTOMS
                            ]
                          }{' '}
                          ({value.severity})
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <LogSymptomsDialog
        isOpen={showLogDialog}
        onClose={() => {
          setShowLogDialog(false);
          // No need to manually open the details dialog here,
          // the effect will run again due to state changes.
        }}
        selectedDate={date}
      />

      <SymptomsDetailsDialog
        isOpen={showDetailsDialog}
        onClose={() => setShowDetailsDialog(false)}
        date={date}
      />
    </motion.div>
  );
}
