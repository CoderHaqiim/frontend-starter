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
    <Frame width="stretch" direction="column" gap="xxs" padding="md" className="rounded-[var(--radius-md)] bg-muted">
      <Paragraph size="sm" weight="normal" color='textColor1' specificStyle={{ lineHeight: '1.4' }}>
        {shortenText(goal.description, 30)}
      </Paragraph>
      <Frame justify="space-between" align="center" height="hug" gap="sm">
        <Paragraph size="xxs">
          Start: {goal.setDate}
        </Paragraph>
        <Frame align="center" gap="xs">
            <Icon size="xs" name="icon-clock"/>
            <Paragraph size="xxs">
                {goal.remaining}
            </Paragraph>
        </Frame>
      </Frame>
    </Frame>
  )
}
