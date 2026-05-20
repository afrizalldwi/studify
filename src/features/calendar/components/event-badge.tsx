import type { EventCategory } from "../types"
import { cn } from "@/lib/utils"

const categoryStyles: Record<EventCategory, string> = {
  Assignment: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "Study Session": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  Exam: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  Meeting: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  Personal: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
}

interface EventBadgeProps {
  category: EventCategory
  className?: string
}

export function EventBadge({ category, className }: EventBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        categoryStyles[category],
        className
      )}
    >
      {category}
    </span>
  )
}
