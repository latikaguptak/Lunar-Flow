'use client';

import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Droplet } from 'lucide-react';
import { type CycleDay } from '@/app/recoil/atoms/cycle-tracking';
import { CyclePhaseBadge, phaseConfig } from './cycle-phase-badge';

interface CycleDayDetailsProps {
  dayInfo: CycleDay;
}

export function CycleDayDetails({ dayInfo }: CycleDayDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {format(dayInfo.date, 'MMMM d, yyyy')}
          <CyclePhaseBadge phase={dayInfo.phase} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {dayInfo.flow && (
            <div className="flex items-center gap-2">
              <Droplet className="h-4 w-4 text-primary" />
              <span className="capitalize">Flow: {dayInfo.flow}</span>
            </div>
          )}
          {dayInfo.symptoms && dayInfo.symptoms.length > 0 && (
            <div>
              <p className="font-medium">Symptoms:</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {dayInfo.symptoms.map((symptom) => (
                  <Badge key={symptom} variant="secondary">
                    {symptom}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {dayInfo.notes && (
            <div>
              <p className="font-medium">Notes:</p>
              <p className="text-muted-foreground">{dayInfo.notes}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}