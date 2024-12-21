'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedCycleCalendar } from '../components/calendar/enhanced-cycle-calendar';

export default function CalendarPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8"
    >
      <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Cycle Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <EnhancedCycleCalendar />
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Next Important Dates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Next Period</p>
                <p className="text-2xl font-bold text-primary">In 14 days</p>
              </div>
              <div>
                <p className="text-sm font-medium">Fertile Window</p>
                <p className="text-2xl font-bold text-secondary">In 7 days</p>
              </div>
              <div>
                <p className="text-sm font-medium">Ovulation Day</p>
                <p className="text-2xl font-bold text-yellow-500">In 9 days</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cycle Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">Average Cycle Length</p>
                <p className="text-2xl font-bold">28 days</p>
              </div>
              <div>
                <p className="text-sm font-medium">Average Period Length</p>
                <p className="text-2xl font-bold">5 days</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
