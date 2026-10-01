import { Task, TaskStatus } from "@/src/types/types"
import { toIsoDate } from "@/src/utils/dateRange"

/*
 * A task is only overdue once its due date is in the past.
 *
 * The status is derived rather than entered: a task whose day has arrived and
 * that is still open is overdue, whether or not anybody moved it there, and a
 * task that is marked overdue while its due date is today or later is not, since
 * the day it was due for has not gone by. Deriving it in one place keeps the
 * task board, the health score and the store from disagreeing about the same
 * task.
 *
 * Dates are compared as the ISO strings the store keeps, so the comparison stays
 * string-only. The day a task falls due is the day itself and not yet past, so
 * only a date strictly before today counts.
 */
export const isPastDue = (dueDate: string, today: Date = new Date()) =>
  Boolean(dueDate) && dueDate < toIsoDate(today)

// Whether a task is overdue: its day has passed and it has not been completed.
export const isTaskOverdue = (task: Task, today: Date = new Date()) =>
  task.status !== "completed" && isPastDue(task.dueDate, today)

/*
 * The status a task is read as. A completed task is left alone, an open task
 * past its due date is overdue, and a task that claims to be overdue before its
 * day has gone by falls back to pending, which is what an open task that is not
 * yet due is. Completed is the only status a task is never moved off: finishing
 * the work is recorded, and the due date does not undo it.
 */
export const resolveTaskStatus = (task: Task, today: Date = new Date()): TaskStatus => {
  if (task.status === "completed") return "completed"
  if (isPastDue(task.dueDate, today)) return "overdue"

  return task.status === "overdue" ? "pending" : task.status
}

// The task with its derived status written back, left untouched when the status
// it already holds is the one it resolves to.
export const withResolvedStatus = (task: Task, today: Date = new Date()): Task => {
  const status = resolveTaskStatus(task, today)

  return status === task.status ? task : { ...task, status }
}