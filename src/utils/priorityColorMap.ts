import { Priority } from "@/src/types/types"

export const priorityColorMap = (priority: Priority) => {
  const color: Record<Priority, string> = {
    "high": "error",
    "low": "success",
    "medium": "warning",
    "urgent": "error",
  }

  return (color[priority])
}