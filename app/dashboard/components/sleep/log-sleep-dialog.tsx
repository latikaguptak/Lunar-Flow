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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { sleepEntriesState } from '@/app/recoil/atoms/sleep';

interface LogSleepDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LogSleepDialog({ isOpen, onClose }: LogSleepDialogProps) {
  const [hours, setHours] = useState(7);
  const [quality, setQuality] = useState(7);
  const [bedTime, setBedTime] = useState('22:00');
  const [wakeUpTime, setWakeUpTime] = useState('07:00');
  const [notes, setNotes] = useState('');
  const setSleepEntries = useSetRecoilState(sleepEntriesState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setSleepEntries((current) => [
      ...current,
      {
        id: uuidv4(),
        date: new Date(),
        hours,
        quality,
        bedTime,
        wakeUpTime,
        notes: notes.trim() || undefined,
      },
    ]);

    toast.success('Sleep data logged successfully!');
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setHours(7);
    setQuality(7);
    setBedTime('22:00');
    setWakeUpTime('07:00');
    setNotes('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log Sleep</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Sleep Duration (hours)</Label>
            <Slider
              min={0}
              max={12}
              step={0.5}
              value={[hours]}
              onValueChange={(value) => setHours(value[0])}
            />
            <div className="text-right text-sm text-muted-foreground">
              {hours} hours
            </div>
          </div>

          <div className="space-y-2">
            <Label>Sleep Quality (1-10)</Label>
            <Slider
              min={1}
              max={10}
              step={1}
              value={[quality]}
              onValueChange={(value) => setQuality(value[0])}
            />
            <div className="text-right text-sm text-muted-foreground">
              {quality}/10
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Bedtime</Label>
              <Input
                type="time"
                value={bedTime}
                onChange={(e) => setBedTime(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Wake-up Time</Label>
              <Input
                type="time"
                value={wakeUpTime}
                onChange={(e) => setWakeUpTime(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Notes (optional)</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about your sleep..."
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}