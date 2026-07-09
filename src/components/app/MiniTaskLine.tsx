import { bodySize } from "@/src/app/design/typograhy"
import Frame from "../ui/primitives/frame"
import { ReactNode } from "react"
import { space } from "@/src/app/design/spacing"
import { colors } from "@/src/app/design/colors"

type MiniTaskLineProps = {
  children: ReactNode
}

export default function MiniTaskLine({children}: MiniTaskLineProps) {
  return (
    <Frame width="stretch" height="hug" rounded="sm" border padding="md" direction="column" 
    className="shrink-0 gap-[var(--space-xs)] bg-[var(--color-white)] text-[length:var(--bodySize-sm)] justify-center">
        {children}
    </Frame>
  )
}
