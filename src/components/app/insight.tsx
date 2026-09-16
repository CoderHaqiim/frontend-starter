import Frame from "../base/ui/primitives/frame"
import Icon from "../base/ui/primitives/icon"
import Paragraph from "../base/ui/primitives/paragraph"

type insightProps = {
    text: string
}

export default function Insight({text}:insightProps) {
  return (
    <Frame className="w-full items-center height-max p-[var(--space-lg)] gap-[var(--space-md)]">
        <Icon name="icon-trend-up" stroke="2" size="sm" color="accent" />
        <Paragraph size="sm">{text}</Paragraph>
    </Frame>
  )
}
