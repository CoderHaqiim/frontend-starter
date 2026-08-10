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

type GoalsLineProps = {
    goal: GoalsType
}
export default function GoalsLine({goal}: GoalsLineProps) {
 const {colors} = useTheme()

  return (
    <Frame width="stretch" gap="xs" direction='column' height="hug" padding='lg'>
        <Frame>
            <Frame className='flex-1' direction='column' gap="sm">
                <Frame width="200px" className='mb-[var(--space-md)]'>
                    <LinearProgress showPercentage={false} insertedText="3 days remaining" color={healthMap[scoreHealthMap(80)]} height={5} score={80}/>
                </Frame>
                <Paragraph size='sm' color='textColor1' specificStyle={{ lineHeight: "1.4"}}>
                    {goal.description}
                </Paragraph>
                <Frame gap='lg'>
                    <Frame gap='xs' align='center'>
                        <Paragraph size='xxs' color='textColor1'>
                            Start Date: 
                        </Paragraph>
                        <Paragraph size='xxs'>
                            { goal.setDate}
                        </Paragraph>
                    </Frame>
                    <Frame align='center' gap='xs'>
                        <Icon size="xs" name="icon-clock" color="textColor1"/>
                        <Paragraph size='xxs'>
                            { goal.duration}
                        </Paragraph>
                    </Frame>
                </Frame>
            </Frame>
            <Frame width="hug" gap="sm" className='ml-[var(--space-md)]'>
                <Button isIcon iconColor='error' iconName="icon-delete" variant='outline' size='xs'/>
                <Button isIcon iconColor='success' iconName="icon-double-check" variant='outline' size='xs'/>
            </Frame>
        </Frame>
    </Frame>
  )
}
