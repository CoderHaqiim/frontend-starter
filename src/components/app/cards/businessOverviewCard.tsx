import React from 'react'
import Card from '../../ui/composites/card'
import Heading from '../../ui/primitives/heading'
import Frame from '../../ui/primitives/frame'
import { space } from '@/src/app/design/spacing'
import Button from '../../ui/primitives/button'
import { colors } from '@/src/app/design/colors'
import { shortenText } from '@/src/utils/shortenText'
import Paragraph from '../../ui/primitives/paragraph'
import { fontWeight } from '@/src/app/design/typograhy'

type BusinessCardProps = {
    title: string
    scaled?: boolean
}

export default function BusinessOverviewCard({title, scaled}: BusinessCardProps) {
  return (
    <Card width="320px" padding='lg' rounded='md' height="hug" className={`gap-[var(--space-md)] shrink-0 bg-[var(--color-white)]`}>
        {/* Header */}
       <Frame width="sretch" height="hug" className='pb-[var(--space-xs)] items-center justify-between border-b-[var(--color-outline)] border-b-[1px]'>
            <Heading type='h3' size='sm'>{shortenText(title, 20)}</Heading>
            <Button size='xs' variant="fill" >View</Button>
       </Frame>
       {/* Health */}
       <Frame width="stretch" height="hug" className='justify-between items-center'>
            <Frame width="hug">
                <Paragraph size='xs'>Last 7 days</Paragraph>
            </Frame>
            <Frame width="hug" height="hug" rounded='lg' className='bg-[var(--color-success2)]' specificStyles={{padding: `${space["xs"]} ${space["sm"]}`}}>
                <Paragraph size='xs' color="success" weight="medium">Healthy</Paragraph>
            </Frame>
        </Frame>
        {/* Operational Metrics */}
       <Frame direction='column' padding='md'>
            <Frame width="stretch" className='justify-between gap-[var(--space-sm)]'>
                <Paragraph color="textColor1" size='sm'>Overdue tasks</Paragraph>
                <Paragraph color="textColor1" weight="medium" size='sm'>2</Paragraph>
            </Frame>
            <Frame width="stretch" className='justify-between gap-[var(--space-sm)]'>
                <Paragraph color="textColor1" size='sm'>Unpaid Bills</Paragraph>
                <Paragraph color="textColor1" weight="medium" size='sm'>3</Paragraph>
            </Frame>
       </Frame>
       {/* Financial Metrics */}
       <Frame width="stretch" direction='column' border padding="md" rounded='md' height="hug" className='border-[var(--color-info)] gap-[var(--space-xs)] bg-[var(--color-background2)]'>
            <Frame width="stretch" className='justify-between gap-[var(--space-sm)]'>
                <Paragraph color="textColor1" weight="medium" size='sm'>Total Income</Paragraph>
                <Paragraph color="textColor1" weight="medium" size='sm'>2</Paragraph>
            </Frame>
            <Frame width="stretch" className='justify-between gap-[var(--space-sm)]'>
                <Paragraph color="textColor1" weight="medium" size='sm'>Expenses</Paragraph>
                <Paragraph color="textColor1" weight="medium" size='sm'>3</Paragraph>
            </Frame>
            <Frame width="stretch"  className='justify-between gap-[var(--space-sm)]'>
                <Paragraph color="textColor1" weight="medium" size='sm'>Net Result</Paragraph>
                <Paragraph color="textColor1" weight="medium" size='sm'>3</Paragraph>
            </Frame>
            <Frame width="stretch" className='justify-between gap-[var(--space-sm)]'>
                <Paragraph color="textColor1" weight="bold" size='sm'>Cash Balance</Paragraph>
                <Paragraph color="textColor1" weight="bold" size='sm'>$5000</Paragraph>
            </Frame>
        </Frame>
    </Card>
  )
}
