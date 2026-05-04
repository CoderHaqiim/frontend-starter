import React, { ReactNode } from 'react'
import Frame from '../mixed/frame'
import Logo from '../ui/logo'

type NavProps = {
    children: ReactNode
}

export default function Nav() {
  return (
    <nav className='w-full h-[60px] border-b-[0.5px] border-b-[var(--outline-color1)]'>
        <Frame variant="stretch" padding="lg" specificStyle={{justifyContent:"space-between"}}>
          <Logo/>
        </Frame>
    </nav>
  )
}
