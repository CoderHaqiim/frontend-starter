import Frame from "../ui/primitives/frame"
import Paragraph from "../ui/primitives/paragraph"
import Icon from "../ui/primitives/icon"

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
