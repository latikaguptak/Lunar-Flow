import * as z from "zod";

export const symptomFormSchema = z.object({
  date: z.date({
    required_error: "Please select a date",
  }),
  flow: z.enum(["light", "medium", "heavy"], {
    required_error: "Please select flow intensity",
  }),
  temperature: z.number()
    .min(35.0, "Temperature must be at least 35.0°C")
    .max(42.0, "Temperature must be less than 42.0°C"),
  energy: z.number()
    .min(1, "Energy level must be between 1 and 10")
    .max(10, "Energy level must be between 1 and 10"),
  sleepQuality: z.enum(["poor", "fair", "good", "excellent"], {
    required_error: "Please select sleep quality",
  }),
  symptoms: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

export type SymptomFormValues = z.infer<typeof symptomFormSchema>;