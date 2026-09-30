import { NextResponse } from "next/server"
import { schedules } from "@/src/data/schedules"
import { Schedule, ScheduleRecurrenceFrequency, ScheduleStatus, ScheduleType } from "@/src/types/types"
import {
  badRequestResponse,
  missingQueryParamResponse,
  readQueryParam,
  recordNotFoundResponse,
  toText,
} from "@/src/utils/mockApi"

const scheduleTypes: ScheduleType[] = ["task", "meeting", "reminder", "event"]
const scheduleStatuses: ScheduleStatus[] = ["complete", "pending"]
const scheduleFrequencies: ScheduleRecurrenceFrequency[] = ["daily", "weekly", "monthly", "yearly"]

export async function GET() {
  if (!schedules) {
    return NextResponse.json(
      { message: "Schedules not found" },
      { status: 404 }
    )
  }

  return NextResponse.json(schedules)
}

// Creates a schedule in the store. The date input sends the day the calendar
// was clicked and the time input sends the moment it holds, so the schedule
// stores that day at that time and the day it falls on can be listed.
export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  if (!body) {
    return badRequestResponse("Invalid JSON payload")
  }

  const title = toText(body.title)
  const day = toText(body.startAt)
  const timeInput = toText(body.endAt)
  const time = timeInput.includes("T") ? timeInput.slice(timeInput.indexOf("T") + 1) : ""

  if (!title) {
    return badRequestResponse("title is required")
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) {
    return badRequestResponse("startAt must be a date like 2026-09-30")
  }

  const startAt = `${day}T${time || "00:00:00"}`
  const now = new Date().toISOString()
  const rawType = toText(body.type)
  const type = scheduleTypes.find((choice) => choice === rawType) ?? "meeting"
  const rawFrequency = toText(body.recurrenceFrequency)
  const frequency = scheduleFrequencies.find((choice) => choice === rawFrequency)

  const schedule: Schedule = {
    id: `sch_${Date.now()}`,
    businessId: toText(body.businessId),
    title,
    description: toText(body.description),
    type,
    status: "pending",
    startAt,
    endAt: startAt,
    allDay: false,
    location: toText(body.location),
    recurrence: {
      enabled: Boolean(frequency),
      frequency,
    },
    createdAt: now,
    updatedAt: now,
  }

  schedules.unshift(schedule)

  return NextResponse.json(
    { message: "Schedule created successfully", data: schedule },
    { status: 201 }
  )
}

// Updates the status of a schedule, which is how the schedules panel marks one
// as done. The id travels on the query parameter, so the schedule stays on one
// route.
export async function PATCH(request: Request) {
  const scheduleId = readQueryParam(request, "scheduleId")

  if (!scheduleId) {
    return missingQueryParamResponse("scheduleId")
  }

  const schedule = schedules.find((item) => item.id === scheduleId)

  if (!schedule) {
    return recordNotFoundResponse("Schedule", scheduleId)
  }

  const body = await request.json().catch(() => null)

  if (!body) {
    return badRequestResponse("Invalid JSON payload")
  }

  const status = scheduleStatuses.find((choice) => choice === toText(body.status))

  if (!status) {
    return badRequestResponse(`status must be one of ${scheduleStatuses.join(", ")}`)
  }

  schedule.status = status
  schedule.updatedAt = new Date().toISOString()

  return NextResponse.json({
    message: `Schedule ${scheduleId} updated successfully`,
    data: schedule,
  })
}

// Removes a schedule from the store, which is how the schedules panel deletes one.
export async function DELETE(request: Request) {
  const scheduleId = readQueryParam(request, "scheduleId")

  if (!scheduleId) {
    return missingQueryParamResponse("scheduleId")
  }

  const scheduleIndex = schedules.findIndex((item) => item.id === scheduleId)

  if (scheduleIndex === -1) {
    return recordNotFoundResponse("Schedule", scheduleId)
  }

  const [deletedSchedule] = schedules.splice(scheduleIndex, 1)

  return NextResponse.json({
    message: `Schedule ${scheduleId} deleted successfully`,
    data: deletedSchedule,
  })
}