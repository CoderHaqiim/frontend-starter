import Frame from '../ui/primitives/frame'
import Paragraph from '../ui/primitives/paragraph'
import { GoalsType } from '@/src/types/types'
import { shortenText } from '@/src/utils/shortenText'
import Icon from '../ui/primitives/icon'

type GoalsItemProps = {
  goal: GoalsType
}

export default function GoalsItem({ goal }: GoalsItemProps) {
  return (
    <Frame className="flex w-full flex-col gap-[var(--space-xxs)] rounded-[var(--radius-md)] bg-muted p-[var(--space-md)]">
      <Paragraph
        size="sm"
        weight="normal"
        color="textColor1"
        specificStyle={{ lineHeight: '1.4' }}
      >
        {shortenText(goal.description, 30)}
      </Paragraph>

      <Frame className="flex h-max w-full items-center justify-between gap-[var(--space-sm)]">
        <Paragraph size="xxs">
          Start: {goal.setDate}
        </Paragraph>

        <Frame className="flex items-center gap-[var(--space-xs)]">
          <Icon size="xs" name="icon-clock" />
          <Paragraph size="xxs">
            {goal.remaining}
          </Paragraph>
        </Frame>
      </Frame>
    </Frame>
  )
}