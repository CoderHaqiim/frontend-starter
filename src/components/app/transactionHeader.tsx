import React from 'react'
import { elementSizes } from '@/src/app/design/sizes'
import Frame from '../ui/primitives/frame'
import Paragraph from '../ui/primitives/paragraph'

export default function TransactionHeader() {
  return (
    <Frame className="w-full p-[var(--space-md)] top-0 z-[10] bg-[var(--color-white)] sticky shadow-[0px_2px_5px_-5px_black]"
      specificStyles = {{
        height: elementSizes["lg"]
      }}
    >
      <Frame
        className="w-[40px] h-full flex justify-center items-center border-r-[1px] border-r-[var(--color-outline1)]"
      >
        <Paragraph size="sm" color="textColor1" weight="medium">
          S|N
        </Paragraph>
      </Frame>

      <Frame
        className="w-[300px] h-full flex justify-center border-r-[1px] border-r-[var(--color-outline1)]"
      >
        Description
      </Frame>
    </Frame>
  )
}