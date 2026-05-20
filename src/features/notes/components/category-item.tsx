import { cn } from "@/lib/utils"
import { Folder, FolderOpen } from "lucide-react"

export const NOTE_CATEGORIES = [
  "Mathematics",
  "Programming",
  "Networking",
  "Biology",
  "Physics",
  "Chemistry",
  "History",
  "English",
]

interface CategoryItemProps {
  name: string
  count: number
  isActive: boolean
  onClick: () => void
}

export function CategoryItem({ name, count, isActive, onClick }: CategoryItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
        isActive
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {isActive ? (
        <FolderOpen className="h-4 w-4 shrink-0" />
      ) : (
        <Folder className="h-4 w-4 shrink-0" />
      )}
      <span className="truncate flex-1 text-left">{name}</span>
      <span className="text-xs tabular-nums opacity-60">{count}</span>
    </button>
  )
}
