"use client"

import { cn } from "@/lib/utils"
import type { Note } from "../types"
import { Edit3, Plus, Pin, Star } from "lucide-react"

interface ActivityItem {
  type: "edit" | "create" | "pin" | "favorite"
  noteTitle: string
  noteId: string
  timestamp: string
}

function timeAgo(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return "Just now"
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return "Yesterday"
  if (days < 30) return `${days}d ago`
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function buildActivity(notes: Note[]): ActivityItem[] {
  const items: ActivityItem[] = []
  for (const note of notes) {
    items.push({ type: "edit", noteTitle: note.title, noteId: note.id, timestamp: note.updatedAt })
    if (note.pinned) items.push({ type: "pin", noteTitle: note.title, noteId: note.id, timestamp: note.updatedAt })
    if (note.favorite) items.push({ type: "favorite", noteTitle: note.title, noteId: note.id, timestamp: note.updatedAt })
  }
  return items
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 6)
}

const activityConfig = {
  edit: { icon: Edit3, label: "Edited", color: "text-blue-500" },
  create: { icon: Plus, label: "Created", color: "text-green-500" },
  pin: { icon: Pin, label: "Pinned", color: "text-primary" },
  favorite: { icon: Star, label: "Favorited", color: "text-amber-500" },
}

interface NotesActivityTimelineProps {
  notes: Note[]
  onNoteClick: (note: Note) => void
}

export function NotesActivityTimeline({ notes, onNoteClick }: NotesActivityTimelineProps) {
  const activity = buildActivity(notes)
  if (activity.length === 0) return null

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Recent Activity</h3>
      <div className="space-y-1">
        {activity.map((item, i) => {
          const config = activityConfig[item.type]
          const note = notes.find((n) => n.id === item.noteId)
          return (
            <button
              key={`${item.noteId}-${item.type}-${i}`}
              type="button"
              onClick={() => note && onNoteClick(note)}
              className="flex w-full items-start gap-2.5 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-muted"
            >
              <div className={cn("mt-0.5 shrink-0", config.color)}>
                <config.icon className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-foreground truncate">
                  <span className="text-muted-foreground">{config.label}</span>{" "}
                  {item.noteTitle}
                </p>
                <p className="text-[10px] text-muted-foreground">{timeAgo(item.timestamp)}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
