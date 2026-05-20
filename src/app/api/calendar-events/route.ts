import { NextResponse } from "next/server"
import type { CalendarEvent } from "@/features/calendar/types"
import type { CreateEventPayload } from "@/types"
import { calendarEvents } from "./data"

export async function GET() {
  return NextResponse.json(calendarEvents)
}

export async function POST(request: Request) {
  const payload: CreateEventPayload = await request.json()

  const newEvent: CalendarEvent = {
    id: `event-${Date.now()}`,
    title: payload.title,
    description: payload.description || "",
    category: payload.category,
    startDate: payload.startDate,
    endDate: payload.endDate,
    priority: payload.priority,
    location: payload.location || undefined,
    reminder: payload.reminder || false,
    completed: payload.completed || false,
  }

  calendarEvents.push(newEvent)
  return NextResponse.json(newEvent, { status: 201 })
}
