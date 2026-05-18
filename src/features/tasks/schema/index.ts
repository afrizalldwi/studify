import { z } from "zod"

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().max(500).default(""),
  category: z.string().min(1, "Category is required"),
  dueDate: z.string().min(1, "Due date is required"),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["todo", "in_progress", "completed"]),
  progress: z.coerce.number().min(0).max(100).default(0),
})

export type TaskFormData = z.infer<typeof taskSchema>
