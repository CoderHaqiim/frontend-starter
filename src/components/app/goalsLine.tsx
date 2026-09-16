"use client"

import { GoalsType } from '@/src/types/types'
import { healthMap } from '@/src/utils/healthMap'
import { scoreHealthMap } from '@/src/utils/scoreHealthMap'
import LinearProgress from '../base/ui/composites/linearProgressBar'
import Tooltip from '../base/ui/composites/tooltip'
import Button from '../base/ui/primitives/button'
import Frame from '../base/ui/primitives/frame'
import Icon from '../base/ui/primitives/icon'
import Paragraph from '../base/ui/primitives/paragraph'
import { useTheme } from '../providers/themeProvider'

type GoalsLineProps = {
  goal: GoalsType
}

export default function GoalsLine({ goal }: GoalsLineProps) {
  const { colors } = useTheme()

  return (
    <Frame className="w-full gap-[var(--space-xs)] flex-col h-max p-[var(--space-lg)]">
      <Frame className="justify-center gap-[var(--space-xs)] flex-col">
        <Frame className="justify-between">
          <Frame className="w-[200px]">
            <LinearProgress
              showPercentage={false}
              insertedText="3 days remaining"
              color={healthMap[scoreHealthMap(80)]}
              height={5}
              score={80}
            />
          </Frame>

          <Frame className="w-max gap-[var(--space-sm)] ml-[var(--space-sm)]">
            <Tooltip content="delete goal">
              <Button
                isIcon
                iconColor="error"
                iconName="icon-delete"
                variant="outline"
                size="sm"
              />
            </Tooltip>

            <Tooltip content="mark as achieved">
              <Button
                isIcon
                iconColor="success"
                iconName="icon-double-check"
                variant="outline"
                size="sm"
              />
            </Tooltip>
          </Frame>
        </Frame>

        <Frame className="w-full flex-col gap-[var(--space-md)]">
          <Paragraph
            size="sm"
            color="textColor1"
            specificStyle={{ lineHeight: "1.3" }}
          >
            {goal.description}
          </Paragraph>

          <Frame className="gap-[var(--space-lg)] items-center h-max">
            <Frame className="gap-[var(--space-xs)] items-center">
              <Paragraph size="xxs">
                Start Date:
              </Paragraph>
              <Paragraph size="xxs">
                {goal.setDate}
              </Paragraph>
            </Frame>

            <Frame className="items-center h-max gap-[var(--space-xs)]">
              <Icon size="xs" name="icon-clock" color="textColor1" />
              <Paragraph size="xxs">
                {goal.duration}
              </Paragraph>
            </Frame>

            <Frame className="gap-[var(--space-xs)] items-center">
              <Paragraph size="xxs">
                Category:
              </Paragraph>
              <Paragraph size="xxs">
                {goal.category}
              </Paragraph>
            </Frame>
          </Frame>
        </Frame>
      </Frame>
    </Frame>
  )
}