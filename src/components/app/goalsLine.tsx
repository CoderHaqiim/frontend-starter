"use client"

import { useTheme } from './themeProvider'
import Frame from '../ui/primitives/frame'
import { GoalsType } from '@/src/types/types'
import Paragraph from '../ui/primitives/paragraph'
import Button from '../ui/primitives/button'
import Icon from '../ui/primitives/icon'
import LinearProgress from '../ui/composites/linearProgressBar'
import { scoreHealthMap } from '@/src/utils/scoreHealthMap'
import { healthMap } from '@/src/utils/healthMap'
import Tooltip from '../ui/composites/tooltip'

type GoalsLineProps = {
    goal: GoalsType
}
export default function GoalsLine({goal}: GoalsLineProps) {
 const {colors} = useTheme()

  return (
    <Frame width="stretch" gap="xs" direction='column' height="hug" padding='lg'>
        <Frame justify='center' gap="sm" direction="column">
            <Frame justify="space-between">
                <Frame width="200px">
                    <LinearProgress showPercentage={false} insertedText="3 days remaining" color={healthMap[scoreHealthMap(80)]} height={5} score={80}/>
                </Frame>
                <Frame width="hug" gap="sm" className='ml-[var(--space-sm)]'>
                    <Tooltip content="delete goal">
                         <Button isIcon iconColor='error' iconName="icon-delete" variant='outline' size='sm'/>
                    </Tooltip>
                    <Tooltip content="mark as achieved">
                        <Button isIcon iconColor='success' iconName="icon-double-check" variant='outline' size='sm'/>
                    </Tooltip>
                </Frame>
            </Frame>
            <Frame width="stetch" direction='column' gap="md">
                <Paragraph weight='normal' size='sm' color="textColor1" specificStyle={{ lineHeight: "1.3"}}>
                    {goal.description}
                </Paragraph>
                <Frame gap='lg' align='center' height="hug">
                    <Frame gap='xs' align='center'>
                        <Paragraph size='xxs'>
                            Start Date: 
                        </Paragraph>
                        <Paragraph size='xxs'>
                            { goal.setDate}
                        </Paragraph>
                    </Frame>
                    <Frame align='center' height="hug" gap='xs'>
                        <Icon size="xs" name="icon-clock" color="textColor1"/>
                        <Paragraph size='xxs'>
                            { goal.duration}
                        </Paragraph>
                    </Frame>
                    <Frame gap='xs' align='center'>
                        <Paragraph size='xxs'>
                            Category: 
                        </Paragraph>
                        <Paragraph size='xxs'>
                            { goal.category}
                        </Paragraph>
                    </Frame>
                </Frame>
            </Frame>
        </Frame>
    </Frame>
  )
}
