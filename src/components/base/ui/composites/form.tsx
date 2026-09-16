"use client"
import { http } from '@/src/http/client'
import { FormObjectTypes } from '@/src/types/types'
import React, { ReactNode } from 'react'


type FormProps = {
    children: ReactNode,
    url: string
}

export default function Form({children, url}: FormProps) {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const dataHolder: FormObjectTypes = {}
    const data = new FormData(e.currentTarget)
    
    data.forEach((value, key)=>{
      dataHolder[key] = value
    })

    console.log(dataHolder, url)
    http(url, dataHolder, { method: "POST"})
  }

  const cardFormStyle = `gap-[var(--space-lg)] w-full h-max flex flex-col items-center justify-center`

  return (
    <form onSubmit={(e) =>{handleSubmit(e)}} className={cardFormStyle}>
        {children}
    </form>
  )
}
