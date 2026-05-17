import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    id: "1",
    name: "User",
    email: "user@studify.com",
    avatar: undefined,
    createdAt: new Date().toISOString(),
  })
}
