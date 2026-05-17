import { NextResponse } from "next/server"

const sessions: Array<{
  id: string
  title: string
  subject: string
  duration: number
  notes?: string
  date: string
  completed: boolean
  userId: string
}> = [
  {
    id: "1",
    title: "Math Chapter 5 Review",
    subject: "Mathematics",
    duration: 90,
    notes: "Covered algebra and geometry fundamentals",
    date: new Date().toISOString(),
    completed: true,
    userId: "1",
  },
  {
    id: "2",
    title: "Biology Cell Division",
    subject: "Biology",
    duration: 60,
    notes: "Studied mitosis and meiosis",
    date: new Date().toISOString(),
    completed: false,
    userId: "1",
  },
]

export async function GET() {
  return NextResponse.json(sessions)
}

export async function POST(request: Request) {
  const body = await request.json()
  const session = {
    id: String(sessions.length + 1),
    title: body.title,
    subject: body.subject,
    duration: body.duration || 0,
    notes: body.notes,
    date: new Date().toISOString(),
    completed: body.completed || false,
    userId: "1",
  }
  sessions.push(session)
  return NextResponse.json(session, { status: 201 })
}
