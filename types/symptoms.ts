export type SymptomSeverity = 'mild' | 'moderate' | 'severe';

export interface SymptomEntry {
  id: string;
  date: Date;
  physical: {
    [key: string]: {
      severity: SymptomSeverity;
      notes?: string;
    };
  };
  emotional: {
    [key: string]: {
      severity: SymptomSeverity;
      notes?: string;
    };
  };
  notes?: string;
}

export const PHYSICAL_SYMPTOMS = {
  cramps: 'Cramps',
  headache: 'Headache',
  backache: 'Backache',
  nausea: 'Nausea',
  bloating: 'Bloating',
  fatigue: 'Fatigue',
  breastTenderness: 'Breast Tenderness',
  acne: 'Acne',
} as const;

export const EMOTIONAL_SYMPTOMS = {
  anxiety: 'Anxiety',
  depression: 'Depression',
  irritability: 'Irritability',
  moodSwings: 'Mood Swings',
  stress: 'Stress',
  insomnia: 'Insomnia',
  foodCravings: 'Food Cravings',
  socialWithdrawal: 'Social Withdrawal',
} as const;