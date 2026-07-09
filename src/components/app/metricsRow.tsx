import React from 'react'
import Frame from '../ui/primitives/frame'
import { colors } from '@/src/app/design/colors'
import Paragraph from '../ui/primitives/paragraph'
import { shortenText } from '@/src/utils/shortenText'
import { elementSizes } from '@/src/app/design/sizes'
import { fontWeight } from '@/src/app/design/typograhy'

interface businessStats{
  name: string,
}

type MetricsRowProps = {
  data: businessStats
}

export default function MetricsRow({data}: MetricsRowProps) {
  return (
    <Frame width="stretch" align="center" padding="lg" height={elementSizes["md"]} className='bg-[var(--color-white)]'>
        <Paragraph size="sm" color={colors["textColor1"]} weight={fontWeight["medium"]}>{shortenText(data.name, 30)}</Paragraph>
    </Frame>
  )
}
