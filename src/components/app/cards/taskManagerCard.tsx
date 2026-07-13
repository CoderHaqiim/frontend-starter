import Frame from "../../ui/primitives/frame"
import Card from "../../ui/composites/card"
import { colors } from "@/src/app/design/colors"
import Heading from "../../ui/primitives/heading"
import Button from "../../ui/primitives/button"
import TaskLine from "../taskLine"
import Paragraph from "../../ui/primitives/paragraph"
import { shortenText } from "@/src/utils/shortenText"
import Tooltip from "../../ui/composites/tooltip"

export default function TaskManagerCard() {
  return (
    
            <Card padding="lg" rounded="sm" width="stretch" height="hug">
              <Frame width="stretch" height="hug" align="center" justify="space-between" className="border-b-[var(--color-outline)] pb-[var(--space-md)]">
                <Heading type="h2" size="sm">Task Manager</Heading>
                <Frame gap="sm">
                  <Button variant="fill" iconPosition="left" rounded="lg" size="sm" iconName="icon-plus">Add Task</Button>
                  <Tooltip content="expand" position="top">
                    <Button variant="outline" isIcon size="sm" iconName="icon-expand"/>
                  </Tooltip>
                </Frame>
              </Frame>
              <Frame width="stretch" align="center" gap="xs" height="hug" className="mb-[var(--space-md)] mt-[var(--space-sm)]">
                <Heading type="h3" size="xs">Today</Heading>
                <Frame>
                  <Paragraph size="xs"> • 8 Tasks • 5 Completed • 5 Pending  </Paragraph>
                </Frame>
              </Frame>
              <Frame width="stretch" padding="xs" gap="xxs" rounded="md" border direction="column" className="flex-1" specificStyles={{overflow: "hidden"}}>
                <TaskLine >
                  <Frame>
                    <Paragraph size="sm" color="textColor1" >
                      {shortenText("This is the way I wanted to be o. This is the way I wanted to be", 30)}
                    </Paragraph>
                  </Frame>
                  <Frame justify="space-between" align="center">
                    <Frame width="stretch" height="hug" gap="xs">
                      <Frame width="hug" height="hug" className="bg-[var(--color-accent2)]" rounded="lg" specificStyles={{padding: `1px 6px`}}>
                        <Paragraph color="accent1" size="xxs" weight="medium">
                          high
                        </Paragraph>
                      </Frame>
                      <Frame width="hug" height="hug" rounded="lg" specificStyles={{
                          backgroundColor: colors["success2"],
                          padding: `1px 6px`
                      }}>
                        <Paragraph color="success" size="xxs" weight="medium">
                          Completed
                        </Paragraph>
                      </Frame>
                    </Frame>
                    <Frame gap="sm">
                      <Tooltip content="mark as done" position="top">
                        <Button iconColor="success" size="xs" variant="ghost" rounded="xs" isIcon iconName="icon-double-check" specificStyles={{
                          backgroundColor:colors["success2"]
                        }}/>
                      </Tooltip>
                      <Tooltip content="delete" position="top">
                        <Button iconColor="error" size="xs" variant="ghost" rounded="xs" isIcon iconName="icon-delete" specificStyles={{
                          backgroundColor:colors["error2"]
                        }}/>
                      </Tooltip>
                    </Frame>
                  </Frame>
                </TaskLine>
                <TaskLine >
                  <Frame>
                    <Paragraph size="sm" color="textColor1">
                      {shortenText("This is the way I wanted to be o. This is the way I wanted to be", 30)}
                    </Paragraph>
                  </Frame>
                  <Frame justify="space-between" align="center">
                    <Frame width="stretch" height="hug" gap="xs">
                      <Frame width="hug" height="hug" className="bg-[var(--color-accent2)]" rounded="lg" specificStyles={{padding: `1px 6px`}}>
                        <Paragraph color="accent1" size="xxs" weight="medium">
                          high
                        </Paragraph>
                      </Frame>
                      <Frame width="hug" height="hug" rounded="lg" specificStyles={{
                          backgroundColor: colors["success2"],
                          padding: `1px 6px`
                      }}>
                        <Paragraph color="success" size="xxs" weight="medium">
                          Completed
                        </Paragraph>
                      </Frame>
                    </Frame>
                    <Frame gap="sm">
                      <Tooltip content="mark as done" position="top">
                        <Button iconColor="success" size="xs" variant="ghost" rounded="xs" isIcon iconName="icon-double-check" specificStyles={{
                          backgroundColor:colors["success2"]
                        }}/>
                      </Tooltip>
                      <Tooltip content="delete" position="top">
                        <Button iconColor="error" size="xs" variant="ghost" rounded="xs" isIcon iconName="icon-delete" specificStyles={{
                          backgroundColor:colors["error2"]
                        }}/>
                      </Tooltip>
                    </Frame>
                  </Frame>
                </TaskLine>
                <TaskLine >
                  <Frame>
                    <Paragraph size="sm" color="textColor1">
                      {shortenText("This is the way I wanted to be o. This is the way I wanted to be", 30)}
                    </Paragraph>
                  </Frame>
                  <Frame justify="space-between" align="center">
                    <Frame width="stretch" height="hug" gap="xs">
                      <Frame width="hug" height="hug" className="bg-[var(--color-accent2)]" rounded="lg" specificStyles={{padding: `1px 6px`}}>
                        <Paragraph color="accent1" size="xxs" weight="medium">
                          high
                        </Paragraph>
                      </Frame>
                      <Frame width="hug" height="hug" rounded="lg" specificStyles={{
                          backgroundColor: colors["warning2"],
                          padding: `1px 6px`
                      }}>
                        <Paragraph color="warning" size="xxs" weight="medium">
                          Pending
                        </Paragraph>
                      </Frame>
                    </Frame>
                    <Frame gap="sm">
                      <Tooltip content="mark as done" position="top">
                        <Button iconColor="success" size="xs" variant="ghost" rounded="xs" isIcon iconName="icon-double-check" specificStyles={{
                          backgroundColor:colors["success2"]
                        }}/>
                      </Tooltip>
                      <Tooltip content="delete" position="top">
                        <Button iconColor="error" size="xs" variant="ghost" rounded="xs" isIcon iconName="icon-delete" specificStyles={{
                          backgroundColor:colors["error2"]
                        }}/>
                      </Tooltip>
                    </Frame>
                  </Frame>
                </TaskLine>
              </Frame>
            </Card>
  )
}
