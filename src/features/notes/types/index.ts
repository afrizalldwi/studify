export interface Note {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  createdAt: string
  updatedAt: string
  favorite: boolean
  pinned: boolean
}

export interface NotesFilter {
  category?: string
  favoritesOnly: boolean
  pinnedOnly: boolean
}

export type ViewMode = "grid" | "list"

export interface NotesModalState {
  open: boolean
  mode: "create" | "edit"
  note?: Note
}
