"use client"

import { useNoteStore } from "../store/note-store"
import { MarkdownPreview } from "./markdown-preview"
import { FavoriteButton } from "./favorite-button"
import { PinButton } from "./pin-button"
import { NotesTags } from "./notes-tags"
import { X, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"

function timeAgo(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

export function NotesPreviewPanel() {
  const { selectedNote, selectNote, openModal, toggleFavorite, togglePin } = useNoteStore()

  if (!selectedNote) return null

  return (
    <div className="hidden lg:flex w-[420px] shrink-0 flex-col border-l border-border bg-background">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <PinButton isPinned={selectedNote.pinned} onToggle={() => togglePin(selectedNote.id)} />
          <FavoriteButton isFavorite={selectedNote.favorite} onToggle={() => toggleFavorite(selectedNote.id)} />
        </div>
        <div className="flex items-center gap-0.5">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openModal("edit", selectedNote)} title="Edit">
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => selectNote(null)} title="Close">
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-4 pb-2 space-y-2.5">
          <h2 className="text-base font-semibold leading-snug">{selectedNote.title}</h2>

          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 font-medium text-secondary-foreground">
              {selectedNote.category}
            </span>
            <span className="text-muted-foreground/60">·</span>
            <span>Updated {timeAgo(selectedNote.updatedAt)}</span>
          </div>

          <NotesTags tags={selectedNote.tags} />
        </div>

        <div className="border-t border-border mt-2">
          <MarkdownPreview content={selectedNote.content} className="px-4 py-3" />
        </div>
      </div>
    </div>
  )
}
