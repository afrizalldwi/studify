"use client"

import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { eventSchema, type EventFormData } from "../schema"
import { useCalendarStore } from "../store/calendar-store"
import { Separator } from "@/components/ui/separator"
import type { CreateEventPayload, UpdateEventPayload } from "@/types"

const categories = ["Assignment", "Study Session", "Exam", "Meeting", "Personal"] as const

export function EventModal() {
  const { modal, closeModal, addEvent, updateEvent } = useCalendarStore()
  const { open, mode, event } = modal

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "Study Session",
      startDate: "",
      endDate: "",
      priority: "Medium",
      location: "",
      reminder: false,
      completed: false,
    },
  })

  const formatForInput = (iso: string) => {
    const d = new Date(iso)
    if (isNaN(d.getTime())) return iso
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    const hours = String(d.getHours()).padStart(2, "0")
    const minutes = String(d.getMinutes()).padStart(2, "0")
    return `${year}-${month}-${day}T${hours}:${minutes}`
  }

  const formatToISO = (local: string) => {
    const d = new Date(local)
    return d.toISOString()
  }

  useEffect(() => {
    if (open && event && mode === "edit") {
      form.reset({
        title: event.title,
        description: event.description,
        category: event.category,
        startDate: formatForInput(event.startDate),
        endDate: formatForInput(event.endDate),
        priority: event.priority,
        location: event.location || "",
        reminder: event.reminder || false,
        completed: event.completed,
      })
    }
    if (open && mode === "create") {
      form.reset({
        title: "",
        description: "",
        category: "Study Session",
        startDate: "",
        endDate: "",
        priority: "Medium",
        location: "",
        reminder: false,
        completed: false,
      })
    }
  }, [open, mode, event, form])

  const onSubmit = async (data: EventFormData) => {
    if (mode === "create") {
      const newEventPayload: CreateEventPayload = {
        title: data.title,
        description: data.description || undefined,
        category: data.category,
        startDate: formatToISO(data.startDate),
        endDate: formatToISO(data.endDate),
        priority: data.priority,
        location: data.location || undefined,
        reminder: data.reminder,
        completed: data.completed,
      }
      await addEvent(newEventPayload)
    } else if (mode === "edit" && event) {
      const updatedEventPayload: UpdateEventPayload = {
        title: data.title,
        description: data.description || undefined,
        category: data.category,
        startDate: formatToISO(data.startDate),
        endDate: formatToISO(data.endDate),
        priority: data.priority,
        location: data.location || undefined,
        reminder: data.reminder,
        completed: data.completed,
      }
      await updateEvent(event.id, updatedEventPayload)
    }
    closeModal()
  }

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Event" : "Edit Event"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...form.register("title")}
              placeholder="Enter event title"
            />
            {form.formState.errors.title && (
              <p className="text-xs text-destructive">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...form.register("description")}
              placeholder="Enter description (optional)"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Controller
                name="category"
                control={form.control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
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
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Controller
                name="priority"
                control={form.control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date & Time</Label>
              <Input
                id="startDate"
                type="datetime-local"
                {...form.register("startDate")}
              />
              {form.formState.errors.startDate && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.startDate.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date & Time</Label>
              <Input
                id="endDate"
                type="datetime-local"
                {...form.register("endDate")}
              />
              {form.formState.errors.endDate && (
                <p className="text-xs text-destructive">
                  {form.formState.errors.endDate.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location (optional)</Label>
            <Input
              id="location"
              {...form.register("location")}
              placeholder="e.g. Room 301, Library"
            />
          </div>

          <div className="flex items-center gap-4">
            <Controller
              name="reminder"
              control={form.control}
              render={({ field }) => (
                <div className="flex items-center gap-2">
                  <Switch
                    id="reminder"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label htmlFor="reminder">Set reminder</Label>
                </div>
              )}
            />

            {mode === "edit" && (
              <Controller
                name="completed"
                control={form.control}
                render={({ field }) => (
                  <div className="flex items-center gap-2">
                    <Switch
                      id="completed"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <Label htmlFor="completed">Completed</Label>
                  </div>
                )}
              />
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === "create" ? "Create Event" : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
