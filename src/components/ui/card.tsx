import React, { ReactNode } from 'react'
import Frame from '../mixed/frame'

type CardProps = {
    children: ReactNode,
}

export default function Card({children}: CardProps) {
  return (
    <Frame rounded="lg" direction="column" border padding="md" variant='hug' 
    specificStyle={{
      boxShadow:"0px 0px 2px -2px black",
      backgroundColor: `var(--background1)`,
    }}>
      {children}
    </Frame>
  )
}
