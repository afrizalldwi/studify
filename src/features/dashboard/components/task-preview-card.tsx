"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import type { DashboardTask } from "../types"

const priorityVariants: Record<
  DashboardTask["priority"],
  "destructive" | "default" | "secondary"
> = {
  high: "destructive",
  medium: "default",
  low: "secondary",
}

export function TaskPreviewCard({ task }: { task: DashboardTask }) {
  const dueDate = new Date(task.dueDate)
  const isOverdue = dueDate < new Date() && task.status !== "completed"
  const formattedDate = dueDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })

  return (
    <div className="rounded-lg border p-3 hover:bg-muted/50 transition-colors duration-200">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{task.title}</p>
          <p className="mt-0.5 text-xs text-muted-foreground">{task.subject}</p>
        </div>
        <Badge variant={priorityVariants[task.priority]}>
          {task.priority}
        </Badge>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span
          className={cn(
            "text-xs",
            isOverdue
              ? "font-medium text-destructive"
              : "text-muted-foreground"
          )}
        >
          {isOverdue ? "Overdue" : `Due ${formattedDate}`}
        </span>
        <span className="text-xs text-muted-foreground">
          {task.progress}%
        </span>
      </div>
      <Progress value={task.progress} className="mt-1 h-1.5" />
    </div>
  )
}
