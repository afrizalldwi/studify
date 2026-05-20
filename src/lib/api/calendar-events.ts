import apiClient from "./client"
import { CalendarEvent } from "@/features/calendar/types"
import { CreateEventPayload, UpdateEventPayload } from "@/types"

export const calendarEventsApi = {
  getAll: async (): Promise<CalendarEvent[]> => {
    const { data } = await apiClient.get<CalendarEvent[]>("/calendar-events")
    return data
  },

  getById: async (id: string): Promise<CalendarEvent> => {
    const { data } = await apiClient.get<CalendarEvent>(`/calendar-events/${id}`)
    return data
  },

  create: async (payload: CreateEventPayload): Promise<CalendarEvent> => {
    const { data } = await apiClient.post<CalendarEvent>("/calendar-events", payload)
    return data
  },

  update: async (id: string, payload: UpdateEventPayload): Promise<CalendarEvent> => {
    const { data } = await apiClient.put<CalendarEvent>(`/calendar-events/${id}`, payload)
    return data
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/calendar-events/${id}`)
  },
}
