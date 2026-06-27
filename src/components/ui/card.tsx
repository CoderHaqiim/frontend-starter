import React, { ReactNode } from 'react'
import Frame from '../mixed/frame'

type CardProps = {
    children: ReactNode,
    variant: "stretch" | "hug" | "custom",
    padding: "xs" | "sm" | "md" | "lg" | "xl"
}

export default function Card({children, variant, padding}: CardProps) {
  return (
    <Frame rounded="lg" direction="column" border padding={padding} variant={variant}
    specificStyle={{
      boxShadow:"0px 0px 2px -2px black",
      backgroundColor: `var(--background1)`,
    }}>
      {children}
    </Frame>
  )
}
