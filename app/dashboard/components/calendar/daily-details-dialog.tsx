// 'use client';

// import { useRecoilValue, useSetRecoilState } from 'recoil';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Slider } from "@/components/ui/slider";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import { useEffect, useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import { toast } from 'sonner';
// import { cycleLogsState, type CycleLog } from '@/app/recoil/atoms/cycle';
// import { getLogForDateSelector } from '@/app/recoil/selectors/cycle';
// import { format, isSameDay } from 'date-fns';
// import { Card, CardContent } from '@/components/ui/card';
// import { Droplet, Heart, Moon, Activity, Calendar } from "lucide-react";

// interface DailyDetailsDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   date: Date;
//   cycleDay: number;
//   cyclePhase?: {
//     label: string;
//     color: string;
//   };
// }

// const defaultValues = {
//   flow: 'medium' as CycleLog['flow'],
//   temperature: 36.5,
//   energy: 5,
//   notes: '',
//   mood: 'neutral' as CycleLog['mood'],
//   cycleLength: 28,
//   periodLength: 5
// };

// export function DailyDetailsDialog({
//   isOpen,
//   onClose,
//   date,
//   cycleDay,
//   cyclePhase
// }: DailyDetailsDialogProps) {
//   const getLogForDate = useRecoilValue(getLogForDateSelector);
//   const setCycleLogs = useSetRecoilState(cycleLogsState);
//   const existingLog = getLogForDate(date);

//   const [flow, setFlow] = useState<CycleLog['flow']>(defaultValues.flow);
//   const [temperature, setTemperature] = useState(defaultValues.temperature);
//   const [energy, setEnergy] = useState(defaultValues.energy);
//   const [notes, setNotes] = useState(defaultValues.notes);
//   const [mood, setMood] = useState<CycleLog['mood']>(defaultValues.mood);
//   const [cycleLength, setCycleLength] = useState(defaultValues.cycleLength);
//   const [periodLength, setPeriodLength] = useState(defaultValues.periodLength);
//   const [isEditing, setIsEditing] = useState(!existingLog);

//   useEffect(() => {
//     if (existingLog) {
//       setFlow(existingLog.flow);
//       setTemperature(existingLog.temperature || defaultValues.temperature);
//       setEnergy(existingLog.energy);
//       setNotes(existingLog.notes || '');
//       setMood(existingLog.mood);
//       setCycleLength(existingLog.cycleLength);
//       setPeriodLength(existingLog.periodLength);
//       setIsEditing(false);
//     } else {
//       resetForm();
//       setIsEditing(true);
//     }
//   }, [existingLog, date]);

//   const resetForm = () => {
//     setFlow(defaultValues.flow);
//     setTemperature(defaultValues.temperature);
//     setEnergy(defaultValues.energy);
//     setNotes(defaultValues.notes);
//     setMood(defaultValues.mood);
//     setCycleLength(defaultValues.cycleLength);
//     setPeriodLength(defaultValues.periodLength);
//   };

//   const handleSave = () => {
//     const newLog: CycleLog = {
//       id: existingLog?.id || uuidv4(),
//       date,
//       flow,
//       symptoms: existingLog?.symptoms || [],
//       mood,
//       temperature,
//       energy,
//       notes: notes.trim(),
//       cycleDay,
//       cycleLength,
//       periodLength,
//       ovulationDay: Math.floor(cycleLength / 2),
//       fertileWindowStart: Math.floor(cycleLength / 2) - 5,
//       fertileWindowEnd: Math.floor(cycleLength / 2) + 4
//     };

//     setCycleLogs((currentLogs) => {
//       const filtered = currentLogs.filter(log => !isSameDay(log.date, date));
//       return [...filtered, newLog];
//     });

//     toast.success('Cycle data saved successfully!');
//     setIsEditing(false);
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="max-w-2xl">
//         <DialogHeader>
//           <DialogTitle>{format(date, 'MMMM d, yyyy')}</DialogTitle>
//           {cyclePhase && (
//             <p className="text-sm text-muted-foreground mt-2">
//               {cyclePhase.label} - Day {cycleDay}
//             </p>
//           )}
//         </DialogHeader>

//         {isEditing ? (
//           <div className="grid gap-6 py-4">
//             <div className="space-y-2">
//               <Label>Flow Intensity</Label>
//               <RadioGroup value={flow} onValueChange={(value: CycleLog['flow']) => setFlow(value)}>
//                 <div className="flex gap-4">
//                   {['light', 'medium', 'heavy'].map((option) => (
//                     <div key={option} className="flex items-center space-x-2">
//                       <RadioGroupItem value={option} id={option} />
//                       <Label htmlFor={option} className="capitalize">{option}</Label>
//                     </div>
//                   ))}
//                 </div>
//               </RadioGroup>
//             </div>

