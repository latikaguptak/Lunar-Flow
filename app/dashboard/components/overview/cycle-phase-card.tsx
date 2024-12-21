'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Moon, Sun, Droplet, Sparkles } from 'lucide-react';

interface CyclePhaseCardProps {
  phase: string;
  day: number;
  totalDays: number;
  nextEvent: string;
  daysUntilNext: number;
}

const phaseIcons = {
  menstrual: Droplet,
  follicular: Sun,
  ovulation: Sparkles,
  luteal: Moon,
};

export function CyclePhaseCard({ phase, day, totalDays, nextEvent, daysUntilNext }: CyclePhaseCardProps) {
  const Icon = phaseIcons[phase as keyof typeof phaseIcons];
  const progress = (day / totalDays) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="relative overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary" />
            <span className="capitalize">{phase} Phase</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Day {day} of {totalDays}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Next: {nextEvent}</p>
              <p className="text-sm font-medium text-primary">
                in {daysUntilNext} days
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}