export type EventCategory = "Assignment" | "Study Session" | "Exam" | "Meeting" | "Personal"
export type EventPriority = "Low" | "Medium" | "High"
export type CalendarView = "month" | "week" | "day"

export interface CalendarEvent {
  id: string
  title: string
  description: string
  category: EventCategory
  startDate: string
  endDate: string
  priority: EventPriority
  location?: string
  reminder?: boolean
  completed: boolean
}

export interface CalendarFilter {
  category: string
  priority: string
}

export interface CalendarModalState {
  open: boolean
  mode: "create" | "edit"
  event?: CalendarEvent
}
