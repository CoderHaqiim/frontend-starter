import Frame from "../../ui/primitives/frame"
import Card from "../../ui/composites/card"
import { colors } from "@/src/app/design/colors"
import Heading from "../../ui/primitives/heading"
import Button from "../../ui/primitives/button"
import TaskLine from "../taskLine"
import Paragraph from "../../ui/primitives/paragraph"
import { shortenText } from "@/src/utils/shortenText"
import Tooltip from "../../ui/composites/tooltip"
import List from "../../ui/composites/list"
import Button2 from "../button2"

export default function TaskManagerCard() {
  return (
    
            <Card padding="lg" rounded="md" width="stretch" height="hug" specificStyles={{
              backgroundColor: colors["white"]
            }}>
              <Frame width="stretch" height="hug" align="center" justify="space-between" className="border-b-[var(--color-outline1)] mb-[var(--space-lg)]">
                <Heading type="h2" size="sm">Tasks & Schedules</Heading>
                <Frame gap="sm">
                  <Button variant="outline" iconPosition="left" size="sm" iconName="icon-plus">Add Task</Button>
                  <Tooltip content="open" position="top">
                    <Button variant="outline" isIcon size="sm" iconName="icon-open"/>
                  </Tooltip>
                </Frame>
              </Frame>
              <Frame width="stretch" align="center" gap="xs" height="hug" className="mb-[var(--space-md)] mt-[var(--space-sm)]">
                <Heading type="h3" size="xs">Today</Heading>
                <Frame>
                  <Paragraph size="xs"> • 8 Tasks • 5 Completed • 5 Pending  </Paragraph>
                </Frame>
              </Frame>
              <List height="hug" width="stretch" scroll="hidden">
                <TaskLine task="hello"/>
                <TaskLine task="hello"/>
                <TaskLine task="hello"/>
                <TaskLine task="hello"/>
              </List>
            </Card>
  )
}
