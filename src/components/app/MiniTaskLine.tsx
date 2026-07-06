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
    <Frame width="stretch" height="hug" rounded="sm" border padding="md" direction="column" specificStyles={{
      fontSize: bodySize["sm"],
      justifyContent: "center",
      gap: space["xs"],
      flexShrink: 0,
      backgroundColor: colors["white"]
    }}>
        {children}
    </Frame>
  )
}
