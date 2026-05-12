import React, { ReactNode } from 'react'
import Frame from '../mixed/frame'
import Logo from '../ui/logo'
import Button from '../ui/button'
import Searchbar from '../ui/searchbar'

type NavProps = {
    children: ReactNode
}

export default function Nav() {
  return (
    <nav className='flex items-center justify-center w-full h-[60px] border-b-[0.5px] border-b-[var(--outline-color1)]'>
        <Frame variant="stretch" padding="lg" specificStyle={{justifyContent:"space-between", alignItems: "center"}}>
          <Logo/>
          <Frame variant='hug' specificStyle={{gap:"8px"}}>
            <Searchbar/>
            <Button size="md" iconName="icon-bell" id="notification-btn" variant="icon" specificStyle={{border:"solid 1px var(--outline-color2)", borderRadius:"8px"}}/>
            <Button size="md" iconName="icon-user" id="profile-btn" variant="icon" specificStyle={{border:"solid 1px var(--outline-color2)", borderRadius:"50%"}}/>
          </Frame>
        </Frame>
    </nav>
  )
}
