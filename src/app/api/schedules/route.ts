import { NextResponse } from "next/server"
import { schedules } from "@/src/data/schedules"

export async function GET() {
  if (!schedules) {
    return NextResponse.json(
      { message: "Schedules not found" },
      { status: 404 }
    )
  }

  return NextResponse.json(schedules)
}

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