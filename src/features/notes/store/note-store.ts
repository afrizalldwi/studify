import { create } from "zustand"
import type { Note, NotesFilter, ViewMode, NotesModalState } from "../types"
import { mockNotes } from "../data/notes"

interface NotesStore {
  notes: Note[]
  selectedNote: Note | null
  editorContent: string
  viewMode: ViewMode
  filter: NotesFilter
  searchQuery: string
  modal: NotesModalState
  isSidebarOpen: boolean

  filteredNotes: () => Note[]

  addNote: (note: Note) => void
  updateNote: (id: string, updates: Partial<Note>) => void
  deleteNote: (id: string) => void
  toggleFavorite: (id: string) => void
  togglePin: (id: string) => void
  setFilter: (filter: Partial<NotesFilter>) => void
  resetFilter: () => void
  setSearchQuery: (query: string) => void
  setViewMode: (mode: ViewMode) => void
  selectNote: (note: Note | null) => void
  setEditorContent: (content: string) => void
  openModal: (mode: "create" | "edit", note?: Note) => void
  closeModal: () => void
  toggleSidebar: () => void
}

const defaultFilter: NotesFilter = {
  category: undefined,
  favoritesOnly: false,
  pinnedOnly: false,
}

export const useNoteStore = create<NotesStore>((set, get) => ({
  notes: mockNotes,
  selectedNote: null,
  editorContent: "",
  viewMode: "grid",
  filter: { ...defaultFilter },
  searchQuery: "",
  modal: { open: false, mode: "create" },
  isSidebarOpen: true,

  filteredNotes: () => {
    const { notes, filter, searchQuery } = get()
    return notes.filter((note) => {
      if (filter.category && note.category !== filter.category) return false
      if (filter.favoritesOnly && !note.favorite) return false
      if (filter.pinnedOnly && !note.pinned) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        if (
          !note.title.toLowerCase().includes(q) &&
          !note.content.toLowerCase().includes(q) &&
          !note.tags.some((t) => t.toLowerCase().includes(q))
        )
          return false
      }
      return true
    })
  },

  addNote: (note) =>
    set((state) => ({ notes: [note, ...state.notes] })),

  updateNote: (id, updates) =>
    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n
      ),
      selectedNote:
        state.selectedNote?.id === id
          ? { ...state.selectedNote, ...updates, updatedAt: new Date().toISOString() }
          : state.selectedNote,
    })),

  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((n) => n.id !== id),
      selectedNote: state.selectedNote?.id === id ? null : state.selectedNote,
    })),

  toggleFavorite: (id) =>
    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === id ? { ...n, favorite: !n.favorite } : n
      ),
      selectedNote:
        state.selectedNote?.id === id
          ? { ...state.selectedNote, favorite: !state.selectedNote.favorite }
          : state.selectedNote,
    })),

  togglePin: (id) =>
    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === id ? { ...n, pinned: !n.pinned } : n
      ),
      selectedNote:
        state.selectedNote?.id === id
          ? { ...state.selectedNote, pinned: !state.selectedNote.pinned }
          : state.selectedNote,
    })),

  selectNote: (note) =>
    set({ selectedNote: note, editorContent: note?.content ?? "" }),

  setEditorContent: (content) => set({ editorContent: content }),

  setFilter: (filter) =>
    set((state) => ({
      filter: { ...state.filter, ...filter },
    })),

  resetFilter: () => set({ filter: { ...defaultFilter } }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setViewMode: (mode) => set({ viewMode: mode }),

  openModal: (mode, note) =>
    set({ modal: { open: true, mode, note } }),

  closeModal: () =>
    set({ modal: { open: false, mode: "create", note: undefined } }),

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}))
