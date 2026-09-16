import { http } from "@/src/http/client"
import { Schedule } from "@/src/types/types"

export const schedulesQueryKey = ["schedules"]

export function getSchedules() {
  return http<Schedule[]>("/api/schedules", undefined, { method: "GET" })
}
