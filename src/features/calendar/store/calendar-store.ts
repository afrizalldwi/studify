import { create } from "zustand"
import type { CalendarEvent, CalendarView, CalendarFilter, CalendarModalState } from "../types"
import { calendarEventsApi } from "@/lib/api/calendar-events"
import { CreateEventPayload, UpdateEventPayload } from "@/types"

interface CalendarStore {
  events: CalendarEvent[]
  selectedEvent: CalendarEvent | null
  currentView: CalendarView
  selectedDate: Date
  modal: CalendarModalState
  filter: CalendarFilter
  searchQuery: string
  isLoading: boolean

  filteredEvents: () => CalendarEvent[]

  fetchEvents: () => Promise<void>
  addEvent: (payload: CreateEventPayload) => Promise<void>
  updateEvent: (id: string, updates: UpdateEventPayload) => Promise<void>
  deleteEvent: (id: string) => Promise<void>
  setView: (view: CalendarView) => void
  setDate: (date: Date) => void
  setFilter: (filter: Partial<CalendarFilter>) => void
  resetFilter: () => void
  setSearchQuery: (query: string) => void
  openModal: (mode: "create" | "edit", event?: CalendarEvent) => void
  closeModal: () => void
  selectEvent: (event: CalendarEvent | null) => void
  setLoading: (loading: boolean) => void
}

const defaultFilter: CalendarFilter = {
  category: "",
  priority: "",
}

export const useCalendarStore = create<CalendarStore>((set, get) => ({
  events: [], // Initialize with an empty array, data will be fetched
  selectedEvent: null,
  currentView: "month",
  selectedDate: new Date(),
  modal: { open: false, mode: "create" },
  filter: { ...defaultFilter },
  searchQuery: "",
  isLoading: false,

  filteredEvents: () => {
    const { events, filter, searchQuery } = get()
    return events.filter((event) => {
      if (filter.category && event.category !== filter.category) return false
      if (filter.priority && event.priority !== filter.priority) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        const title = event.title || ""
        const description = event.description || ""
        if (
          !title.toLowerCase().includes(q) &&
          !description.toLowerCase().includes(q)
        )
          return false
      }
      return true
    })
  },

  fetchEvents: async () => {
    set({ isLoading: true })
    try {
      const fetchedEvents = await calendarEventsApi.getAll()
      set({ events: fetchedEvents })
    } catch (error) {
      console.error("Failed to fetch events:", error)
      // Optionally, set an error state
    } finally {
      set({ isLoading: false })
    }
  },

  addEvent: async (payload) => {
    set({ isLoading: true })
    try {
      const newEvent = await calendarEventsApi.create(payload)
      set((state) => ({ events: [newEvent, ...state.events] }))
    } catch (error) {
      console.error("Failed to add event:", error)
    } finally {
      set({ isLoading: false })
    }
  },

  updateEvent: async (id, updates) => {
    set({ isLoading: true })
    try {
      const updatedEvent = await calendarEventsApi.update(id, updates)
      set((state) => ({
        events: state.events.map((e) =>
          e.id === id ? { ...e, ...updatedEvent } : e
        ),
        selectedEvent:
          state.selectedEvent?.id === id
            ? { ...state.selectedEvent, ...updatedEvent }
            : state.selectedEvent,
      }))
    } catch (error) {
      console.error("Failed to update event:", error)
    } finally {
      set({ isLoading: false })
    }
  },

  deleteEvent: async (id) => {
    set({ isLoading: true })
    try {
      await calendarEventsApi.delete(id)
      set((state) => ({
        events: state.events.filter((e) => e.id !== id),
        selectedEvent:
          state.selectedEvent?.id === id ? null : state.selectedEvent,
      }))
    } catch (error) {
      console.error("Failed to delete event:", error)
    } finally {
      set({ isLoading: false })
    }
  },

  setView: (view) => set({ currentView: view }),

  setDate: (date) => set({ selectedDate: date }),

  setFilter: (filter) =>
    set((state) => ({
      filter: { ...state.filter, ...filter },
    })),

  resetFilter: () => set({ filter: { ...defaultFilter } }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  openModal: (mode, event) =>
    set({ modal: { open: true, mode, event } }),

  closeModal: () =>
    set({ modal: { open: false, mode: "create", event: undefined } }),

  selectEvent: (event) => set({ selectedEvent: event }),

  setLoading: (loading) => set({ isLoading: loading }),
}))
