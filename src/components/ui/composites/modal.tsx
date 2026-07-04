"use client"

import React, { ReactNode } from 'react'
import Button from '../primitives/button'
import Backdrop from '../primitives/backdrop'
import Card from "./card"
import Heading from '../primitives/heading'
import { colors } from '@/src/app/design/colors'
import { FrameSizeType, SizeType } from '@/src/types/types'

type ModalProps = {
  isOpen: boolean,
  onClose: () => void,
  children: ReactNode,
  title?: string,
  height?: FrameSizeType,
  width?:FrameSizeType,
  padding?: SizeType
}

export default function Modal({ isOpen, width="500px", height="300px", onClose, children, title, padding="md" }: ModalProps) {
  if (!isOpen) return null

  return (
      <Backdrop>
        <Card width={width} height={height} padding={padding} rounded='md' >
          <Button
            func={onClose}
            variant="icon"
            size="md"
            iconName="icon-x"
            iconColor= {colors["textColor1"]}
          />
          {title && <Heading type='h2' size='lg' text={title}/>}
           {children}
        </Card>
      </Backdrop>
  )
}
