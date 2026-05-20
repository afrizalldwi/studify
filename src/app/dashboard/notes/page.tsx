"use client"

import { useState, useEffect } from "react"
import { useNoteStore } from "@/features/notes/store/note-store"
import { NoteCard } from "@/features/notes/components/note-card"
import { NotesSearchBar } from "@/features/notes/components/notes-search-bar"
import { NotesViewToggle } from "@/features/notes/components/notes-view-toggle"
import { NotesPreviewPanel } from "@/features/notes/components/notes-preview-panel"
import { NotesStatsCard } from "@/features/notes/components/notes-stats-card"
import { NotesActivityTimeline } from "@/features/notes/components/notes-activity-timeline"
import { NotesInsightsCard } from "@/features/notes/components/notes-insights-card"
import { NotesModal } from "@/features/notes/components/note-modal"
import { EmptyNotesState } from "@/features/notes/components/empty-notes-state"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Plus,
  Search,
  FileText,
  Bookmark,
  Pin,
  FolderOpen,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Note } from "@/features/notes/types"

export default function NotesPage() {
  const {
    notes,
    filteredNotes,
    selectedNote,
    viewMode,
    filter,
    searchQuery,
    resetFilter,
    setSearchQuery,
    setViewMode,
    selectNote,
    deleteNote,
    toggleFavorite,
    togglePin,
    openModal,
  } = useNoteStore()

  const [loading, setLoading] = useState(true)
  const [deleteConfirm, setDeleteConfirm] = useState<Note | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const displayNotes = filteredNotes()

  const pinnedNotes = displayNotes.filter((n) => n.pinned)
  const unpinnedNotes = displayNotes.filter((n) => !n.pinned)

  const totalCategories = new Set(notes.map((n) => n.category)).size
  const totalFavorites = notes.filter((n) => n.favorite).length
  const totalPinned = notes.filter((n) => n.pinned).length

  const hasActiveFilter = searchQuery || filter.favoritesOnly || filter.pinnedOnly || filter.category

  function renderNoteList() {
    if (loading) {
      return viewMode === "grid" ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-36 rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 rounded-lg" />
          ))}
        </div>
      )
    }

    if (displayNotes.length === 0) {
      return (
        <div className="pt-8">
          {hasActiveFilter ? (
            <EmptyNotesState
              icon={Search}
              title="No notes found"
              description="Try adjusting your search or filters."
              action={{
                label: "Clear filters",
                onClick: () => { setSearchQuery(""); resetFilter() },
              }}
            />
          ) : (
            <EmptyNotesState
              icon={FileText}
              title="No notes yet"
              description="Create your first note to get started."
              action={{
                label: "Create Note",
                onClick: () => openModal("create"),
              }}
            />
          )}
        </div>
      )
    }

    return (
      <div className={cn(viewMode === "grid" ? "grid gap-3 sm:grid-cols-2" : "space-y-2")}>
        {!hasActiveFilter && pinnedNotes.length > 0 && (
          <>
            <div className={cn(viewMode === "grid" ? "col-span-full" : "")}>
              <div className="flex items-center gap-2 mb-2">
                <Pin className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium text-foreground">Pinned</span>
                <span className="text-[10px] text-muted-foreground">({pinnedNotes.length})</span>
              </div>
              <div className={cn(viewMode === "grid" ? "grid gap-3 sm:grid-cols-2" : "space-y-2")}>
                {pinnedNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    isSelected={selectedNote?.id === note.id}
                    onSelect={selectNote}
                    onEdit={(n) => openModal("edit", n)}
                    onDelete={(n) => setDeleteConfirm(n)}
                    onToggleFavorite={toggleFavorite}
                    onTogglePin={togglePin}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            </div>
            <div className={cn("relative", viewMode === "grid" ? "col-span-full" : "")}>
              <Separator className="my-3" />
            </div>
          </>
        )}

        <div className={cn(viewMode === "grid" ? "col-span-full" : "")}>
          {(!hasActiveFilter && pinnedNotes.length > 0) && (
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs font-medium text-foreground">All Notes</span>
              <span className="text-[10px] text-muted-foreground">({unpinnedNotes.length})</span>
            </div>
          )}
          <div className={cn(viewMode === "grid" ? "grid gap-3 sm:grid-cols-2" : "space-y-2")}>
            {(hasActiveFilter || pinnedNotes.length === 0 ? displayNotes : unpinnedNotes).map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                isSelected={selectedNote?.id === note.id}
                onSelect={selectNote}
                onEdit={(n) => openModal("edit", n)}
                onDelete={(n) => setDeleteConfirm(n)}
                onToggleFavorite={toggleFavorite}
                onTogglePin={togglePin}
                viewMode={viewMode}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-1 min-h-0 overflow-hidden">
      <div className="flex flex-1 flex-col min-w-0">
        <div className="border-b border-border px-4 py-2.5">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-base font-semibold tracking-tight">Notes</h1>
            <Button onClick={() => openModal("create")} size="sm" className="gap-1.5 h-8">
              <Plus className="h-3.5 w-3.5" />
              New Note
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 mb-2">
            <NotesStatsCard icon={FileText} label="Total" value={notes.length} />
            <NotesStatsCard icon={Bookmark} label="Favorites" value={totalFavorites} />
            <NotesStatsCard icon={Pin} label="Pinned" value={totalPinned} />
            <NotesStatsCard icon={FolderOpen} label="Categories" value={totalCategories} />
          </div>

          <div className="flex items-center gap-2">
            <NotesSearchBar value={searchQuery} onChange={setSearchQuery} />
            <NotesViewToggle viewMode={viewMode} onChange={setViewMode} />
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4">
            {renderNoteList()}
          </div>

          <NotesPreviewPanel />
        </div>
      </div>

      {!selectedNote && (
        <div className="hidden xl:flex w-56 shrink-0 border-l border-border p-3 flex-col gap-4 overflow-y-auto">
          <NotesInsightsCard notes={notes} />
          <NotesActivityTimeline notes={notes} onNoteClick={selectNote} />
        </div>
      )}

      <NotesModal />

      <Dialog
        open={!!deleteConfirm}
        onOpenChange={(open) => !open && setDeleteConfirm(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Note</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete &ldquo;{deleteConfirm?.title}&rdquo;?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (deleteConfirm) {
                  deleteNote(deleteConfirm.id)
                  setDeleteConfirm(null)
                }
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
