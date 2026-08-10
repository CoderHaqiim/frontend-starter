"use client"

import { CSSProperties, ReactNode } from "react"
import { SizeType } from "@/src/types/types"
import { space } from "@/src/app/design/spacing"
import { useTheme } from "../app/themeProvider"

type MainProps = {
    children: ReactNode,
    padding: SizeType,
    specificStyles?: CSSProperties,
    className?: string
}

export default function Main({children, className, specificStyles, padding}: MainProps) {
  const {colors} = useTheme()

  const defaultStyle:CSSProperties = {
    paddingTop: space[padding],
    paddingRight: space[padding],
    paddingBottom: "100px",
    paddingLeft: space[padding],
    borderRight: `solid 1px ${colors["outline1"]}`,
    borderLeft: `solid 1px ${colors["outline1"]}`,
  }

  return (
    <main className="scrollInvisible max-w-[1000px] min-w-[600px]  flex-1 h-full min-h-0 overflow-y-scroll" 
      style={{
        ...defaultStyle, 
        ...specificStyles
      }}
    >
        {children}
    </main>
  )
}
