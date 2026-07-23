"use client"
import React, {useState} from 'react'

type ToggleProps = {
    name: string,
    formFunc?: (e:React.ChangeEvent<HTMLInputElement>) => void 
}

export default function Toggle({name, formFunc} : ToggleProps) {
    const [checked, setChecked] = useState<boolean>(false)

    const toggleFunction = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked)

        formFunc?.(e)
    }

  return (
    <label className='w-max h-max flex cursor-pointer'>
            <input
                type="checkbox"
                className='hidden'
                name={name}
                checked={checked}
                onChange={toggleFunction}
            />

            <div
                className={`transition-all duration-300 flex p-[2px] border-[var(--color-outline1)] border-[1.5px] h-max ${
                    checked ? "justify-end" : "justify-start"
                } rounded-[var(--radius-xl)] w-[38px] items-center`}
            >
                <div className='bg-[var(--color-accent1)] w-[16px] h-[16px] rounded-[var(--radius-xxl)]'></div>
            </div>
        </label>
  )
}
