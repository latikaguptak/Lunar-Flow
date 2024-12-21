import * as z from "zod";

export const journalFormSchema = z.object({
  date: z.date({
    required_error: "Please select a date",
  }),
  title: z.string()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must not exceed 100 characters"),
  mood: z.enum(["happy", "neutral", "sad"], {
    required_error: "Please select your mood",
  }),
  content: z.string()
    .min(10, "Journal entry must be at least 10 characters")
    .max(2000, "Journal entry must not exceed 2000 characters"),
  tags: z.array(z.string()).optional(),
});

export type JournalFormValues = z.infer<typeof journalFormSchema>;