"use client"

import React, { ReactNode, useState } from 'react'
import Button from '../primitives/button'
import Backdrop from '../primitives/backdrop'
import Card from "./card"
import Heading from '../primitives/heading'
import { colors } from '@/src/app/design/colors'
import { FrameSizeType, SizeType } from '@/src/types/types'
import { useModalState } from '@/src/store/modalState'
import { useBackdropState } from '@/src/store/backdropState'

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
      <Backdrop modalIsOpen>
        <Card width={width} height={height} padding={padding} rounded='md'
          specificStyles={{
            display: selectedModal === id ? "flex" : "none"
          }}
        >
          <Button
            func={closeModal}
            variant="ghost"
            size="md"
            isIcon
            iconName="icon-x"
          />
          {title && <Heading type='h2' size='lg'>{title}</Heading>}
           {children}
        </Card>
      </Backdrop>
  )
}
