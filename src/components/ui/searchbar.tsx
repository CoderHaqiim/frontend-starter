"use client"
import React, { useState } from 'react'
import Frame from '../mixed/frame'
import Input from './input'
import Button from './button'
import { space } from '@/src/app/design/space'
import { colors } from '@/src/app/design/colors'
import { http } from '@/src/http/client'

export default function Searchbar() {
  const [focused, setFocused] = useState<boolean>(false)

  const focusInputParent = () => {
    setFocused(prev => !prev)
  }

  const url = `/search-url`

  // const searchResults =  http(url, {
  //       method: "GET",
  // })

  return (
    <Frame variant='hug' centered border rounded="sm"
    specificStyle={{ 
      border: focused? `1.5px ${colors["accent1"]} solid` : "0.5px var(--outline-color2) solid",
      position: "relative",
      backgroundColor: colors["background2"],
      width:"350px",
      }}>
        <Frame variant='stretch' specificStyle={{flex:"1"}}>
            <Input size='md' name="search" func={focusInputParent} variant="default" type='text' placeholder='search'/>
        </Frame>
        <Button id="search-btn" variant='icon' size='md' iconName='icon-search'/>
        <Frame variant='custom' rounded="md" padding='md' 
          specificStyle={{
            position: "absolute",
            width:"100%",  
            height:"300px", 
            backgroundColor:"white", 
            borderRadius:space["md"], 
            border:"solid 1px var(--liner)", 
            top:"110%",
            boxShadow:"0px 1px 5px -1px #000000c4"
            }}>
          This is one
        </Frame>
    </Frame>
  )
}
