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
    justify?: CSSProperties["justifyContent"]
    align?: CSSProperties["alignItems"]
}

export default function PageComponent({
    children, 
    direction, 
    padding, 
    specificStyle,
    scrollable,
    justify,
}: PageProps) {
  return (
    <Frame 
        width="stretch" 
        height= {scrollable ? "max-content" : "100vh"}
        direction={direction} 
        padding={padding} 
        justify={justify}
        specificStyles={specificStyle}
    >
        {children}
    </Frame>
  )
}
