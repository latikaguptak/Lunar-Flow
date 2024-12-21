export type Mood = 'happy' | 'neutral' | 'sad';

export interface JournalEntry {
  id: string;
  date: Date;
  title: string;
  content: string;
  mood: Mood;
  tags?: string[];
}
