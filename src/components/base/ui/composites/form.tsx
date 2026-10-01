"use client"

import { http } from '@/src/http/client'
import { useShowToast } from '@/src/store/toastState'
import { FormObjectTypes, ToastType } from '@/src/types/types'
import React, { CSSProperties, ReactNode } from 'react'


type FormProps = {
    children: ReactNode,
    url?: string,
    specificStyles?: CSSProperties,
    // A form that owns its request (async calls, cache updates, closing itself)
    // hands the collected values to this handler instead of a url.
    onSubmit?: (data: FormObjectTypes) => void | Promise<void>
    // The headings the toasts carry when this form posts to a url itself. The
    // message is always the one the route answered with, so only the heading is
    // chosen here.
    successTitle?: string
    errorTitle?: string
}

export default function Form({
  children,
  url,
  specificStyles,
  onSubmit,
  successTitle = "Saved",
  errorTitle = "Request failed",
}: FormProps) {
  const showToast = useShowToast()

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

    /*
     * Every other form posts the collected values straight to its url. Nothing renders
     * the answer, so the outcome is reported here: a request that is not simply
     * reading data always says what it did - the message the route sent on success,
     * and the message it sent when it refused.
     */
    try {
      const response = await http<{ message?: string }>(url as string, dataHolder, { method: "POST" })

      const saved: ToastType = {
        variant: "success",
        title: successTitle,
        message: response?.message ?? "Your request was completed.",
      }

      showToast(saved)
    } catch (error) {
      const refused: ToastType = {
        variant: "error",
        title: errorTitle,
        message: error instanceof Error ? error.message : "Your request could not be completed.",
      }

      showToast(refused)
    }
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
