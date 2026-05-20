"use client"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Star, Pin, RotateCcw } from "lucide-react"
import type { NotesFilter as NotesFilterType } from "../types"

interface NotesFilterProps {
  filter: NotesFilterType
  onFilterChange: (filter: Partial<NotesFilterType>) => void
  onReset: () => void
}

export function NotesFilter({ filter, onFilterChange, onReset }: NotesFilterProps) {
  const hasFilters = filter.favoritesOnly || filter.pinnedOnly

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <Switch
          id="favorites-filter"
          checked={filter.favoritesOnly}
          onCheckedChange={(checked) =>
            onFilterChange({ favoritesOnly: checked })
          }
        />
        <Label htmlFor="favorites-filter" className="flex items-center gap-1.5 text-sm cursor-pointer">
          <Star className="h-3.5 w-3.5 text-amber-500" />
          Favorites
        </Label>
      </div>

      <div className="flex items-center gap-2">
        <Switch
          id="pinned-filter"
          checked={filter.pinnedOnly}
          onCheckedChange={(checked) =>
            onFilterChange({ pinnedOnly: checked })
          }
        />
        <Label htmlFor="pinned-filter" className="flex items-center gap-1.5 text-sm cursor-pointer">
          <Pin className="h-3.5 w-3.5 text-primary" />
          Pinned
        </Label>
      </div>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={onReset} className="gap-1">
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </Button>
      )}
    </div>
  )
}
