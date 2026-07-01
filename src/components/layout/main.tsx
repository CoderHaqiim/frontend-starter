import { CSSProperties, ReactNode } from "react"
import { colors, colorVariables} from "@/src/app/design/colors"
import { Sizes } from "@/src/types/types"
import { space } from "@/src/app/design/spacing"

type MainProps = {
    children: ReactNode,
    padding: Sizes,
    specificStyles: CSSProperties
}

export default function Main({children, specificStyles, padding}: MainProps) {

  const defaultStyle:CSSProperties = {
    backgroundColor: colors["background2"],
    padding: space[padding]
  }

  return (
    <main className="scrollInvisible w-auto flex-1 min-h-[100vh] overflow-y-scroll h-full" 
      style={{...defaultStyle, ...specificStyles}}>
        {children}
    </main>
  )
}
