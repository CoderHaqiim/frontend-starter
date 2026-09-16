import { ColorTypes } from "@/src/app/design/colors"
import { Task } from "@/src/types/types"
import { priorityColorMap } from "@/src/utils/priorityColorMap"
import { statusColorMap } from "@/src/utils/statusColorMap"
import Badge from "../base/ui/composites/badge"
import Tooltip from "../base/ui/composites/tooltip"
import Button from "../base/ui/primitives/button"
import Frame from "../base/ui/primitives/frame"
import Paragraph from "../base/ui/primitives/paragraph"

type TaskItemProp = {
  task: Task
}

export default function TaskItem({ task }: TaskItemProp) {
  const priorityColor = priorityColorMap(task.priority) as ColorTypes
  const statusColor = statusColorMap(task.status) as ColorTypes

  return (
    <Frame className="w-full p-[var(--space-lg)] flex-col gap-[var(--space-sm)]">
      <Frame className="justify-between flex-1">
        <Frame className="flex-col">
          <Frame>
            <Paragraph color="textColor1" weight="normal" size="md">
              {task.description}
            </Paragraph>
          </Frame>

          <Frame>
            {/* <Paragraph weight="light" size="xs">
              {task.business}
            </Paragraph> */}
          </Frame>
        </Frame>

        <Frame>
          <Tooltip content="task menu">
            <Button variant="outline" size="sm" iconName="icon-vertival-dots" isIcon specificStyles={{
              border:"0",
              backgroundColor: `var(--color-white)`
            }}/>
          </Tooltip>
        </Frame>
      </Frame>

      <Frame className="gap-[var(--space-sm)]">
        <Badge text={task.priority} color={priorityColor} size="xxs" />
        <Badge text={task.status} color={statusColor} size="xxs" />
      </Frame>
    </Frame>
  )
}