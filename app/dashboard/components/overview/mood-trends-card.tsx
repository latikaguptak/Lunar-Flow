'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useRecoilValue } from 'recoil';
import { dailyLogsState } from '@/app/recoil/atoms/overview';

export function MoodTrendsCard() {
  const dailyLogs = useRecoilValue(dailyLogsState);

  const moodToNumber = (mood: 'happy' | 'neutral' | 'sad'): number => {
    switch (mood) {
      case 'happy': return 3;
      case 'neutral': return 2;
      case 'sad': return 1;
    }
  };

  const chartData = dailyLogs.map(log => ({
    date: new Date(log.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    mood: moodToNumber(log.mood),
    energy: log.energy,
    sleep: log.sleep,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Mood & Energy Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Mood"
                />
                <Line 
                  type="monotone" 
                  dataKey="energy" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={2}
                  name="Energy"
                />
                <Line 
                  type="monotone" 
                  dataKey="sleep" 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeWidth={2}
                  name="Sleep"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}