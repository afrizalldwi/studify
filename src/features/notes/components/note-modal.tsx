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
import { noteSchema, type NoteFormData } from "../schema"
import { useNoteStore } from "../store/note-store"
import { NOTE_CATEGORIES } from "./category-item"
import type { Note } from "../types"

export function NotesModal() {
  const { modal, closeModal, addNote, updateNote } = useNoteStore()
  const { open, mode, note } = modal

  const form = useForm<NoteFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(noteSchema) as any,
    defaultValues: {
      title: "",
      content: "",
      category: "",
      tags: "",
    },
  })

  useEffect(() => {
    if (open && note && mode === "edit") {
      form.reset({
        title: note.title,
        content: note.content,
        category: note.category,
        tags: note.tags.join(", "),
      })
    }
    if (open && mode === "create") {
      form.reset({
        title: "",
        content: "",
        category: "",
        tags: "",
      })
    }
  }, [open, mode, note, form])

  const onSubmit = (data: NoteFormData) => {
    const tags = data.tags
      ? data.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : []

    if (mode === "create") {
      const newNote: Note = {
        id: "note-" + Date.now(),
        title: data.title,
        content: data.content || "",
        category: data.category,
        tags,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        favorite: false,
        pinned: false,
      }
      addNote(newNote)
    } else if (mode === "edit" && note) {
      updateNote(note.id, {
        title: data.title,
        content: data.content || "",
        category: data.category,
        tags,
      })
    }
    closeModal()
  }

  return (
    <Dialog open={open} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Note" : "Edit Note"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...form.register("title")}
              placeholder="Enter note title"
            />
            {form.formState.errors.title && (
              <p className="text-xs text-destructive">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={form.watch("category")}
              onValueChange={(value) => form.setValue("category", value)}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {NOTE_CATEGORIES.map((cat) => (
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
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              {...form.register("tags")}
              placeholder="e.g. react, hooks, javascript"
            />
            <p className="text-[10px] text-muted-foreground">Separate tags with commas</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content (Markdown)</Label>
            <textarea
              id="content"
              {...form.register("content")}
              placeholder="Write your note content in markdown..."
              rows={8}
              className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground resize-y font-mono"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={closeModal}>
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
