export const statusColorMap = (status: "completed" | "complete" | "in-progress" | "overdue" | "cancelled" | "pending") => {
  const color = {
    "completed":"success",
    "complete":"success",
    "in-progress":"info",
    "pending":"warning",
    "cancelled":"muted",
    "overdue" : "error"
  }

  return (color[status])
}