import { bodySize } from "@/src/app/design/typograhy"
import Frame from "../ui/primitives/frame"
import { ReactNode } from "react"
import { space } from "@/src/app/design/spacing"
import { colors } from "@/src/app/design/colors"

type TaskLineProps = {
  children: ReactNode
}

export default function TaskLine({children}: TaskLineProps) {
  return (
    <Frame width="stretch" gap="xs" height="hug" padding="md" direction="column" 
        className="shrink-0 bg-[var(--color-white)] text-[length:var(--bodySize-sm)] justify-center">
        {children}
    </Frame>
  )
}
