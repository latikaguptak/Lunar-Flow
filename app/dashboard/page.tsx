'use client';

import { motion } from "framer-motion";
import { useRecoilValue } from 'recoil';
import { cycleStatsState } from '@/app/recoil/atoms/overview';
import { CyclePhaseCard } from "./components/overview/cycle-phase-card";
import { HealthMetricsCard } from "./components/overview/health-metrics-card";
import { MoodTrendsCard } from "./components/overview/mood-trends-card";

export default function DashboardPage() {
  const cycleStats = useRecoilValue(cycleStatsState);

  return (
    <div className="p-8 space-y-8">
      <motion.h1 
        className="text-3xl font-bold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Dashboard Overview
      </motion.h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <CyclePhaseCard
          phase={cycleStats.currentPhase}
          day={cycleStats.currentDay}
          totalDays={cycleStats.cycleLength}
          nextEvent="Period"
          daysUntilNext={21}
        />
        
        <HealthMetricsCard />

        <div className="md:col-span-2 lg:col-span-3">
          <MoodTrendsCard />
        </div>
      </div>
    </div>
  );
}