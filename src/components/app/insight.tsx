import Frame from "../ui/primitives/frame"
import Paragraph from "../ui/primitives/paragraph"
import { ReactNode } from "react"

type insightProps = {
    text: string
}

export default function Insight({text}:insightProps) {
  return (
    <Frame width="stretch" height="hug" padding="md" className="bg-[var(--color-white)]">
        <Paragraph size="sm">{text}</Paragraph>
    </Frame>
  )
}
