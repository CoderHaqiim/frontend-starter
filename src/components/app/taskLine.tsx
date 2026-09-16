import { Task } from "@/src/types/types"
import { shortenText } from "@/src/utils/shortenText"
import Badge from "../base/ui/composites/badge"
import Checkbox from "../base/ui/primitives/checkbox"
import Frame from "../base/ui/primitives/frame"
import Paragraph from "../base/ui/primitives/paragraph"

type TaskLineProps = {
  task: Task
}

export default function TaskLine({task}: TaskLineProps) {
  return (
    <Frame className="flex w-full shrink-0 flex-col justify-center gap-[var(--space-sm)] p-[var(--space-md)] text-[length:var(--bodySize-sm)]">
      <Frame className="flex h-max w-full justify-between">
        <Frame className="flex items-center gap-[var(--space-sm)]">
          <Paragraph size="sm" color="textColor1">
            {shortenText(task.title, 40)}
          </Paragraph>
        </Frame>
        <Frame>
          <Checkbox name={`task-${task.id}`} value={task.id.toString()} defaultChecked={task.status === 'completed'} ariaLabel={`Mark ${task.title} as done`} size="sm"/>
        </Frame>
      </Frame>
       <Frame className="gap-[var(--space-sm)]">
        <Badge size="xxs" text={task.priority} color="error"/>
        <Badge size="xxs" text={task.status} color="success"/>
      </Frame>
    </Frame>
  )
}