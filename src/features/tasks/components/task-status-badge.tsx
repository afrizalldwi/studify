import { cn } from "@/lib/utils"
import type { Task } from "../types"

const statusConfig: Record<
  Task["status"],
  { label: string; class: string }
> = {
  todo: {
    label: "Todo",
    class:
      "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  },
  in_progress: {
    label: "In Progress",
    class: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  },
  completed: {
    label: "Completed",
    class:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  },
}

export function TaskStatusBadge({
  status,
  className,
}: {
  status: Task["status"]
  className?: string
}) {
  const config = statusConfig[status]
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
