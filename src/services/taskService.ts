import { http } from "@/src/http/client"
import { Task } from "@/src/types/types"

export function businessTasksQueryKey(businessId: string) {
  return ["business-tasks", businessId]
}

export function todayBusinessTasksQueryKey(businessId: string) {
  return ["today-business-tasks", businessId]
}

export function getBusinessTasks(businessId: string) {
  return http<Task[]>(`/api/businesses/${businessId}/tasks`, undefined, { method: "GET" })
}

export function getTodayBusinessTasks(businessId: string) {
  return http<Task[]>(`/api/businesses/${businessId}/tasks/today`)
}
