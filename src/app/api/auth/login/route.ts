import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password } = body

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    )
  }

  return NextResponse.json({
    user: {
      id: "1",
      name: email.split("@")[0],
      email,
      avatar: undefined,
      createdAt: new Date().toISOString(),
    },
    token: "mock-token-studify",
  })
}
