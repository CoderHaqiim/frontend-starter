"use client"

import { ColorTypes } from "@/src/app/design/colors"
import { Task } from "@/src/types/types"
import { priorityColorMap } from "@/src/utils/priorityColorMap"
import { shortenText } from "@/src/utils/shortenText"
import { statusColorMap } from "@/src/utils/statusColorMap"
import Badge from "../base/ui/composites/badge"
import Checkbox from "../base/ui/primitives/checkbox"
import Frame from "../base/ui/primitives/frame"
import Paragraph from "../base/ui/primitives/paragraph"

type TaskLineProps = {
  task: Task
  // Ticking the checkbox saves the task as completed through the tasks route. The
  // card that renders the line answers it, so the line never sends a request of
  // its own.
  onComplete?: (taskId: string) => void
}

export default function TaskLine({ task, onComplete }: TaskLineProps) {
  // The checkbox shows the status the task really holds, so the tick only travels
  // once the task comes back as completed.
  const isCompleted = task.status === "completed"
  const priorityColor = priorityColorMap(task.priority) as ColorTypes
  const statusColor = statusColorMap(task.status) as ColorTypes

  return (
    <Frame className="flex w-full shrink-0 flex-col justify-center gap-[var(--space-sm)] p-[var(--space-md)] text-[length:var(--bodySize-sm)]">
      <Frame className="flex h-max w-full justify-between">
        <Frame className="flex items-center gap-[var(--space-sm)]">
          <Paragraph size="sm" color="textColor1">
            {shortenText(task.title, 40)}
          </Paragraph>
        </Frame>
        <Frame>
          <Checkbox
            name={`task-${task.id}`}
            value={String(task.id)}
            checked={isCompleted}
            onChange={() => {
              // A completed task stays completed: unticking the box does not reopen a
              // task that was already done, so only the tick sends the request.
              if (isCompleted || !onComplete) return

              onComplete(String(task.id))
            }}
            disabled={!onComplete}
            ariaLabel={`Mark ${task.title} as done`}
            size="sm"
          />
        </Frame>
      </Frame>
       <Frame className="gap-[var(--space-sm)]">
        <Badge size="xxs" text={task.priority} color={priorityColor}/>
        <Badge size="xxs" text={task.status} color={statusColor}/>
      </Frame>
    </Frame>
  )
}