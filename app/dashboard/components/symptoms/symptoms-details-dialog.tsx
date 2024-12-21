'use client';

import { useRecoilValue } from 'recoil';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { getEntriesForDateSelector } from '@/app/recoil/selectors/symptoms';
import {
  PHYSICAL_SYMPTOMS,
  EMOTIONAL_SYMPTOMS,
  type SymptomEntry,
} from '@/types/symptoms';

interface SymptomsDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
}

export function SymptomsDetailsDialog({
  isOpen,
  onClose,
  date,
}: SymptomsDetailsDialogProps) {
  const entries = useRecoilValue(getEntriesForDateSelector(date));

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'moderate':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'severe':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const renderSymptoms = (
    entry: SymptomEntry,
    category: 'physical' | 'emotional',
    symptoms: typeof PHYSICAL_SYMPTOMS | typeof EMOTIONAL_SYMPTOMS
  ) => {
    const categorySymptoms = entry[category];
    return Object.entries(symptoms).map(([key, label]) => {
      const symptom = categorySymptoms[key];
      if (!symptom) return null;

      return (
        <div key={key} className="flex items-center gap-2">
          <span className="text-sm">{label}:</span>
          <Badge
            className={getSeverityColor(symptom.severity)}
            variant="outline"
          >
            {symptom.severity}
          </Badge>
        </div>
      );
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {date ? `Symptoms for ${format(date, 'MMMM d, yyyy')}` : 'Symptoms'}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {entries.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No symptoms recorded for this date
            </p>
          ) : (
            entries.map((entry) => (
              <div key={entry.id} className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Physical Symptoms</h3>
                    <div className="space-y-2">
                      {renderSymptoms(entry, 'physical', PHYSICAL_SYMPTOMS)}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Emotional Symptoms</h3>
                    <div className="space-y-2">
                      {renderSymptoms(entry, 'emotional', EMOTIONAL_SYMPTOMS)}
                    </div>
                  </div>
                </div>

                {entry.notes && (
                  <div className="space-y-2">
                    <h3 className="font-semibold">Notes</h3>
                    <p className="text-sm text-muted-foreground">
                      {entry.notes}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
