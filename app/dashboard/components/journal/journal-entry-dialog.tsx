import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Smile, Meh, Frown } from 'lucide-react';
import { toast } from 'sonner';
import { journalEntriesState } from '@/app/recoil/atoms/journal';
import { Mood } from '@/types/journal';

interface JournalEntryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
}

export function JournalEntryDialog({ isOpen, onClose, date }: JournalEntryDialogProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState<Mood>('neutral');
  const setEntries = useSetRecoilState(journalEntriesState);

  const handleSubmit = (e: React.FormEvent) => {
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
    setTitle('');
    setContent('');
    setMood('neutral');
  };

  const moodButtons = [
    { mood: 'happy' as Mood, icon: Smile, label: 'Happy' },
    { mood: 'neutral' as Mood, icon: Meh, label: 'Neutral' },
    { mood: 'sad' as Mood, icon: Frown, label: 'Sad' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>New Journal Entry</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex justify-center space-x-4">
            {moodButtons.map(({ mood: moodType, icon: Icon, label }) => (
              <Button
                key={moodType}
                type="button"
                variant={mood === moodType ? 'default' : 'outline'}
                onClick={() => setMood(moodType)}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Button>
            ))}
          </div>
          <Textarea
            placeholder="Write your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[200px]"
          />
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Entry</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}