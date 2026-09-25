import { tasks } from "@/src/data/tasks"
import { Priority, Task, TaskStatus } from "@/src/types/types"
import {
  badRequestResponse,
  businessNotFoundResponse,
  findBusiness,
  matchChoice,
  missingQueryParamResponse,
  normalizeText,
  readBody,
  readQueryParam,
  recordNotFoundResponse,
} from "@/src/utils/mockApi"
import { NextResponse } from "next/server"

const taskPriorities: Priority[] = ["low", "medium", "high", "urgent"]
const taskStatuses: TaskStatus[] = ["pending", "in-progress", "completed", "overdue"]

// Ids continue the numbering the store is seeded with.
const nextTaskId = () =>
  String(tasks.reduce((highest, task) => Math.max(highest, Number(task.id) || 0), 0) + 1)

const readAssignee = (value: unknown): Task["assignee"] => {
  if (typeof value !== "object" || value === null) return undefined

  const assignee = value as Record<string, unknown>
  const name = normalizeText(assignee.name)

  if (!name) return undefined

  const avatar = normalizeText(assignee.avatar)

  return avatar ? { name, avatar } : { name }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params
  return NextResponse.json(tasks.filter((task) => task.businessId === businessId))
}

// Creates a task for a business.
export async function POST(
  request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params

  if (!findBusiness(businessId)) {
    return businessNotFoundResponse()
  }

  const body = await readBody(request)

  if (!body) {
    return badRequestResponse("Invalid JSON payload")
  }

  const title = normalizeText(body.title)
  const dueDate = normalizeText(body.dueDate)
  const priority =
    body.priority === undefined || body.priority === ""
      ? "medium"
      : matchChoice(body.priority, taskPriorities)
  const status =
    body.status === undefined || body.status === ""
      ? "pending"
      : matchChoice(body.status, taskStatuses)

  if (!title) {
    return badRequestResponse("title is required")
  }

  if (!dueDate) {
    return badRequestResponse("dueDate is required")
  }

  if (!priority) {
    return badRequestResponse(`priority must be one of ${taskPriorities.join(", ")}`)
  }

  if (!status) {
    return badRequestResponse(`status must be one of ${taskStatuses.join(", ")}`)
  }

  const task: Task = {
    id: nextTaskId(),
    title,
    description: normalizeText(body.description),
    businessId,
    dueDate,
    priority: priority as Priority,
    status: status as TaskStatus,
  }

  const assignee = readAssignee(body.assignee)

  if (assignee) {
    task.assignee = assignee
  }

  tasks.push(task)

  return NextResponse.json(
    { message: `Task ${task.id} created successfully`, data: task },
    { status: 201 }
  )
}

// Updates a task for a business. The task id is read from the `taskId` query
// parameter, so the tasks stay on one route.
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params

  if (!findBusiness(businessId)) {
    return businessNotFoundResponse()
  }

  const taskId = readQueryParam(request, "taskId")

  if (!taskId) {
    return missingQueryParamResponse("taskId")
  }

  const task = tasks.find((item) => item.id === taskId && item.businessId === businessId)

  if (!task) {
    return recordNotFoundResponse("Task", taskId)
  }

  const body = await readBody(request)

  if (!body) {
    return badRequestResponse("Invalid JSON payload")
  }

  if (body.title !== undefined) {
    const title = normalizeText(body.title)

    if (!title) {
      return badRequestResponse("title cannot be empty")
    }

    task.title = title
  }

  if (body.description !== undefined) {
    task.description = normalizeText(body.description)
  }

  if (body.dueDate !== undefined) {
    const dueDate = normalizeText(body.dueDate)

    if (!dueDate) {
      return badRequestResponse("dueDate cannot be empty")
    }

    task.dueDate = dueDate
  }

  if (body.priority !== undefined) {
    const priority = matchChoice(body.priority, taskPriorities)

    if (!priority) {
      return badRequestResponse(`priority must be one of ${taskPriorities.join(", ")}`)
    }

    task.priority = priority as Priority
  }

  if (body.status !== undefined) {
    const status = matchChoice(body.status, taskStatuses)

    if (!status) {
      return badRequestResponse(`status must be one of ${taskStatuses.join(", ")}`)
    }

    task.status = status as TaskStatus
  }

  if (body.assignee !== undefined) {
    const assignee = readAssignee(body.assignee)

    if (assignee) {
      task.assignee = assignee
    } else {
      delete task.assignee
    }
  }

  return NextResponse.json({
    message: `Task ${taskId} updated successfully`,
    data: task,
  })
}

// Removes a task for a business. The task id is read from the `taskId` query
// parameter.
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params

  if (!findBusiness(businessId)) {
    return businessNotFoundResponse()
  }

  const taskId = readQueryParam(request, "taskId")

  if (!taskId) {
    return missingQueryParamResponse("taskId")
  }

  const taskIndex = tasks.findIndex(
    (item) => item.id === taskId && item.businessId === businessId
  )

  if (taskIndex === -1) {
    return recordNotFoundResponse("Task", taskId)
  }

  const [deletedTask] = tasks.splice(taskIndex, 1)

  return NextResponse.json({
    message: `Task ${taskId} deleted successfully`,
    data: deletedTask,
  })
}
