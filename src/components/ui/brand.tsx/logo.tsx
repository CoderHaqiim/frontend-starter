import React from 'react'
import Frame from '../primitives/frame'
import Image from 'next/image'
import LinkComponent from '../primitives/link'

export default function Logo() {
  return (
    <Frame width="100px" height="45px" border>
      <LinkComponent variant="hug" href='/'>
        <Image
            alt='logo'
            src="/public/logo.svg"
            fill
        />
      </LinkComponent>
    </Frame>
  )
}
