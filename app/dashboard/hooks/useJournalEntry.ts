import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { journalEntriesState } from '@/app/recoil/atoms/journal';
import { Mood } from '@/types/journal';
import { toast } from 'sonner';

export function useJournalEntry(onClose: () => void) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<Mood>('neutral');
  const setEntries = useSetRecoilState(journalEntriesState);

  const handleSubmit = (e: React.FormEvent, date: Date) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setEntries((currentEntries) => [
      ...currentEntries,
      {
        id: uuidv4(),
        date,
        title: title.trim(),
        content: content.trim(),
        mood,
      },
    ]);

    toast.success('Journal entry saved successfully!');
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setMood('neutral');
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    mood,
    setMood,
    handleSubmit,
    resetForm,
  };
}