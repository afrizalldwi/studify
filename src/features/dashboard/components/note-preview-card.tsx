"use client"

import { Badge } from "@/components/ui/badge"
import type { DashboardNote } from "../types"

function timeAgo(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diffMs / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export function NotePreviewCard({ note }: { note: DashboardNote }) {
  return (
    <div className="cursor-pointer rounded-lg border p-3 transition-colors duration-200 hover:bg-muted/50">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium">{note.title}</p>
        <Badge variant="secondary" className="shrink-0">
          {note.category}
        </Badge>
      </div>
      <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">
        {note.preview}
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        {timeAgo(note.lastEdited)}
      </p>
    </div>
  )
}
