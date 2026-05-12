"use client"
import React, {useState}from 'react'

type ToggleProps = {
    name: string
}

export default function Toggle({name} : ToggleProps) {
    const [checked, setChecked] = useState<boolean>(false)

  return (
    <label className='w-[max-content] h-[max-content] flex cursor-pointer'>
            <input
                type="checkbox"
                className='hidden'
                name={name}
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
            />

            <div
                className={`transition-all duration-300 flex p-[2px] border-[var(--outline-color2)] border-[1.5px] h-[max-content] ${
                    checked ? "justify-end" : "justify-start"
                } rounded-[40px] w-[38px] items-center`}
            >
                <div className='bg-[var(--accent-color1)] w-[16px] h-[16px] rounded-full'></div>
            </div>
        </label>
  )
}
