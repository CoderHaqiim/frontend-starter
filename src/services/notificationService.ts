import { http } from "@/src/http/client"

export type NotificationItem = {
  id?: number | string
  title?: string
  message?: string
  body?: string
  text?: string
  createdAt?: string
  read?: boolean
}

export function notificationsQueryKey() {
  return ["notifications"]
}

export function getNotifications() {
  return http<NotificationItem[]>("/api/notifications", undefined, { method: "GET" })
}
