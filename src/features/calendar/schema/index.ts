import { z } from "zod"

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(1000).default(""),
  category: z.enum(["Assignment", "Study Session", "Exam", "Meeting", "Personal"]),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  priority: z.enum(["Low", "Medium", "High"]),
  location: z.string().optional().default(""),
  reminder: z.boolean().optional().default(false),
  completed: z.boolean().optional().default(false),
})

export type EventFormData = z.infer<typeof eventSchema>
