import { QueryClient } from "@tanstack/react-query"
import { isDueToday } from "@/src/utils/todayIsoDate"
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

// The board and the today card are two queries over the same tasks, so a task that
// is created, changed or removed has to move both of them at once. Every mutation
// refreshes through here so the two can never drift apart.
//
// `refetchType: "all"` matters: the board is only open on the tasks page and the
// today card only on the overview page, so at the moment a task is saved one of the
// two is usually not on screen. The default refetches mounted queries only, which
// leaves the other one holding yesterday's tasks until the page happens to be
// visited again.
export function refreshBusinessTaskViews(queryClient: QueryClient, businessId: string) {
  queryClient.invalidateQueries(
    { queryKey: businessTasksQueryKey(businessId), refetchType: "all" },
  )
  queryClient.invalidateQueries(
    { queryKey: todayBusinessTasksQueryKey(businessId), refetchType: "all" },
  )
}

// Whether a task belongs in the today card, read from the same rule the today route
// applies. The card is fed by that route, so a write made straight into the cache has
// to agree with it, or a task due today would appear for a moment and then vanish
// when the refetch lands.
export function belongsInTodayTasks(task: Task) {
  return isDueToday(task.dueDate)
}

// Puts a task into the today cache straight away when it is due today, and takes it
// back out when its due date has moved to another day. Editing a due date is what
// moves a task in and out of the card, so the card follows the edit without waiting
// for the round trip.
export function syncTodayTaskCache(
  queryClient: QueryClient,
  businessId: string,
  task: Task,
) {
  queryClient.setQueryData<Task[]>(todayBusinessTasksQueryKey(businessId), (currentTasks = []) =>
    belongsInTodayTasks(task)
      ? [...currentTasks.filter((entry) => String(entry.id) !== String(task.id)), task]
      : currentTasks.filter((entry) => String(entry.id) !== String(task.id)),
  )
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
