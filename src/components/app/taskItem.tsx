import Frame from "../ui/primitives/frame"
import Paragraph from "../ui/primitives/paragraph"
import Tooltip from "../ui/composites/tooltip"
import Button from "../ui/primitives/button"
import { Task } from "@/src/types/types"
import Badge from "../ui/composites/badge"
import { priorityColorMap } from "@/src/utils/priorityColorMap"
import { statusColorMap } from "@/src/utils/statusColorMap"
import { ColorTypes } from "@/src/app/design/colors"


type TaskItemProp = {
    task: Task
}

export default function TaskItem({task}:TaskItemProp) {
    const priorityColor = priorityColorMap(task.priority) as ColorTypes
    const statusColor = statusColorMap(task.status) as ColorTypes

  return (
    <Frame width="stretch" padding="md" direction="column" gap="sm">
        <Frame justify="space-between" className="flex-1">
            <Frame direction="column">
                <Frame gap="lg">
                    <Paragraph color="textColor1" size="md">
                        {task.description}
                    </Paragraph>
                </Frame>
                <Frame>
                    <Paragraph weight="light" size="xs">{task.business}</Paragraph>
                </Frame>
            </Frame>
            <Frame>
                <Tooltip content="task menu">
                    <Button variant="outline" size="sm" iconName="icon-vertival-dots" isIcon/>
                </Tooltip>
            </Frame>
        </Frame>
        <Frame gap="sm">
            <Badge text={task.priority} color={priorityColor} size="xxs"/>
            <Badge text={task.status} color={statusColor} size="xxs"/>
        </Frame>
    </Frame>
  )
}