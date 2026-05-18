"use client"

import { useState } from "react"
import { useTaskStore } from "@/features/tasks/store/task-store"
import { TaskCard } from "@/features/tasks/components/task-card"
import { TaskSearch } from "@/features/tasks/components/task-search"
import { TaskFilter } from "@/features/tasks/components/task-filter"
import { TaskModal } from "@/features/tasks/components/task-modal"
import { TaskStatistics } from "@/features/tasks/components/task-statistics"
import { EmptyTaskState } from "@/features/tasks/components/empty-task-state"
import { TaskStatusBadge } from "@/features/tasks/components/task-status-badge"
import { PriorityBadge } from "@/features/tasks/components/priority-badge"
import { TaskProgress } from "@/features/tasks/components/task-progress"
import { SectionHeader } from "@/components/shared/section-header"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Plus, ListTodo, Search, SlidersHorizontal, X } from "lucide-react"
import type { Task } from "@/features/tasks/types"
import { cn } from "@/lib/utils"

export default function TasksPage() {
  const {
    filteredTasks,
    selectedTask,
    filter,
    searchQuery,
    setFilter,
    resetFilter,
    setSearchQuery,
    openModal,
    selectTask,
    deleteTask,
  } = useTaskStore()

  const [deleteConfirm, setDeleteConfirm] = useState<Task | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const tasks = filteredTasks()

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Tasks"
        subtitle="Manage and track your study tasks"
        action={
          <Button onClick={() => openModal("create")} className="gap-1.5">
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        }
      />

      <TaskStatistics tasks={filteredTasks()} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="flex-1 sm:max-w-sm">
            <TaskSearch value={searchQuery} onChange={setSearchQuery} />
          </div>
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "shrink-0 transition-colors",
              showFilters && "bg-muted"
            )}
            onClick={() => setShowFilters(!showFilters)}
            title="Toggle filters"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          {(filter.status || filter.category || filter.priority) && (
            <span className="text-xs text-muted-foreground">
              {tasks.length} result{tasks.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="animate-in slide-in-from-top-1 fade-in duration-200">
          <TaskFilter
            filter={filter}
            onFilterChange={setFilter}
            onReset={resetFilter}
          />
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {tasks.length === 0 ? (
          <div className="sm:col-span-2 xl:col-span-3">
            {searchQuery || filter.status || filter.category || filter.priority ? (
              <EmptyTaskState
                icon={Search}
                title="No tasks found"
                description="Try adjusting your search or filters."
                action={
                  searchQuery || filter.status || filter.category || filter.priority
                    ? {
                        label: "Clear filters",
                        onClick: () => {
                          setSearchQuery("")
                          resetFilter()
                        },
                      }
                    : undefined
                }
              />
            ) : (
              <EmptyTaskState
                icon={ListTodo}
                title="No tasks yet"
                description="Create your first task to get started."
                action={{
                  label: "Add Task",
                  onClick: () => openModal("create"),
                }}
              />
            )}
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isSelected={selectedTask?.id === task.id}
              onSelect={selectTask}
              onEdit={(t) => openModal("edit", t)}
              onDelete={(t) => setDeleteConfirm(t)}
            />
          ))
        )}
      </div>

      {selectedTask && tasks.length > 0 && (
        <div className="rounded-lg border p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">{selectedTask.title}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => selectTask(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <TaskStatusBadge status={selectedTask.status} />
              <PriorityBadge priority={selectedTask.priority} />
              <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                {selectedTask.category}
              </span>
            </div>
            {selectedTask.description && (
              <p className="text-sm text-muted-foreground">
                {selectedTask.description}
              </p>
            )}
            <div>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{selectedTask.progress}%</span>
              </div>
              <TaskProgress value={selectedTask.progress} />
            </div>
            <p className="text-xs text-muted-foreground">
              Due:{" "}
              {new Date(selectedTask.dueDate).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      )}

      <TaskModal />

      <Dialog
        open={!!deleteConfirm}
        onOpenChange={(open) => !open && setDeleteConfirm(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Task</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &ldquo;{deleteConfirm?.title}&rdquo;?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteConfirm(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (deleteConfirm) {
                  deleteTask(deleteConfirm.id)
                  setDeleteConfirm(null)
                }
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
