import { NextResponse } from "next/server"
import type { UpdateEventPayload } from "@/types"
import { calendarEvents } from "../data"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const event = calendarEvents.find((e) => e.id === id)
  if (!event) {
    return NextResponse.json({ message: "Event not found" }, { status: 404 })
  }
  return NextResponse.json(event)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const updates: UpdateEventPayload = await request.json()
  const idx = calendarEvents.findIndex((e) => e.id === id)
  if (idx === -1) {
    return NextResponse.json({ message: "Event not found" }, { status: 404 })
  }
  calendarEvents[idx] = { ...calendarEvents[idx], ...updates }
  return NextResponse.json(calendarEvents[idx])
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const idx = calendarEvents.findIndex((e) => e.id === id)
  if (idx === -1) {
    return NextResponse.json({ message: "Event not found" }, { status: 404 })
  }
  calendarEvents.splice(idx, 1)
  return NextResponse.json({ message: "Event deleted" })
}
