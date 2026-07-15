import React from 'react'
import Frame from '../../ui/primitives/frame'
import Image from 'next/image'
import LinkComponent from '../../ui/primitives/navLink'

export default function Logo() {
  return (
    <Frame width="100px" height="45px" border>
      <LinkComponent variant="inline" href='/'>
        <Image
            alt='logo'
            src="/public/logo.svg"
            fill
        />
      </LinkComponent>
    </Frame>
  )
}
