"use client"

import React, { ReactNode } from 'react'
import Frame from '../primitives/frame'
import Button from '../primitives/button'

type ModalProps = {
  isOpen: boolean,
  onClose: () => void,
  children: ReactNode,
  title?: string,
}

export default function Modal({ isOpen, onClose, children, title }: ModalProps) {
  if (!isOpen) return null

  return (
      <Frame width="hug" height="hug" rounded="lg" direction="column" border padding="sm" 
      specificStyle={{
        boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        backgroundColor: "var(--background1)",
        maxWidth: "min(95vw, 600px)",
      }}>
        <div className="w-full flex items-center justify-between mb-4">
          <div className="text-[1rem] font-semibold text-[var(--text-color1)]">{title ?? 'Modal'}</div>
          <Button
            func={onClose}
            variant="icon"
            size="sm"
            iconName="icon-x"
            iconColor="#010101"
            specificStyles={{ width: "30px", height: "30px", backgroundColor: "#FAFAFA" }}
          />
        </div>
        {children}
      </Frame>
  )
}
