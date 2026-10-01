import { syncOverdueTasks, tasks } from "@/src/data/tasks"
import { isDueToday } from "@/src/utils/todayIsoDate"
import { NextResponse } from "next/server"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params
  // Read through the overdue rule, so a task that fell past its due date while the
  // process was running shows as overdue on the card as well as on the board.
  syncOverdueTasks()

  return NextResponse.json(
    tasks.filter((task) => task.businessId === businessId && isDueToday(task.dueDate))
  )
}
