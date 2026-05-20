"use client"

import { cn } from "@/lib/utils"
import { CategoryItem, NOTE_CATEGORIES } from "./category-item"
import { useNoteStore } from "../store/note-store"
import { FileText, PanelLeftClose, PanelLeft, Star, Pin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NotesSidebar() {
  const { notes, filter, setFilter, resetFilter, isSidebarOpen, toggleSidebar } = useNoteStore()

  const categoryCounts = NOTE_CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat] = notes.filter((n) => n.category === cat).length
      return acc
    },
    {} as Record<string, number>
  )

  const favoritesCount = notes.filter((n) => n.favorite).length
  const pinnedCount = notes.filter((n) => n.pinned).length

  return (
    <>
      {isSidebarOpen && (
        <div className="w-44 shrink-0 border-r border-border hidden lg:flex flex-col bg-muted/20">
          <div className="flex items-center justify-between px-2.5 py-2">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">Browse</span>
            <Button variant="ghost" size="icon" className="h-5 w-5" onClick={toggleSidebar} title="Collapse sidebar">
              <PanelLeftClose className="h-3 w-3" />
            </Button>
          </div>

          <div className="space-y-0.5 px-1.5 pb-1">
            <button
              type="button"
              onClick={resetFilter}
              className={cn(
                "flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-xs transition-colors",
                !filter.category && !filter.favoritesOnly && !filter.pinnedOnly
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <FileText className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate flex-1 text-left">All Notes</span>
              <span className="text-[10px] tabular-nums opacity-60">{notes.length}</span>
            </button>

            <button
              type="button"
              onClick={() => setFilter({ favoritesOnly: !filter.favoritesOnly, pinnedOnly: false })}
              className={cn(
                "flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-xs transition-colors",
                filter.favoritesOnly
                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Star className={cn("h-3.5 w-3.5 shrink-0", filter.favoritesOnly ? "fill-amber-500 text-amber-500" : "")} />
              <span className="truncate flex-1 text-left">Favorites</span>
              <span className="text-[10px] tabular-nums opacity-60">{favoritesCount}</span>
            </button>

            <button
              type="button"
              onClick={() => setFilter({ pinnedOnly: !filter.pinnedOnly, favoritesOnly: false })}
              className={cn(
                "flex w-full items-center gap-1.5 rounded-md px-2 py-1.5 text-xs transition-colors",
                filter.pinnedOnly
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Pin className={cn("h-3.5 w-3.5 shrink-0", filter.pinnedOnly ? "fill-primary text-primary" : "")} />
              <span className="truncate flex-1 text-left">Pinned</span>
              <span className="text-[10px] tabular-nums opacity-60">{pinnedCount}</span>
            </button>
          </div>

          <div className="border-t border-border my-1.5" />

          <div className="px-2.5 pb-1">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">Categories</span>
          </div>

          <div className="space-y-0.5 px-1.5 pb-2 overflow-y-auto">
            {NOTE_CATEGORIES.map((cat) => (
              <CategoryItem
                key={cat}
                name={cat}
                count={categoryCounts[cat] || 0}
                isActive={filter.category === cat}
                onClick={() =>
                  setFilter(
                    filter.category === cat ? { category: undefined } : { category: cat }
                  )
                }
              />
            ))}
          </div>
        </div>
      )}

      {!isSidebarOpen && (
        <div className="hidden lg:flex w-9 shrink-0 items-start justify-center border-r border-border pt-3">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={toggleSidebar} title="Expand sidebar">
            <PanelLeft className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  )
}
