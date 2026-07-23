import { CSSProperties, ReactNode } from "react"
import { colors, colorVariables} from "@/src/app/design/colors"
import { SizeType } from "@/src/types/types"
import { space } from "@/src/app/design/spacing"

type MainProps = {
    children: ReactNode,
    padding: SizeType,
    specificStyles?: CSSProperties,
    className?: string
}

export default function Main({children, className, specificStyles, padding}: MainProps) {
  const defaultStyle:CSSProperties = {
    padding: space[padding]
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
