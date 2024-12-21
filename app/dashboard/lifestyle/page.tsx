"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Droplet, Apple, Moon, Heart } from "lucide-react";
import { toast } from "sonner";
import { activitiesState, type Activity } from "@/app/recoil/atoms/lifestyle";

const lifestyleMetrics = [
  {
    icon: Droplet,
    title: "Water Intake",
    type: "water",
    current: 6,
    target: 8,
    unit: "glasses",
  },
  {
    icon: Apple,
    title: "Nutrition",
    type: "nutrition",
    current: 1800,
    target: 2000,
    unit: "calories",
  },
  {
    icon: Heart,
    title: "Exercise",
    type: "exercise",
    current: 35,
    target: 60,
    unit: "minutes",
  },
  {
    icon: Moon,
    title: "Sleep",
    type: "sleep",
    current: 7,
    target: 8,
    unit: "hours",
  },
];

export default function LifestylePage() {
  const [activities, setActivities] = useRecoilState(activitiesState);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedType, setSelectedType] = useState<Activity['type']>('water');
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!value) {
      toast.error('Please enter a value');
      return;
    }

    const newActivity: Activity = {
      id: uuidv4(),
      date: new Date(),
      type: selectedType,
      value: Number(value),
      notes: notes.trim() || undefined,
    };

    setActivities((current) => [...current, newActivity]);
    toast.success('Activity logged successfully!');
    setShowDialog(false);
    resetForm();
  };

  const resetForm = () => {
    setSelectedType('water');
    setValue('');
    setNotes('');
  };

  const getMetricWithActivity = (metric: typeof lifestyleMetrics[0]) => {
    const todayActivities = activities.filter(
      activity => 
        activity.type === metric.type && 
        activity.date.toDateString() === new Date().toDateString()
    );

    const totalValue = todayActivities.reduce((sum, activity) => sum + activity.value, 0);

    return {
      ...metric,
      current: totalValue || metric.current,
    };
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8"
    >
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-3xl font-bold">Lifestyle Tracking</h2>
        <Button onClick={() => setShowDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Log Activity
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {lifestyleMetrics.map((metric, index) => {
          const updatedMetric = getMetricWithActivity(metric);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {updatedMetric.title}
                  </CardTitle>
                  <metric.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {updatedMetric.current} / {updatedMetric.target}
                    <span className="text-sm font-normal text-muted-foreground ml-1">
                      {updatedMetric.unit}
                    </span>
                  </div>
                  <Progress
                    value={(updatedMetric.current / updatedMetric.target) * 100}
                    className="mt-2"
                  />
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log Activity</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Activity Type</Label>
              <Select value={selectedType} onValueChange={(value: Activity['type']) => setSelectedType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="water">Water Intake</SelectItem>
                  <SelectItem value="nutrition">Nutrition</SelectItem>
                  <SelectItem value="exercise">Exercise</SelectItem>
                  <SelectItem value="sleep">Sleep</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Value</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  step="0.1"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Enter value"
                />
                <span className="text-sm text-muted-foreground">
                  {lifestyleMetrics.find(m => m.type === selectedType)?.unit}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Notes (optional)</Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any additional notes..."
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Activity</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "Exercise 3 times this week",
                "Drink 8 glasses of water daily",
                "Get 8 hours of sleep",
                "Practice meditation",
              ].map((goal, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2"
                >
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>{goal}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Based on your cycle phase:
              </p>
              <ul className="space-y-2">
                <li className="text-sm">• Focus on gentle exercises like yoga</li>
                <li className="text-sm">• Increase iron-rich foods intake</li>
                <li className="text-sm">• Stay hydrated throughout the day</li>
                <li className="text-sm">• Practice stress-reducing activities</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}