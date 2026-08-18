import Frame from "../../ui/primitives/frame"
import Card from "../../ui/composites/card"
import Heading from "../../ui/primitives/heading"
import Button from "../../ui/primitives/button"
import TaskLine from "../taskLine"
import Paragraph from "../../ui/primitives/paragraph"
import Tooltip from "../../ui/composites/tooltip"
import List from "../../ui/composites/list"

export default function TaskManagerCard() {
  return (
    <Card
      padding="lg"
      rounded="md"
      width="350px"
      height="hug"
    >
      <Frame
        className="
          flex
          w-full
          h-max
          items-center
          justify-between
          border-b
          border-b-[var(--color-outline1)]
          mb-[var(--space-lg)]
        "
      >
        <Heading type="h2" size="sm">
          Tasks
        </Heading>

        <Frame className="flex gap-[var(--space-sm)]">
          <Button
            variant="outline"
            iconPosition="left"
            size="xs"
            iconName="icon-plus"
          >
            Add Task
          </Button>

          <Tooltip content="open" position="top">
            <Button
              variant="outline"
              isIcon
              size="xs"
              iconName="icon-open"
            />
          </Tooltip>
        </Frame>
      </Frame>

      <Frame
        className="
          flex
          w-full
          h-max
          items-center
          gap-[var(--space-xs)]
          mb-[var(--space-md)]
          mt-[var(--space-sm)]
        "
      >
        <Heading type="h3" size="xxs">
          Today
        </Heading>

        <Frame>
          <Paragraph size="xs">
            • 8 Tasks • 5 Completed • 5 Pending
          </Paragraph>
        </Frame>
      </Frame>

      <List
        height="hug"
        width="stretch"
        scroll="hidden"
      >
        <TaskLine task="hello" />
        <TaskLine task="hello" />
        <TaskLine task="hello" />
        <TaskLine task="hello" />
      </List>
    </Card>
  )
}