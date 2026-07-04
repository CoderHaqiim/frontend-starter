"use client"
import React, { ReactNode } from 'react'
import { FormObjectTypes } from '@/src/types/types'
import { http } from '@/src/http/client'


type FormProps = {
    children: ReactNode,
    url: string,
    variant: "plain" | "card"
}

export default function Form({children, variant, url}: FormProps) {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const dataHolder: FormObjectTypes = {}
    const data = new FormData(e.currentTarget)
    
    data.forEach((value, key)=>{
      dataHolder[key] = value
    })

    http(url, dataHolder, {
      method: "POST",
    })
  }

  const cardFormStyle = `border-[1px] p-8 gap-4 w-full bg-[var(--color-background1)] rounded-[var(--radius-xl)] h-max flex flex-col items-center justify-center border-[var(--color-outline)]`
  const plainFormStyle = `gap-4 w-full h-max flex flex-col items-center justify-center`

  const styles = variant === "plain"? plainFormStyle : cardFormStyle;

  return (
    <form onSubmit={(e) =>{handleSubmit(e)}} className={styles}>
        {children}
    </form>
  )
}
