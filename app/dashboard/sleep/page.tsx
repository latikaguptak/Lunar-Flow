"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Moon, Sun, Clock, Plus } from "lucide-react";
import { sleepEntriesState } from "@/app/recoil/atoms/sleep";
import { LogSleepDialog } from "../components/sleep/log-sleep-dialog";

export default function SleepPage() {
  const [showLogDialog, setShowLogDialog] = useState(false);
  const sleepEntries = useRecoilValue(sleepEntriesState);

  const chartData = sleepEntries
    .slice(-7)
    .map(entry => ({
      date: entry.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      hours: entry.hours,
      quality: entry.quality,
    }))
    .reverse();

  const latestEntry = sleepEntries[sleepEntries.length - 1];

  const sleepMetrics = [
    {
      icon: Clock,
      title: "Average Sleep Duration",
      value: `${(sleepEntries.reduce((acc, entry) => acc + entry.hours, 0) / Math.max(sleepEntries.length, 1)).toFixed(1)} hours`,
      change: latestEntry ? `Last: ${latestEntry.hours} hours` : "No data",
      trend: "neutral",
    },
    {
      icon: Moon,
      title: "Sleep Quality",
      value: latestEntry ? `${latestEntry.quality}/10` : "No data",
      change: "Based on last entry",
      trend: "neutral",
    },
    {
      icon: Sun,
      title: "Wake-up Time",
      value: latestEntry?.wakeUpTime || "No data",
      change: latestEntry ? `Bedtime: ${latestEntry.bedTime}` : "No data",
      trend: "neutral",
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8"
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Sleep Tracking</h2>
        <Button onClick={() => setShowLogDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Log Sleep
        </Button>
      </div>

      <div className="grid gap-8">
        <div className="grid gap-4 md:grid-cols-3">
          {sleepMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {metric.title}
                  </CardTitle>
                  <metric.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {metric.change}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sleep Patterns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" />
                  <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--secondary))" />
                  <Tooltip />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="hours" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Sleep Duration"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="quality" 
                    stroke="hsl(var(--secondary))" 
                    strokeWidth={2}
                    name="Sleep Quality"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Latest Sleep Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {latestEntry ? (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Bedtime</span>
                      <span className="text-sm text-muted-foreground">{latestEntry.bedTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Wake-up Time</span>
                      <span className="text-sm text-muted-foreground">{latestEntry.wakeUpTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Sleep</span>
                      <span className="text-sm text-muted-foreground">{latestEntry.hours} hours</span>
                    </div>
                    {latestEntry.notes && (
                      <div className="pt-4 border-t">
                        <p className="text-sm font-medium">Notes</p>
                        <p className="text-sm text-muted-foreground">{latestEntry.notes}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">No sleep data recorded yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sleep Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Based on your cycle phase:
                </p>
                <ul className="space-y-2">
                  <li className="text-sm">• Maintain a consistent sleep schedule</li>
                  <li className="text-sm">• Create a relaxing bedtime routine</li>
                  <li className="text-sm">• Keep your bedroom cool and dark</li>
                  <li className="text-sm">• Avoid screens before bedtime</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <LogSleepDialog 
        isOpen={showLogDialog} 
        onClose={() => setShowLogDialog(false)} 
      />
    </motion.div>
  );
}