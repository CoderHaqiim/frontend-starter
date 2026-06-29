import React, { ReactNode } from 'react'
import Frame from '../primitives/frame'
import { CSSProperties } from 'react'

type CardProps = {
    children: ReactNode,
    rounded?: "xs" | "sm" | "md" | "lg" | "xl",
    padding: "xs" | "sm" | "md" | "lg" | "xl",
    width: "hug" | "stretch" | CSSProperties["width"];
    height: "hug" | "stretch" | CSSProperties["height"];
}

export default function Card({children, width, height, padding, rounded}: CardProps) {
  return (
    <Frame width={width} height={height} rounded={rounded} direction="column" border padding={padding}
    specificStyle={{
      boxShadow:"0px 0px 2px -2px black",
      backgroundColor: `var(--background1)`,
    }}>
      {children}
    </Frame>
  )
}
