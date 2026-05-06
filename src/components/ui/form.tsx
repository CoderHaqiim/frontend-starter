import React, { ReactNode } from 'react'


type FormProps = {
    children: ReactNode
}

export default function Form({children}: FormProps) {
  return (
    <form action="" className='border-[1px] p-8 gap-4 w-[400px] bg-[var(--background1)] rounded-[40px] h-[max-content] flex flex-col items-center justify-center border-[var(--outline-color1)]'>
        {children}
    </form>
  )
}
