import { CSSProperties, ReactNode } from "react"
import { colors, colorVariables} from "@/src/app/design/colors"
import { SizeType } from "@/src/types/types"
import { space } from "@/src/app/design/spacing"

type MainProps = {
    children: ReactNode,
    padding: SizeType,
    specificStyles?: CSSProperties
}

export default function Main({children, specificStyles, padding}: MainProps) {

  const defaultStyle:CSSProperties = {
    backgroundColor: colors["white"],
    padding: space[padding]
  }

  return (
    <main className="scrollInvisible max-w-[1000px] w-auto h-[100%] flex-1 overflow-y-scroll" 
      style={{
        ...defaultStyle, 
        ...specificStyles
      }}
    >
        {children}
    </main>
  )
}
