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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = sessions.find((s) => s.id === id)
  if (!session) {
    return NextResponse.json(
      { message: "Session not found" },
      { status: 404 }
    )
  }
  return NextResponse.json(session)
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const idx = sessions.findIndex((s) => s.id === id)
  if (idx === -1) {
    return NextResponse.json(
      { message: "Session not found" },
      { status: 404 }
    )
  }
  const body = await request.json()
  sessions[idx] = { ...sessions[idx], ...body }
  return NextResponse.json(sessions[idx])
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const idx = sessions.findIndex((s) => s.id === id)
  if (idx === -1) {
    return NextResponse.json(
      { message: "Session not found" },
      { status: 404 }
    )
  }
  sessions.splice(idx, 1)
  return NextResponse.json({ message: "Deleted" })
}
