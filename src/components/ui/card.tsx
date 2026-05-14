import React, { ReactNode } from 'react'
import Frame from '../mixed/frame'
import Button from './button'
import { useState } from 'react'

type CardProps = {
    children: ReactNode,
}

export default function Card({children}: CardProps) {
  const [cardOpen, setCardOpen] = useState<boolean>(false)
  
  const closeCard = () => {
    setCardOpen(prev => !prev)
    console.log("clicked")
  }

  return (
    <Frame rounded direction="column" border padding="md" variant='hug' 
    specificStyle={{
      boxShadow:"0px 0px 2px -2px black",
      backgroundColor: `var(--background1)`,
      display: `${cardOpen? "flex":"none"}`
    }}>
        <div className='w-full flex justify-end'>
          <Button id="close" func={closeCard} variant='icon' size="sm" iconName="icon-x" iconColor='#010101'
          specificStyle={{width:"30px", height:"30px",backgroundColor:"#FAFAFA", right:"4px", top:"4px"}}/>
        </div>
        {children}
    </Frame>
  )
}
