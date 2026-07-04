import React, { Children, CSSProperties, ReactNode } from 'react'
import Frame from '../ui/primitives/frame'
import { SizeType } from '@/src/types/types'

type PageProps = {
    children: ReactNode,
    centered?: boolean,
    direction?: "row" | "column",
    scrollable?: boolean,
    padding?: SizeType,
    specificStyle?: CSSProperties
}

export default function PageComponent({
    children, 
    centered, 
    direction, 
    padding, 
    specificStyle,
    scrollable
}: PageProps) {
  return (
    <Frame 
        width="stretch" 
        height= {scrollable ? "max-content" : "100vh"}
        direction={direction} 
        centered={centered} 
        padding={padding} 
        specificStyles={specificStyle}
    >
        {children}
    </Frame>
  )
}
