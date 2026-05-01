import React, { ReactNode } from 'react'
import Frame from '../mixed/frame'
import Button from './button'

type CardProps = {
    children: ReactNode,
}

export default function Card({children}: CardProps) {
  return (
    <Frame rounded direction="row" padded variant='hug' specificStyle={{boxShadow:"0px 0px 4px -2px black"}}>
        <Button variant='icon' size="sm" iconName="icon-x" iconColor='#010101' 
        specificStyle={{position: "absolute", width:"30px", height:"30px",backgroundColor:"#FAFAFA", right:"4px", top:"4px"}}/>
        {children}
    </Frame>
  )
}
