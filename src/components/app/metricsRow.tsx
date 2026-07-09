import React from 'react'
import Frame from '../ui/primitives/frame'
import { colors } from '@/src/app/design/colors'
import Paragraph from '../ui/primitives/paragraph'
import { shortenText } from '@/src/utils/shortenText'
import { elementSizes } from '@/src/app/design/sizes'

interface businessStats{
  name: string,
}

type MetricsRowProps = {
  data: businessStats
}

export default function MetricsRow({data}: MetricsRowProps) {
  return (
    <Frame width="stretch" align="center" padding="md" border rounded='sm' height={elementSizes["md"]} className='bg-[var(--color-white)]'>
        <Paragraph size="md">{shortenText(data.name, 30)}</Paragraph>
    </Frame>
  )
}
