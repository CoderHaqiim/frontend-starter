"use client"
import React, { ReactNode } from 'react'
import { FormObjectTypes } from '@/src/types/types'
import { http } from '@/src/http/client'


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

    http(url, dataHolder, {
      method: "POST",
      headers:{
        "Content-type":"application/json",
      }
    })
  }


  return (
    <form onSubmit={(e) =>{handleSubmit(e)}} className='border-[1px] p-8 gap-4 w-full bg-[var(--background1)] rounded-[40px] h-[max-content] flex flex-col items-center justify-center border-[var(--outline-color1)]'>
        {children}
    </form>
  )
}
