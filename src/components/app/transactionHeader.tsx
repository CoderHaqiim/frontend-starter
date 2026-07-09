import React from 'react'
import { elementSizes } from '@/src/app/design/sizes'
import Frame from '../ui/primitives/frame'
import Paragraph from '../ui/primitives/paragraph'
import { colors } from '@/src/app/design/colors'
import { fontWeight } from '@/src/app/design/typograhy'

export default function TransactionHeader() {
  return (
    <Frame width="stretch" height={elementSizes["lg"]} padding='md' className="top-0 z-[10] bg-[var(--color-white)]" specificStyles={{position:"sticky", boxShadow: "0px 2px 5px -5px black"}}>
        <Frame width={40} height="stretch" justify='center' align="center" className='border-r-[1px] border-r-[var(--color-outline)]'>
            <Paragraph size='sm' color={colors["textColor1"]} weight={fontWeight["medium"]}>S|N</Paragraph>
        </Frame>
        <Frame width={300} height="stretch" justify='center' className='border-r-[1px] border-r-[var(--color-outline)]'>Description</Frame>
    </Frame>
  )
}
