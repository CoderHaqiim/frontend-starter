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

// The mutations go through the business tasks route, which answers with the saved
// task next to the message.
export type TaskMutationResponse = {
  message: string
  data: Task
}

// The route validates and coerces what it receives, so a form body is passed on
// unchanged.
type TaskMutationBody = Record<string, unknown>

export function createBusinessTask(businessId: string, task: TaskMutationBody) {
  return http<TaskMutationResponse>(`/api/businesses/${businessId}/tasks`, task, {
    method: "POST",
  })
}

export function updateBusinessTask(businessId: string, taskId: string, updates: TaskMutationBody) {
  return http<TaskMutationResponse>(
    `/api/businesses/${businessId}/tasks?taskId=${encodeURIComponent(taskId)}`,
    updates,
    { method: "PATCH" },
  )
}

export function deleteBusinessTask(businessId: string, taskId: string) {
  return http<TaskMutationResponse>(
    `/api/businesses/${businessId}/tasks?taskId=${encodeURIComponent(taskId)}`,
    undefined,
    { method: "DELETE" },
  )
}
