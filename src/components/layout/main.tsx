import { ReactNode } from "react"
import { colors, colorVariables} from "@/src/app/design/colors"

type MainProps = {
    children: ReactNode
}

export default function Main({children}: MainProps) {
  return (
    <main className="w-auto flex-1 h-full bg-[var(--background2)]" style={{...colorVariables}}>
        {children}
    </main>
  )
}
