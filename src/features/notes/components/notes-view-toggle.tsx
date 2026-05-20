"use client"

import { Grid3X3, List } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ViewMode } from "../types"

interface NotesViewToggleProps {
  viewMode: ViewMode
  onChange: (mode: ViewMode) => void
}

export function NotesViewToggle({ viewMode, onChange }: NotesViewToggleProps) {
  return (
    <div className="flex items-center gap-1 rounded-lg border border-border p-0.5">
      <button
        type="button"
        onClick={() => onChange("grid")}
        className={cn(
          "rounded p-1.5 transition-colors",
          viewMode === "grid"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
        title="Grid view"
      >
        <Grid3X3 className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => onChange("list")}
        className={cn(
          "rounded p-1.5 transition-colors",
          viewMode === "list"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
        title="List view"
      >
        <List className="h-4 w-4" />
      </button>
    </div>
  )
}
