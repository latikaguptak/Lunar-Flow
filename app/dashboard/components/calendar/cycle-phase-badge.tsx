'use client';

import { Badge } from '@/components/ui/badge';
import { Droplet, Moon, Sun, Sparkles } from 'lucide-react';

export const phaseConfig = {
  menstrual: {
    icon: Droplet,
    color: 'bg-primary/20 hover:bg-primary/30',
    label: 'Menstrual'
  },
  follicular: {
    icon: Sun,
    color: 'bg-blue-200/20 hover:bg-blue-200/30',
    label: 'Follicular'
  },
  ovulation: {
    icon: Sparkles,
    color: 'bg-yellow-200/20 hover:bg-yellow-200/30',
    label: 'Ovulation'
  },
  luteal: {
    icon: Moon,
    color: 'bg-purple-200/20 hover:bg-purple-200/30',
    label: 'Luteal'
  }
} as const;

interface CyclePhaseBadgeProps {
  phase: keyof typeof phaseConfig;
  showLabel?: boolean;
}

export function CyclePhaseBadge({ phase, showLabel = true }: CyclePhaseBadgeProps) {
  const { icon: Icon, color, label } = phaseConfig[phase];
  
  return (
    <Badge
      variant="outline"
      className={`${color} flex items-center gap-1`}
    >
      <Icon className="h-3 w-3" />
      {showLabel && <span className="capitalize">{label}</span>}
    </Badge>
  );
}