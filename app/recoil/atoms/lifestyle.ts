import { atom } from 'recoil';

export interface Activity {
  id: string;
  date: Date;
  type: 'water' | 'nutrition' | 'exercise' | 'sleep';
  value: number;
  notes?: string;
}

const getInitialState = (): Activity[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('activities');
  if (!stored) return [];
  
  try {
    const parsed = JSON.parse(stored);
    return parsed.map((activity: any) => ({
      ...activity,
      date: new Date(activity.date)
    }));
  } catch {
    return [];
  }
};

export const activitiesState = atom<Activity[]>({
  key: 'activitiesState',
  default: getInitialState(),
  effects: [
    ({ onSet }) => {
      onSet((newActivities) => {
        if (typeof window === 'undefined') return;
        
        const serialized = JSON.stringify(
          newActivities.map(activity => ({
            ...activity,
            date: activity.date.toISOString()
          }))
        );
        localStorage.setItem('activities', serialized);
      });
    },
  ],
});