import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    console.log("Received payload:", body)

    if (body.action === "login") {
      return NextResponse.json(
        { message: "Login failed: invalid email or password." },
        { status: 401 }
      )
    }

    return NextResponse.json({
      message: body.action === "signup"
        ? "Signup request received successfully."
        : "Request received successfully.",
      data: body,
    })
  } catch (error) {
    console.error("Failed to parse schedule payload:", error)

    return NextResponse.json(
      { message: "Invalid JSON payload" },
      { status: 400 }
    )
  }
}