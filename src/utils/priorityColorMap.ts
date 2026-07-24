export const priorityColorMap = (priority: "high" | "medium" | "low") => {
  const color = {
    "high":"error",
    "low":"success",
    "medium":"warning"
  }

  return (color[priority])
}