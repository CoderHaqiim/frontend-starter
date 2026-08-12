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
    <Frame width="stretch" direction="column" gap="xs" padding="lg" className="rounded-[var(--radius-md)] bg-muted">
      <Paragraph size="sm" weight="normal" specificStyle={{ lineHeight: '1.4' }}>
        {shortenText(goal.description, 30)}
      </Paragraph>
      <Frame justify="space-between" align="center" height="hug" gap="sm">
        <Paragraph size="xxs" color="textColor1">
          Start: {goal.setDate}
        </Paragraph>
        <Frame align="center" gap="xs">
            <Icon size="xs" name="icon-clock"/>
            <Paragraph size="xxs" color="textColor1">
                {goal.remaining}
            </Paragraph>
        </Frame>
      </Frame>
    </Frame>
  )
}
