import { tasks } from "@/src/data/tasks"
import { NextResponse } from "next/server"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params
  return NextResponse.json(tasks.filter((task) => task.businessId === businessId))
}
