import { z } from "zod"

export const noteSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  content: z.string().default(""),
  category: z.string().min(1, "Category is required"),
  tags: z.string().default(""),
})

export type NoteFormData = z.infer<typeof noteSchema>
