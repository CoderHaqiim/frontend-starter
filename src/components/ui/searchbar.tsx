import React from 'react'
import Frame from '../mixed/frame'
import Input from './input'
import Button from './button'

export default function Searchbar() {
  return (
    <Frame variant='hug' centered border rounded specificStyle={{backgroundColor:"var(--background2)"}}>
        <Frame variant='custom' specificStyle={{width: "250px"}}>
            <Input type='text' placeholder='search'/>
        </Frame>
        <Button id="search-btn" variant='icon' size='sm' iconName='icon-search'/>
    </Frame>
  )
}
