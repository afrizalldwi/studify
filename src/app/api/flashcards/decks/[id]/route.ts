import { NextResponse } from "next/server"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const decks: Array<{
    id: string
    title: string
    description?: string
    userId: string
    createdAt: string
    cardCount: number
  }> = [
    {
      id: "1",
      title: "Biology Chapter 3",
      description: "Cell division and genetics",
      userId: "1",
      createdAt: new Date().toISOString(),
      cardCount: 5,
    },
    {
      id: "2",
      title: "French Vocabulary",
      description: "Common phrases and greetings",
      userId: "1",
      createdAt: new Date().toISOString(),
      cardCount: 3,
    },
  ]

  const deck = decks.find((d) => d.id === id)
  if (!deck) {
    return NextResponse.json(
      { message: "Deck not found" },
      { status: 404 }
    )
  }
  return NextResponse.json(deck)
}

export async function DELETE() {
  return NextResponse.json({ message: "Deleted" })
}
