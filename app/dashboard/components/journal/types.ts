export type Mood = 'happy' | 'neutral' | 'sad';

export interface JournalEntry {
  id: string;
  date: Date;
  title: string;
  content: string;
  mood: Mood;
  tags?: string[];
}

export interface JournalStore {
  entries: JournalEntry[];
  addEntry: (entry: Omit<JournalEntry, 'id'>) => void;
  getEntriesForDate: (date: Date) => JournalEntry[];
  deleteEntry: (id: string) => void;
  updateEntry: (id: string, entry: Partial<JournalEntry>) => void;
}