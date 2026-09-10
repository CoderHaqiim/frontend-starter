import { tasks } from "@/src/data/tasks"
import { NextResponse } from "next/server"

const isSameCalendarDate = (firstDate: string, secondDate: Date) => {
  const date = new Date(`${firstDate}T00:00:00`)

  return date.getFullYear() === secondDate.getFullYear()
    && date.getMonth() === secondDate.getMonth()
    && date.getDate() === secondDate.getDate()
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params
  return NextResponse.json(
    tasks.filter((task) => task.businessId === businessId && isSameCalendarDate(task.dueDate, new Date()))
  )
}
