"use client"
import React, { useState } from 'react'
import Frame from '../mixed/frame'
import Input from './input'
import Button from './button'

export default function Searchbar() {
  const [focused, setFocused] = useState<boolean>(false)

  const focusInputParent = () => {
    setFocused(prev => !prev)
  }

  return (
    <Frame variant='hug' centered border rounded 
    specificStyle={{ 
      backgroundColor:"var(--background2)", 
      border: focused? "1.5px var(--accent-color1) solid" : "0.5px var(--outline-color2) solid"
      }}>
        <Frame variant='custom' specificStyle={{ width: "250px" }}>
            <Input size='md' name="search" func={focusInputParent} variant="default" type='text' placeholder='search'/>
        </Frame>
        <Button id="search-btn" variant='icon' size='sm' iconName='icon-search'/>
    </Frame>
  )
}
