"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { taskSchema, type TaskFormData } from "../schema"
import { useTaskStore } from "../store/task-store"
import type { Task } from "../types"

const categories = [
  "Mathematics",
  "Biology",
  "Chemistry",
  "Physics",
  "History",
  "English",
]

export function TaskModal() {
  const { modal, closeModal, addTask, updateTask } = useTaskStore()
  const { open, mode, task } = modal

  const form = useForm<TaskFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(taskSchema) as any,
    defaultValues: {
      title: "",
      description: "",
      category: "",
      dueDate: "",
      priority: "medium",
      status: "todo",
      progress: 0,
    },
  })

  useEffect(() => {
    if (open && task && mode === "edit") {
      form.reset({
        title: task.title,
        description: task.description,
        category: task.category,
        dueDate: task.dueDate,
        priority: task.priority,
        status: task.status,
        progress: task.progress,
      })
    }
    if (open && mode === "create") {
      form.reset({
        title: "",
        description: "",
        category: "",
        dueDate: "",
        priority: "medium",
        status: "todo",
        progress: 0,
      })
    }
  }, [open, mode, task, form])

  const onSubmit = (data: TaskFormData) => {
    if (mode === "create") {
      const newTask: Task = {
        id: "task-" + Date.now(),
        title: data.title,
        description: data.description || "",
        category: data.category,
        dueDate: data.dueDate,
        priority: data.priority,
        status: data.status,
        progress: data.progress,
        createdAt: new Date().toISOString(),
      }
      addTask(newTask)
    } else if (mode === "edit" && task) {
      updateTask(task.id, data)
    }
    closeModal()
  }

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Task" : "Edit Task"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...form.register("title")}
              placeholder="Enter task title"
            />
            {form.formState.errors.title && (
              <p className="text-xs text-destructive">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              {...form.register("description")}
              placeholder="Enter description (optional)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={form.watch("category")}
                onValueChange={(value) => form.setValue("category", value)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.category && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.category.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                {...form.register("dueDate")}
              />
              {form.formState.errors.dueDate && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.dueDate.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={form.watch("priority")}
                onValueChange={(value) =>
                  form.setValue(
                    "priority",
                    value as "low" | "medium" | "high"
                  )
                }
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={form.watch("status")}
                onValueChange={(value) => {
                  const status = value as "todo" | "in_progress" | "completed"
                  form.setValue("status", status)
                  if (status === "completed") form.setValue("progress", 100)
                  else if (status === "in_progress" && form.watch("progress") === 0)
                    form.setValue("progress", 50)
                  else if (status === "todo") form.setValue("progress", 0)
                }}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">Todo</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="progress">
              Progress ({form.watch("progress")}%)
            </Label>
            <input
              id="progress"
              type="range"
              min="0"
              max="100"
              step="5"
              {...form.register("progress", { valueAsNumber: true })}
              className="w-full accent-primary"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button type="submit">
              {mode === "create" ? "Create" : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
