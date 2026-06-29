import { CSSProperties, ReactNode } from "react"
import { colors, colorVariables} from "@/src/app/design/colors"
import { Sizes } from "@/src/types/types"
import { space } from "@/src/app/design/spacing"

type MainProps = {
    children: ReactNode,
    padding: Sizes
}

export default function Main({children, padding}: MainProps) {

  const specificStyle:CSSProperties = {
    backgroundColor: colors["background2"],
    padding: space[padding]
  }

  return (
    <main className="w-auto flex-1 min-h-[100vh] h-max" 
      style={{...specificStyle}}>
        {children}
    </main>
  )
}
