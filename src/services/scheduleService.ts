import { http } from "@/src/http/client"
import { Schedule } from "@/src/types/types"

export const schedulesQueryKey = ["schedules"]

export function getSchedules() {
  return http<Schedule[]>("/api/schedules", undefined, { method: "GET" })
}

// The mutations all go through the schedules route, which answers with the
// saved record next to the message.
export type ScheduleMutationResponse = {
  message: string
  data: Schedule
}

// The route validates and coerces what it receives, so a form body is passed on
// unchanged.
type ScheduleMutationBody = Record<string, unknown>

export function createSchedule(schedule: ScheduleMutationBody) {
  return http<ScheduleMutationResponse>("/api/schedules", schedule, { method: "POST" })
}

// The schedules panel marks a schedule as done by sending the status the route
// stores on it.
export function updateScheduleStatus(scheduleId: string, status: Schedule["status"]) {
  return http<ScheduleMutationResponse>(
    `/api/schedules?scheduleId=${encodeURIComponent(scheduleId)}`,
    { status },
    { method: "PATCH" },
  )
}

export function deleteSchedule(scheduleId: string) {
  return http<ScheduleMutationResponse>(
    `/api/schedules?scheduleId=${encodeURIComponent(scheduleId)}`,
    undefined,
    { method: "DELETE" },
  )
}
