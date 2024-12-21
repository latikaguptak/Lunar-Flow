'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Smile, Meh, Frown } from 'lucide-react';
import {
  journalFormSchema,
  type JournalFormValues,
} from '../schemas/journal-form-schema';

const moodIcons = [
  { icon: Smile, label: 'Happy', value: 'happy' },
  { icon: Meh, label: 'Neutral', value: 'neutral' },
  { icon: Frown, label: 'Sad', value: 'sad' },
] as const;

export function JournalEntryDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<JournalFormValues>({
    resolver: zodResolver(journalFormSchema),
    defaultValues: {
      date: new Date(),
      title: '',
      mood: 'neutral',
      content: '',
      tags: [],
    },
  });

  const onSubmit = async (values: JournalFormValues) => {
    try {
      console.log('Submitting journal entry:', values); // Replace with actual API call
      toast.success('Journal entry saved successfully!');
      setOpen(false);
      form.reset();
    } catch (error) {
      toast.error('Failed to save journal entry');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" variant="secondary" className="shadow-lg">
          Add Journal Entry
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg w-full p-4">
        <DialogHeader>
          <DialogTitle>New Journal Entry</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Date Picker */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    className="rounded-md border w-full"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Title Input */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter a title for your entry..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Mood Selector */}
            <FormField
              control={form.control}
              name="mood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How are you feeling?</FormLabel>
                  <div className="flex flex-wrap gap-4">
                    {moodIcons.map(({ icon: Icon, label, value }) => (
                      <Button
                        key={value}
                        type="button"
                        variant={field.value === value ? 'default' : 'outline'}
                        className="flex-1 flex items-center justify-center p-2"
                        onClick={() => field.onChange(value)}
                      >
                        <Icon className="mr-2 h-4 w-4" />
                        {label}
                      </Button>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content Textarea */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your thoughts</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your thoughts here..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Save Button */}
            <Button type="submit" className="w-full">
              Save Entry
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