//             <div className="grid gap-4 grid-cols-2">
//               <div className="space-y-2">
//                 <Label>Cycle Length (days)</Label>
//                 <Input
//                   type="number"
//                   min={21}
//                   max={35}
//                   value={cycleLength}
//                   onChange={(e) => setCycleLength(parseInt(e.target.value))}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label>Period Length (days)</Label>
//                 <Input
//                   type="number"
//                   min={3}
//                   max={7}
//                   value={periodLength}
//                   onChange={(e) => setPeriodLength(parseInt(e.target.value))}
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label>Temperature (°C)</Label>
//               <Slider
//                 min={35.0}
//                 max={42.0}
//                 step={0.1}
//                 value={[temperature]}
//                 onValueChange={(value) => setTemperature(value[0])}
//               />
//               <div className="text-right text-sm text-muted-foreground">
//                 {temperature.toFixed(1)}°C
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label>Energy Level (1-10)</Label>
//               <Slider
//                 min={1}
//                 max={10}
//                 step={1}
//                 value={[energy]}
//                 onValueChange={(value) => setEnergy(value[0])}
//               />
//               <div className="text-right text-sm text-muted-foreground">
//                 Level {energy}
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label>Mood</Label>
//               <RadioGroup value={mood} onValueChange={(value: CycleLog['mood']) => setMood(value)}>
//                 <div className="flex gap-4">
//                   {['happy', 'neutral', 'sad'].map((option) => (
//                     <div key={option} className="flex items-center space-x-2">
//                       <RadioGroupItem value={option} id={`mood-${option}`} />
//                       <Label htmlFor={`mood-${option}`} className="capitalize">{option}</Label>
//                     </div>
//                   ))}
//                 </div>
//               </RadioGroup>
//             </div>

//             <div className="space-y-2">
//               <Label>Notes</Label>
//               <Textarea
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//                 placeholder="Add any additional notes..."
//               />
//             </div>

//             <div className="flex justify-end space-x-4">
//               {existingLog && (
//                 <Button variant="outline" onClick={() => setIsEditing(false)}>
//                   Cancel
//                 </Button>
//               )}
//               <Button onClick={handleSave}>
//                 Save
//               </Button>
//             </div>
//           </div>
//         ) : (
//           <div className="space-y-6 py-4">
//             <Card>
//               <CardContent className="pt-6">
//                 <div className="space-y-4">
//                   <div className="flex items-center gap-2">
//                     <Droplet className="h-4 w-4 text-primary" />
//                     <span className="capitalize">Flow: {existingLog?.flow}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Calendar className="h-4 w-4 text-primary" />
//                     <span>Cycle Length: {existingLog?.cycleLength} days</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Activity className="h-4 w-4 text-primary" />
//                     <span>Energy Level: {existingLog?.energy}</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Heart className="h-4 w-4 text-primary" />
//                     <span className="capitalize">Mood: {existingLog?.mood}</span>
//                   </div>
//                   {existingLog?.temperature && (
//                     <div className="flex items-center gap-2">
//                       <Moon className="h-4 w-4 text-primary" />
//                       <span>Temperature: {existingLog.temperature.toFixed(1)}°C</span>
//                     </div>
//                   )}
//                   {existingLog?.notes && (
//                     <div className="flex items-center gap-2">
//                       <Moon className="h-4 w-4 text-primary" />
//                       <span>Notes: {existingLog.notes}</span>
//                     </div>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//             <div className="flex justify-end">
//               <Button onClick={() => setIsEditing(true)}>
//                 Edit Entry
//               </Button>
//             </div>
//           </div>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// }

'use client';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { cycleLogsState, type CycleLog } from '@/app/recoil/atoms/cycle';
import { getLogForDateSelector } from '@/app/recoil/selectors/cycle';
import { format, isSameDay } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Droplet, Heart, Moon, Activity, Calendar } from 'lucide-react';

interface DailyDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  cycleDay: number;
  cyclePhase?: {
    label: string;
    color: string;
  }; // matches return from getCurrentPhase
}

const defaultValues = {
  flow: 'medium' as CycleLog['flow'],
  temperature: 36.5,
  energy: 5,
  notes: '',
  mood: 'neutral' as CycleLog['mood'],
  cycleLength: 28,
  periodLength: 5,
};

