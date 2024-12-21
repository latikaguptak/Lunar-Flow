import { useRecoilValue, useSetRecoilState } from 'recoil';
import { journalEntriesState } from '@/app/recoil/atoms/journal';
import { getEntriesForDateSelector } from '@/app/recoil/selectors/journal';

export function useJournalEntries(date: Date) {
  const getEntriesForDate = useRecoilValue(getEntriesForDateSelector);
  const setEntries = useSetRecoilState(journalEntriesState);
  const entries = getEntriesForDate(date);

  const deleteEntry = (id: string) => {
    setEntries((currentEntries) => 
      currentEntries.filter((entry) => entry.id !== id)
    );
  };

  return {
    entries,
    deleteEntry,
  };
}