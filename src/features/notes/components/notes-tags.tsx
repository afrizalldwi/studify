import { cn } from "@/lib/utils"

interface NotesTagsProps {
  tags: string[]
  className?: string
}

export function NotesTags({ tags, className }: NotesTagsProps) {
  if (tags.length === 0) return null
  return (
    <div className={cn("flex flex-wrap gap-1", className)}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
        >
          #{tag}
        </span>
      ))}
    </div>
  )
}
