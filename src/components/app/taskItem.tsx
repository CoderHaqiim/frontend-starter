import Frame from "../ui/primitives/frame"
import Paragraph from "../ui/primitives/paragraph"
import Tooltip from "../ui/composites/tooltip"

export default function TaskItem() {
  return (
    <Frame padding="md" gap="md">
        <Tooltip content="mark as done">
            <input type="checkbox" className="accent-[var(--color-accent2)] bg-[yellow]"/>
        </Tooltip>
        <Frame direction="column">
            <Frame gap="lg">
                <Paragraph color="textColor1" size="md">
                    We'll look at this later
                </Paragraph>
            </Frame>
            <Frame>
                <Paragraph size="xs">Business name</Paragraph>
            </Frame>
        </Frame>
    </Frame>
  )
}