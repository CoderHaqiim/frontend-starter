"use client"

import { useBackdropState } from '@/src/store/backdropState'
import { useModalState } from '@/src/store/modalState'
import { FrameSizeType, SizeType } from '@/src/types/types'
import { ReactNode } from 'react'
import Backdrop from '../primitives/backdrop'
import CloseButton from '../primitives/closeButton'
import Heading from '../primitives/heading'
import Card from "./card"

type ModalProps = {
  children: ReactNode,
  title?: string,
  height?: FrameSizeType,
  width?:FrameSizeType,
  padding?: SizeType,
  id: string
}

export default function Modal({ width="500px", height="300px", children, title, padding="md", id }: ModalProps) {
  const {selectedModal, setSelectedModal} = useModalState()
  const {backdropOpen, setBackdropOpen} = useBackdropState()

  const closeModal = () => {
    if(backdropOpen){
      setBackdropOpen(false)
    }
    setSelectedModal(null)
  }

  return (
      <Backdrop>
        <Card width={width} height={height} padding={padding} rounded='md'
          specificStyles={{
            display: selectedModal === id ? "flex" : "none"
          }}
        >
          <CloseButton func={closeModal} size="md" />
          {title && <Heading type='h2' size='lg'>{title}</Heading>}
          {children}
        </Card>
      </Backdrop>
  )
}
