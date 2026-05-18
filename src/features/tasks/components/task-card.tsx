"use client"

import { cn } from "@/lib/utils"
import { TaskStatusBadge } from "./task-status-badge"
import { PriorityBadge } from "./priority-badge"
import { TaskProgress } from "./task-progress"
import type { Task } from "../types"

interface TaskCardProps {
  task: Task
  isSelected?: boolean
  onSelect?: (task: Task) => void
  onEdit?: (task: Task) => void
  onDelete?: (task: Task) => void
}

export function TaskCard({
  task,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const dueDate = new Date(task.dueDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const isOverdue = dueDate < today && task.status !== "completed"

  const formattedDate = dueDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })

  return (
    <div
      className={cn(
        "group cursor-pointer rounded-lg border p-4 transition-all duration-200 hover:shadow-md",
        isSelected && "border-primary ring-1 ring-primary",
        task.status === "completed" && "opacity-75"
      )}
      onClick={() => onSelect?.(task)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3
              className={cn(
                "text-sm font-medium",
                task.status === "completed" && "line-through text-muted-foreground"
              )}
            >
              {task.title}
            </h3>
          </div>
          {task.description && (
            <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
              {task.description}
            </p>
          )}
        </div>
        <div className="flex shrink-0 gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onEdit?.(task)
            }}
            className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
            title="Edit"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onDelete?.(task)
            }}
            className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
            title="Delete"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <TaskStatusBadge status={task.status} />
        <PriorityBadge priority={task.priority} />
        <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
          {task.category}
        </span>
        <span
          className={cn(
            "text-xs",
            isOverdue
              ? "font-medium text-destructive"
              : "text-muted-foreground"
          )}
        >
          {isOverdue ? `Overdue: ${formattedDate}` : formattedDate}
        </span>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <TaskProgress value={task.progress} className="flex-1" />
        <span className="text-xs tabular-nums text-muted-foreground">
          {task.progress}%
        </span>
      </div>
    </div>
  )
}
