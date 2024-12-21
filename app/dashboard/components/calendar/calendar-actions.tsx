import { toast } from 'sonner';

export const handleCycleCalendarAction = (date: Date) => {
  const day = date.getDate();

  // Period days (1-5)
  if (day >= 1 && day <= 5) {
    toast.info('Period day logged', {
      description: `Tracking menstrual flow for day ${day} of your cycle`,
    });
  }
  // Fertile window (12-16)
  else if (day >= 12 && day <= 16) {
    toast.info('Fertile window', {
      description: 'This is part of your predicted fertile window',
    });
  }
  // Ovulation day (14)
  else if (day === 14) {
    toast.info('Predicted ovulation day', {
      description: 'This is your predicted ovulation day',
    });
  }
};

export const handleSymptomsCalendarAction = (date: Date) => {
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  toast.info('Symptom tracking', {
    description: `Track symptoms for ${formattedDate}`,
  });
};

export const handleJournalCalendarAction = (date: Date) => {
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  toast.info('Journal entry', {
    description: `Add or view journal entry for ${formattedDate}`,
  });
};
