"use client"

import { cn } from "@/lib/utils"
import { FavoriteButton } from "./favorite-button"
import { PinButton } from "./pin-button"
import { NotesTags } from "./notes-tags"
import type { Note } from "../types"

interface NoteCardProps {
  note: Note
  isSelected?: boolean
  onSelect?: (note: Note) => void
  onEdit?: (note: Note) => void
  onDelete?: (note: Note) => void
  onToggleFavorite?: (id: string) => void
  onTogglePin?: (id: string) => void
  viewMode?: "grid" | "list"
}

function timeAgo(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function stripMarkdown(md: string): string {
  return md
    .replace(/#{1,6}\s/g, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/`{1,3}[^`]*`{1,3}/g, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]*)\]\(.*?\)/g, "$1")
    .replace(/>\s/g, "")
    .replace(/[-*+]\s/g, "")
    .replace(/\n{2,}/g, " ")
    .trim()
}

export function NoteCard({
  note,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
  onToggleFavorite,
  onTogglePin,
  viewMode = "grid",
}: NoteCardProps) {
  const preview = stripMarkdown(note.content).slice(0, 120)

  if (viewMode === "list") {
    return (
      <div
        className={cn(
          "group cursor-pointer rounded-lg border px-3 py-2 transition-all duration-200 hover:shadow-sm",
          isSelected && "border-primary ring-1 ring-primary"
        )}
        onClick={() => onSelect?.(note)}
      >
        <div className="flex items-center gap-2">
          {note.pinned && (
            <PinButton isPinned={note.pinned} onToggle={() => onTogglePin?.(note.id)} />
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className={cn("text-sm font-medium truncate", isSelected && "text-primary")}>
                {note.title}
              </h3>
              {note.favorite && (
                <FavoriteButton isFavorite={note.favorite} onToggle={() => onToggleFavorite?.(note.id)} />
              )}
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground truncate">{preview}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-muted-foreground whitespace-nowrap">{timeAgo(note.updatedAt)}</span>
            <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
              {note.category}
            </span>
            <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onEdit?.(note) }}
                className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                title="Edit"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onDelete?.(note) }}
                className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                title="Delete"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "group cursor-pointer rounded-lg border p-3.5 transition-all duration-200 hover:shadow-md",
        isSelected && "border-primary ring-1 ring-primary"
      )}
      onClick={() => onSelect?.(note)}
    >
      <div className="flex items-start justify-between gap-1.5">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            {note.pinned && <PinButton isPinned={note.pinned} onToggle={() => onTogglePin?.(note.id)} />}
            <h3 className={cn("text-sm font-medium truncate", isSelected && "text-primary")}>
              {note.title}
            </h3>
          </div>
        </div>
        <div className="flex shrink-0 gap-0.5">
          {!note.pinned && <FavoriteButton isFavorite={note.favorite} onToggle={() => onToggleFavorite?.(note.id)} />}
          <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onEdit?.(note) }}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              title="Edit"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onDelete?.(note) }}
              className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
              title="Delete"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground leading-relaxed">
        {preview || "No content"}
      </p>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-1">
        <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground">
          {note.category}
        </span>
        <span className="text-[10px] text-muted-foreground">{timeAgo(note.updatedAt)}</span>
      </div>

      <NotesTags tags={note.tags} className="mt-1.5" />
    </div>
  )
}