export function DailyDetailsDialog({
  isOpen,
  onClose,
  date,
  cycleDay,
  cyclePhase,
}: DailyDetailsDialogProps) {
  const getLogForDate = useRecoilValue(getLogForDateSelector);
  const setCycleLogs = useSetRecoilState(cycleLogsState);
  const existingLog = getLogForDate(date);

  const [flow, setFlow] = useState<CycleLog['flow']>(defaultValues.flow);
  const [temperature, setTemperature] = useState(defaultValues.temperature);
  const [energy, setEnergy] = useState(defaultValues.energy);
  const [notes, setNotes] = useState(defaultValues.notes);
  const [mood, setMood] = useState<CycleLog['mood']>(defaultValues.mood);
  const [cycleLength, setCycleLength] = useState(defaultValues.cycleLength);
  const [periodLength, setPeriodLength] = useState(defaultValues.periodLength);
  const [isEditing, setIsEditing] = useState(!existingLog);

  useEffect(() => {
    if (existingLog) {
      setFlow(existingLog.flow);
      setTemperature(existingLog.temperature || defaultValues.temperature);
      setEnergy(existingLog.energy);
      setNotes(existingLog.notes || '');
      setMood(existingLog.mood);
      setCycleLength(existingLog.cycleLength);
      setPeriodLength(existingLog.periodLength);
      setIsEditing(false);
    } else {
      resetForm();
      setIsEditing(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingLog, date]);

  const resetForm = () => {
    setFlow(defaultValues.flow);
    setTemperature(defaultValues.temperature);
    setEnergy(defaultValues.energy);
    setNotes(defaultValues.notes);
    setMood(defaultValues.mood);
    setCycleLength(defaultValues.cycleLength);
    setPeriodLength(defaultValues.periodLength);
  };

  const handleSave = () => {
    const newLog: CycleLog = {
      id: existingLog?.id || uuidv4(),
      date,
      flow,
      symptoms: existingLog?.symptoms || [],
      mood,
      temperature,
      energy,
      notes: notes.trim(),
      cycleDay,
      cycleLength,
      periodLength,
      ovulationDay: Math.floor(cycleLength / 2),
      fertileWindowStart: Math.floor(cycleLength / 2) - 5,
      fertileWindowEnd: Math.floor(cycleLength / 2) + 4,
    };

    // Replace existing log for this date, or add new
    setCycleLogs((currentLogs) => {
      const filtered = currentLogs.filter((log) => !isSameDay(log.date, date));
      return [...filtered, newLog];
    });

    toast.success('Cycle data saved successfully!');
    setIsEditing(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{format(date, 'MMMM d, yyyy')}</DialogTitle>
          {cyclePhase && (
            <p className="text-sm text-muted-foreground mt-2">
              {cyclePhase.label} — Day {cycleDay}
            </p>
          )}
        </DialogHeader>

        {isEditing ? (
          <div className="grid gap-6 py-4">
            {/* Flow */}
            <div className="space-y-2">
              <Label>Flow Intensity</Label>
              <RadioGroup
                value={flow}
                onValueChange={(value: CycleLog['flow']) => setFlow(value)}
              >
                <div className="flex gap-4">
                  {['light', 'medium', 'heavy'].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="capitalize">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Cycle Length & Period Length */}
            <div className="grid gap-4 grid-cols-2">
              <div className="space-y-2">
                <Label>Cycle Length (days)</Label>
                <Input
                  type="number"
                  min={21}
                  max={35}
                  value={cycleLength}
                  onChange={(e) => setCycleLength(parseInt(e.target.value, 10))}
                />
              </div>
              <div className="space-y-2">
                <Label>Period Length (days)</Label>
                <Input
                  type="number"
                  min={3}
                  max={7}
                  value={periodLength}
                  onChange={(e) =>
                    setPeriodLength(parseInt(e.target.value, 10))
                  }
                />
              </div>
            </div>

            {/* Temperature Slider */}
            <div className="space-y-2">
              <Label>Temperature (°C)</Label>
              <Slider
                min={35.0}
                max={42.0}
                step={0.1}
                value={[temperature]}
                onValueChange={(value) => setTemperature(value[0])}
              />
              <div className="text-right text-sm text-muted-foreground">
                {temperature.toFixed(1)}°C
              </div>
            </div>

            {/* Energy Slider */}
            <div className="space-y-2">
              <Label>Energy Level (1-10)</Label>
              <Slider
                min={1}
                max={10}
                step={1}
                value={[energy]}
                onValueChange={(value) => setEnergy(value[0])}
              />
              <div className="text-right text-sm text-muted-foreground">
                Level {energy}
              </div>
            </div>

            {/* Mood */}
            <div className="space-y-2">
              <Label>Mood</Label>
              <RadioGroup
                value={mood}
                onValueChange={(value: CycleLog['mood']) => setMood(value)}
              >
                <div className="flex gap-4">
                  {['happy', 'neutral', 'sad'].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`mood-${option}`} />
                      <Label htmlFor={`mood-${option}`} className="capitalize">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any additional notes..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              {existingLog && (
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              )}
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
        ) : (
          // View Mode (when not editing)
          <div className="space-y-6 py-4">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Droplet className="h-4 w-4 text-primary" />
                    <span className="capitalize">
                      Flow: {existingLog?.flow}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>Cycle Length: {existingLog?.cycleLength} days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-primary" />
                    <span>Energy Level: {existingLog?.energy}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-primary" />
                    <span className="capitalize">
                      Mood: {existingLog?.mood}
                    </span>
                  </div>
                  {existingLog?.temperature && (
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4 text-primary" />
                      <span>
                        Temperature: {existingLog.temperature.toFixed(1)}°C
                      </span>
                    </div>
                  )}
                  {existingLog?.notes && (
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4 text-primary" />
                      <span>Notes: {existingLog.notes}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={() => setIsEditing(true)}>Edit Entry</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
