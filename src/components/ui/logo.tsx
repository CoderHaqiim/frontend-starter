import React from 'react'
import Frame from '../mixed/frame'
import Image from 'next/image'

export default function Logo() {
  return (
    <Frame variant='custom' border specificStyle={{width:"100px", height:"45px" }}>
        <Image
            alt='logo'
            src="/public/logo.svg"
            fill
        />
    </Frame>
  )
}
