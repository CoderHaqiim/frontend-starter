import Frame from "../ui/primitives/frame"
import Paragraph from "../ui/primitives/paragraph"
import Icon from "../ui/primitives/icon"

type insightProps = {
    text: string
}

export default function Insight({text}:insightProps) {
  return (
    <Frame width="stretch" align="center" height="hug" padding="lg" gap="md">
        <Icon name="icon-trend-up" stroke="2" size="sm" color="accent1" />
        <Paragraph size="sm">{text}</Paragraph>
    </Frame>
  )
}
