import React from 'react'
import Frame from '../../ui/primitives/frame'
import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <Frame width="100px" height="45px" border>
      <Link href='/'>
        <Image
            alt='logo'
            src="/public/logo.svg"
            fill
        />
      </Link>
    </Frame>
  )
}
