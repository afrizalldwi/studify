import { NextResponse } from "next/server"

const cards: Record<string, Array<{
  id: string
  deckId: string
  question: string
  answer: string
  difficulty: "easy" | "medium" | "hard"
  lastReviewed?: string
  nextReview?: string
}>> = {
  "1": [
    { id: "c1", deckId: "1", question: "What is mitosis?", answer: "Cell division producing two identical daughter cells", difficulty: "medium" },
    { id: "c2", deckId: "1", question: "What is DNA?", answer: "Deoxyribonucleic acid, the genetic material", difficulty: "easy" },
    { id: "c3", deckId: "1", question: "Define meiosis", answer: "Cell division producing four gamete cells", difficulty: "hard" },
    { id: "c4", deckId: "1", question: "What are chromosomes?", answer: "Thread-like structures carrying genetic information", difficulty: "medium" },
    { id: "c5", deckId: "1", question: "What is a gene?", answer: "A unit of heredity", difficulty: "easy" },
  ],
  "2": [
    { id: "c6", deckId: "2", question: "How do you say 'hello' in French?", answer: "Bonjour", difficulty: "easy" },
    { id: "c7", deckId: "2", question: "How do you say 'thank you' in French?", answer: "Merci", difficulty: "easy" },
    { id: "c8", deckId: "2", question: "How do you say 'goodbye' in French?", answer: "Au revoir", difficulty: "easy" },
  ],
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  return NextResponse.json(cards[id] || [])
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await request.json()
  const card = {
    id: `c${Date.now()}`,
    deckId: id,
    question: body.question,
    answer: body.answer,
    difficulty: body.difficulty || "medium",
  }
  if (!cards[id]) cards[id] = []
  cards[id].push(card)
  return NextResponse.json(card, { status: 201 })
}
