"use client"

import React, { CSSProperties } from 'react'
import Icon from '../primitives/icon'

type DropdownOption = string | {
  label: string,
  value: string
}

type DropdownProps = {
  name: string,
  options: DropdownOption[],
  size?: "xs" | "sm" | "md" | "lg",
  border?: boolean,
  outline?: boolean,
  specificStyle?: CSSProperties,
  formFunc?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function Dropdown({
  name,
  options,
  size = "sm",
  border = true,
  outline = true,
  specificStyle,
  formFunc
}: DropdownProps) {
  const sizes = {
    "xs": "h-[25px]",
    "sm": "h-[35px]",
    "md": "h-[45px]",
    "lg": "h-[45px]",
  }

  const height = sizes[size]

  const getOptionLabel = (option: DropdownOption) => (
    typeof option === "string" ? option : option.label
  )

  const getOptionValue = (option: DropdownOption) => (
    typeof option === "string" ? option : option.value
  )

  return (
    <div className="relative flex w-auto flex-1 items-center">
      <select
        name={name}
        defaultValue=""
        onChange={formFunc}
        className={`w-full appearance-none rounded-[8px] bg-[var(--background1)] px-[8px] pr-[34px] text-[14px] text-[var(--text-color1)] outline-none ${height} ${border && "border-[0.5px] border-[var(--outline-color2)]"} ${outline && "hover:border-[1px] hover:border-[var(--accent-color1)] focus:border-[2px] focus:border-[var(--accent-color1)]"}`}
        style={specificStyle}
      >
        <option value="" disabled>{name}</option>
        {options.map((option) => {
          const value = getOptionValue(option)

          return (
            <option key={value} value={value}>
              {getOptionLabel(option)}
            </option>
          )
        })}
      </select>
      <div className="pointer-events-none absolute right-[8px] flex items-center">
        <Icon name="icon-chevron-down" size="sm"/>
      </div>
    </div>
  )
}
