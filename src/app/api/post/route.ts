import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    console.log("Received schedule payload:", body)

    return NextResponse.json({
      message: "Schedule received successfully",
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