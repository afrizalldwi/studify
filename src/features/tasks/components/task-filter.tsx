"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import type { TaskFilter as TaskFilterType } from "../types"

const categories = [
  "Mathematics",
  "Biology",
  "Chemistry",
  "Physics",
  "History",
  "English",
]

interface TaskFilterProps {
  filter: TaskFilterType
  onFilterChange: (filter: Partial<TaskFilterType>) => void
  onReset: () => void
}

export function TaskFilter({
  filter,
  onFilterChange,
  onReset,
}: TaskFilterProps) {
  const hasFilters = filter.status || filter.category || filter.priority

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Select
        value={filter.status}
        onValueChange={(value) =>
          onFilterChange({ status: value === "all" ? "" : value })
        }
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="todo">Todo</SelectItem>
          <SelectItem value="in_progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filter.category}
        onValueChange={(value) =>
          onFilterChange({ category: value === "all" ? "" : value })
        }
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filter.priority}
        onValueChange={(value) =>
          onFilterChange({ priority: value === "all" ? "" : value })
        }
      >
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="All Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priority</SelectItem>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="gap-1"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </Button>
      )}
    </div>
  )
}
