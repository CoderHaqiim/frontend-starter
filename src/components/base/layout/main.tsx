"use client"

import { space } from "@/src/app/design/spacing"
import { CSSProperties, ReactNode } from "react"
import { useTheme } from "../../providers/themeProvider"

type MainProps = {
    children: ReactNode,
    specificStyles?: CSSProperties,
    className?: string
}

export default function Main({children, className, specificStyles}: MainProps) {
  const {colors} = useTheme()

  const defaultStyle:CSSProperties = {
    padding: space["lg"]
  }

  return (
    <main className="scrollInvisible max-w-[1100px] min-w-[600px] flex-1 h-full min-h-0 overflow-y-scroll" 
      style={{
        ...defaultStyle, 
        ...specificStyles
      }}
    >
        {children}
    </main>
  )
}
