'use client';

import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { symptomsState } from '@/app/recoil/atoms/symptoms';
import {
  PHYSICAL_SYMPTOMS,
  EMOTIONAL_SYMPTOMS,
  type SymptomSeverity,
} from '@/types/symptoms';

interface LogSymptomsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
}

export function LogSymptomsDialog({
  isOpen,
  onClose,
  selectedDate,
}: LogSymptomsDialogProps) {
  const [physicalSymptoms, setPhysicalSymptoms] = useState<
    Record<string, { severity: SymptomSeverity }>
  >({});
  const [emotionalSymptoms, setEmotionalSymptoms] = useState<
    Record<string, { severity: SymptomSeverity }>
  >({});
  const [notes, setNotes] = useState('');
  const setSymptoms = useSetRecoilState(symptomsState);

  const handleSeverityChange = (
    category: 'physical' | 'emotional',
    symptom: string,
    severity: SymptomSeverity
  ) => {
    if (category === 'physical') {
      setPhysicalSymptoms((prev) => ({ ...prev, [symptom]: { severity } }));
    } else {
      setEmotionalSymptoms((prev) => ({ ...prev, [symptom]: { severity } }));
    }
  };

  const handleSubmit = () => {
    if (!selectedDate) return;
    setSymptoms((currentSymptoms) => [
      ...currentSymptoms,
      {
        id: uuidv4(),
        date: selectedDate,
        physical: physicalSymptoms,
        emotional: emotionalSymptoms,
        notes,
      },
    ]);
    toast.success('Symptoms logged successfully');
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setPhysicalSymptoms({});
    setEmotionalSymptoms({});
    setNotes('');
  };

  const renderSymptomButtons = (
    category: 'physical' | 'emotional',
    symptoms: typeof PHYSICAL_SYMPTOMS | typeof EMOTIONAL_SYMPTOMS
  ) => {
    const currentSymptoms =
      category === 'physical' ? physicalSymptoms : emotionalSymptoms;

    return Object.entries(symptoms).map(([key, label]) => (
      <div key={key} className="space-y-2">
        <Label>{label}</Label>
        <div className="flex flex-wrap gap-2">
          {(['mild', 'moderate', 'severe'] as const).map((severity) => (
            <Button
              key={severity}
              type="button"
              size="sm"
              variant={
                currentSymptoms[key]?.severity === severity
                  ? 'default'
                  : 'outline'
              }
              onClick={() => handleSeverityChange(category, key, severity)}
              className="capitalize"
            >
              {severity}
            </Button>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-w-2xl h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {selectedDate
              ? `Log Symptoms for ${selectedDate.toDateString()}`
              : 'Log Symptoms'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-semibold">Physical Symptoms</h3>
              {renderSymptomButtons('physical', PHYSICAL_SYMPTOMS)}
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Emotional Symptoms</h3>
              {renderSymptomButtons('emotional', EMOTIONAL_SYMPTOMS)}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Additional Notes</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes or observations..."
              className="min-h-[100px]"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save Symptoms</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
