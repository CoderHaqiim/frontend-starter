"use client"

import React from 'react'
import Card from '@/src/components/ui/card'
import Frame from '@/src/components/mixed/frame'
import Button from '@/src/components/ui/button'

export default function Test() {
  return (
    <Frame variant='page' padding='xl' centered>
      <Card>
          <div className='w-[400px] h-[300px]'>
            Hello
          </div>
      </Card>
      <Button variant="regular" id="open-btn" text="hello"/>
      <Button variant="textIcon" id="open-btn" text="hello" iconName="icon-eye" iconPosition='right' iconColor='var(--background1)'/>
    </Frame>
  )
}
