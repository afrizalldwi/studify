import { cn } from "@/lib/utils"
import type { Task } from "../types"

const priorityConfig: Record<
  Task["priority"],
  { label: string; class: string }
> = {
  low: {
    label: "Low",
    class:
      "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  },
  medium: {
    label: "Medium",
    class:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  },
  high: {
    label: "High",
    class: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  },
}

export function PriorityBadge({
  priority,
  className,
}: {
  priority: Task["priority"]
  className?: string
}) {
  const config = priorityConfig[priority]
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        config.class,
        className
      )}
    >
      {config.label}
    </span>
  )
}
