import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface MoodButtonProps {
  selected: boolean;
  onClick: () => void;
  icon: LucideIcon;
  label: string;
}

export function MoodButton({ selected, onClick, icon: Icon, label }: MoodButtonProps) {
  return (
    <Button
      type="button"
      variant={selected ? 'default' : 'outline'}
      onClick={onClick}
      className="flex items-center gap-2"
    >
      <Icon className="h-4 w-4" />
      {label}
    </Button>
  );
}