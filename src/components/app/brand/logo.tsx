import Image from 'next/image'
import Link from 'next/link'
import Frame from '../../base/ui/primitives/frame'

export default function Logo() {
  return (
    <Frame className='w-[100px] h-[45px]' border>
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
