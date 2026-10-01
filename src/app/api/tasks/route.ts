import { syncOverdueTasks, tasks } from "@/src/data/tasks"
import { NextResponse } from "next/server"

export async function GET(){
    // Read through the overdue rule, so a task that fell past its due date while the
    // process was running is reported as overdue here as well.
    syncOverdueTasks()

    return NextResponse.json(tasks)
}