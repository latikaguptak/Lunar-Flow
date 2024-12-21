'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Droplet, Heart, Moon, Brain } from 'lucide-react';
import { useRecoilValue } from 'recoil';
import { healthMetricsState } from '@/app/recoil/atoms/overview';

export function HealthMetricsCard() {
  const metrics = useRecoilValue(healthMetricsState);

  const metricConfigs = [
    {
      icon: Droplet,
      label: 'Water Intake',
      value: metrics.water,
      target: 8,
      unit: 'glasses',
      color: 'bg-blue-500',
    },
    {
      icon: Heart,
      label: 'Exercise',
      value: metrics.exercise,
      target: 60,
      unit: 'minutes',
      color: 'bg-red-500',
    },
    {
      icon: Moon,
      label: 'Sleep',
      value: metrics.sleep,
      target: 8,
      unit: 'hours',
      color: 'bg-indigo-500',
    },
    {
      icon: Brain,
      label: 'Stress Level',
      value: metrics.stress,
      target: 10,
      unit: 'level',
      color: 'bg-purple-500',
      inverse: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Daily Health Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {metricConfigs.map((metric, index) => {
            const progress = metric.inverse
              ? ((metric.target - metric.value) / metric.target) * 100
              : (metric.value / metric.target) * 100;

            return (
              <div key={metric.label} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <metric.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{metric.label}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {metric.value} / {metric.target} {metric.unit}
                  </span>
                </div>
                <Progress value={progress} className={`h-2 ${metric.color}`} />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </motion.div>
  );
}