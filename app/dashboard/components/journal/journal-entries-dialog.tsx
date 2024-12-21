import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Smile, Meh, Frown } from 'lucide-react';
import { format } from 'date-fns';
import { journalEntriesState } from '@/app/recoil/atoms/journal';
import { getEntriesForDateSelector } from '@/app/recoil/selectors/journal';
import { Mood } from '@/types/journal';

interface JournalEntriesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
  onNewEntry: () => void;
}

const MoodIcon = ({ mood }: { mood: Mood }) => {
  switch (mood) {
    case 'happy':
      return <Smile className="h-5 w-5 text-green-500" />;
    case 'neutral':
      return <Meh className="h-5 w-5 text-yellow-500" />;
    case 'sad':
      return <Frown className="h-5 w-5 text-red-500" />;
  }
};

export function JournalEntriesDialog({
  isOpen,
  onClose,
  date,
  onNewEntry,
}: JournalEntriesDialogProps) {
  const getEntriesForDate = useRecoilValue(getEntriesForDateSelector);
  const setEntries = useSetRecoilState(journalEntriesState);
  const entries = getEntriesForDate(date);

  const deleteEntry = (id: string) => {
    setEntries((currentEntries) => 
      currentEntries.filter((entry) => entry.id !== id)
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            Journal Entries for {format(date, 'MMMM d, yyyy')}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {entries.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No entries for this date</p>
              <Button onClick={onNewEntry} className="mt-4">
                Create New Entry
              </Button>
            </div>
          ) : (
            <>
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="border rounded-lg p-4 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{entry.title}</h3>
                    <MoodIcon mood={entry.mood} />
                  </div>
                  <p className="text-muted-foreground">{entry.content}</p>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteEntry(entry.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
              <Button onClick={onNewEntry} className="w-full">
                Add Another Entry
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}