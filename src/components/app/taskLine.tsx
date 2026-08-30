import Frame from "../ui/primitives/frame"
import Paragraph from "../ui/primitives/paragraph"
import { shortenText } from "@/src/utils/shortenText"
import Badge from "../ui/composites/badge"
import { Task } from "@/src/types/types"
import Checkbox from "../ui/primitives/checkbox"

type TaskLineProps = {
  task: Task
}

export default function TaskLine({task}: TaskLineProps) {
  return (
    <Frame
      className="flex w-full shrink-0 flex-col justify-center gap-[var(--space-sm)] p-[var(--space-md)] text-[length:var(--bodySize-sm)]"
    >
      <Frame className="flex items-center gap-[var(--space-md)]">
        <Checkbox
          name={`task-${task.id}`}
          value={task.id.toString()}
          defaultChecked={task.status === 'completed'}
          ariaLabel={`Mark ${task.title} as done`}
          size="sm"
        />
        <Paragraph size="sm" color="textColor1">
          {shortenText(task.title, 40)}
        </Paragraph>
      </Frame>

      <Frame className="flex items-center justify-between">
        <Frame className="flex h-max w-full gap-[var(--space-xs)]">
          <Badge size="xxs" text={task.priority} color="error"/>
          <Badge size="xxs" text={task.status} color="success"/>
        </Frame>
      </Frame>
    </Frame>
  )
}