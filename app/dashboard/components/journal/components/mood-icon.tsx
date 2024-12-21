import { Smile, Meh, Frown } from 'lucide-react';
import { Mood } from '@/types/journal';

interface MoodIconProps {
  mood: Mood;
  className?: string;
}

export function MoodIcon({ mood, className }: MoodIconProps) {
  const iconProps = {
    className: `h-5 w-5 ${className}`,
  };

  switch (mood) {
    case 'happy':
      return <Smile {...iconProps} className={`${iconProps.className} text-green-500`} />;
    case 'neutral':
      return <Meh {...iconProps} className={`${iconProps.className} text-yellow-500`} />;
    case 'sad':
      return <Frown {...iconProps} className={`${iconProps.className} text-red-500`} />;
  }
}