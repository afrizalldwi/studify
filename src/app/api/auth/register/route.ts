import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, password } = body

  if (!name || !email || !password) {
    return NextResponse.json(
      { message: "Name, email, and password are required" },
      { status: 400 }
    )
  }

  return NextResponse.json({
    user: {
      id: "1",
      name,
      email,
      avatar: undefined,
      createdAt: new Date().toISOString(),
    },
    token: "mock-token-studify",
  })
}
