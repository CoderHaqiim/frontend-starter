"use client"
import { http } from '@/src/http/client'
import { FormObjectTypes } from '@/src/types/types'
import React, { CSSProperties, ReactNode } from 'react'


type FormProps = {
    children: ReactNode,
    url?: string,
    specificStyles?: CSSProperties,
    // A form that owns its request (async calls, cache updates, closing itself)
    // hands the collected values to this handler instead of a url.
    onSubmit?: (data: FormObjectTypes) => void | Promise<void>
}

export default function Form({children, url, specificStyles, onSubmit}: FormProps) {
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const dataHolder: FormObjectTypes = {}
    const data = new FormData(e.currentTarget)
    
    data.forEach((value, key)=>{
      dataHolder[key] = value
    })

    if (onSubmit) {
      await onSubmit(dataHolder)
      return
    }

    // Every other form posts the collected values straight to its url.
    console.log(dataHolder, url)
    http(url as string, dataHolder, { method: "POST"})
  }

  const cardFormStyle = `gap-[var(--space-lg)] w-full relative h-max flex flex-col items-center justify-center`

  return (
    <form
      onSubmit={(e) =>{handleSubmit(e)}}
      className={cardFormStyle}
      style={{ ...specificStyles }}
    >
        {children}
    </form>
  )
}
