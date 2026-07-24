export const statusColorMap = (status: "completed" | "in-progress" | "overdue" | "cancelled" | "pending") => {
  const color = {
    "completed":"success",
    "in-progress":"info",
    "pending":"warning",
    "cancelled":"muted",
    "overdue" : "error"
  }

  return (color[status])
}