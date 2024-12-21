// import { Calendar } from '@/components/ui/calendar';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/components/ui/tooltip';
// import { Button } from '@/components/ui/button';
// import { Plus } from 'lucide-react';
// import {
//   handleCycleCalendarAction,
//   handleJournalCalendarAction,
//   handleSymptomsCalendarAction,
// } from './calendar-actions';

// interface EnhancedCalendarProps {
//   date?: Date;

//   onDateChange: (date: Date | undefined) => void;
//   getDayClassNames: (currentDate: Date) => string;
//   tooltipText: string;
//   modifiers?: Record<string, (date: Date) => boolean>;
//   modifiersStyles?: Record<string, React.CSSProperties>;
//   calendarType?: 'cycle' | 'journal' | 'symptoms';
// }

// export function EnhancedCalendar({
//   date,
//   onDateChange,
//   tooltipText,
//   modifiers,
//   modifiersStyles,
//   calendarType = 'cycle',
// }: EnhancedCalendarProps) {
//   const handleDateSelect = (selectedDate: Date | undefined) => {
//     if (selectedDate) {
//       switch (calendarType) {
//         case 'cycle':
//           handleCycleCalendarAction(selectedDate);
//           break;
//         case 'journal':
//           handleJournalCalendarAction(selectedDate);
//           break;
//         case 'symptoms':
//           handleSymptomsCalendarAction(selectedDate);
//           break;
//       }
//     }
//     onDateChange?.(selectedDate);
//   };

//   return (
//     <TooltipProvider>
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <div className="relative">
//             <Calendar
//               mode="single"
//               selected={date}
//               onSelect={handleDateSelect}
//               modifiers={modifiers}
//               modifiersStyles={modifiersStyles}
//               className="rounded-md border"
//             />
//             <Button
//               size="icon"
//               className="absolute top-2 right-2 h-8 w-8"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 const today = new Date();
//                 handleDateSelect(today);
//               }}
//             >
//               <Plus className="h-4 w-4" />
//             </Button>
//           </div>
//         </TooltipTrigger>
//         <TooltipContent>
//           <p>{tooltipText}</p>
//         </TooltipContent>
//       </Tooltip>
//     </TooltipProvider>
//   );
// }


import { Calendar } from '@/components/ui/calendar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  handleCycleCalendarAction,
  handleJournalCalendarAction,
  handleSymptomsCalendarAction,
} from './calendar-actions';

interface EnhancedCalendarProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  getDayClassNames?: (currentDate: Date) => string;
  getDayTooltip?: (currentDate: Date) => string; // Added the missing property
  tooltipText?: string;
  modifiers?: Record<string, (date: Date) => boolean>;
  modifiersStyles?: Record<string, React.CSSProperties>;
  calendarType?: 'cycle' | 'journal' | 'symptoms';
}

export function EnhancedCalendar({
  date,
  onDateChange,
  tooltipText,
  modifiers,
  modifiersStyles,
  calendarType = 'cycle',
  getDayTooltip, // Destructure the new property
}: EnhancedCalendarProps) {
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      switch (calendarType) {
        case 'cycle':
          handleCycleCalendarAction(selectedDate);
          break;
        case 'journal':
          handleJournalCalendarAction(selectedDate);
          break;
        case 'symptoms':
          handleSymptomsCalendarAction(selectedDate);
          break;
      }
    }
    onDateChange?.(selectedDate);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
              className="rounded-md border"
             // Pass the prop to the Calendar component
            />
            <Button
              size="icon"
              className="absolute top-2 right-2 h-8 w-8"
              onClick={(e) => {
                e.stopPropagation();
                const today = new Date();
                handleDateSelect(today);
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
