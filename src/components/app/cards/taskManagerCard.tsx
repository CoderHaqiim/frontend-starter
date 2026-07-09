import Frame from "../../ui/primitives/frame"
import Card from "../../ui/composites/card"
import { colors } from "@/src/app/design/colors"
import { space } from "@/src/app/design/spacing"
import Heading from "../../ui/primitives/heading"
import Button from "../../ui/primitives/button"
import MiniTaskLine from "../miniTaskLine"
import Paragraph from "../../ui/primitives/paragraph"
import { shortenText } from "@/src/utils/shortenText"
import { radius } from "@/src/app/design/radius"
import { bodySize } from "@/src/app/design/typograhy"
import { fontWeight } from "@/src/app/design/typograhy"
import Tooltip from "../../ui/composites/tooltip"

export default function TaskManagerCard() {
  return (
    
            <Card padding="md" rounded="sm" width="stretch" height="hug" className="bg-[var(--color-background1)]">
              <Frame width="full" height="hug" 
                specificStyles={{ justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: space["md"],
                  borderBottom: `solid 1px ${colors["outline"]}`
                }}>
                <Heading type="h2" size="md">Task Manager</Heading>
                <Frame specificStyles={{gap: space["sm"]}}>
                  <Button variant="fill" iconPosition="left" rounded="lg" size="sm" iconName="icon-plus">Add Task</Button>
                  <Tooltip content="expand" position="top">
                    <Button variant="outline" isIcon size="sm" iconName="icon-expand"/>
                  </Tooltip>
                </Frame>
              </Frame>
              <Frame width="stretch" height="hug" specificStyles={{marginTop: space["sm"], marginBottom: space["sm"], gap: space["xs"], alignItems: "center"}}>
                <Heading type="h3" size="sm">Today</Heading>
                <Frame>
                  <Paragraph size="xs"> • 8 Tasks • 5 Completed • 5 Pending  </Paragraph>
                </Frame>
              </Frame>
              <Frame width="stretch" direction="column" padding="md" specificStyles={{ flex:1, overflow: "hidden",gap: space["sm"]}}>
                <MiniTaskLine >
                  <Frame>{shortenText("This is the way I wanted to be o. This is the way I wanted to be", 30)}</Frame>
                  <Frame specificStyles={{justifyContent: "space-between", alignItems:"center"}}>
                    <Frame width="stretch" height="hug" specificStyles={{ gap:space["xs"]}}>
                      <Frame width="hug" height="hug" rounded="lg" specificStyles={{
                        fontSize: bodySize["xs"],
                        fontWeight: fontWeight["medium"],
                        color: colors["accent1"],
                        backgroundColor: colors["accent2"],
                        padding: `1px 6px`
                      }}>
                        high
                      </Frame>
                      <Frame width="hug" height="hug" rounded="lg" specificStyles={{
                          fontSize: bodySize["xs"],
                          fontWeight: fontWeight["medium"],
                          color: colors["success"],
                          backgroundColor: colors["success2"],
                          padding: `1px 6px`
                      }}>
                        Completed
                      </Frame>
                    </Frame>
                    <Frame specificStyles={{gap:space["sm"]}}>
                      <Tooltip content="mark as done" position="top">
                        <Button iconColor={colors["success"]} size="xs" variant="ghost" rounded="xs" isIcon iconName="icon-double-check" specificStyles={{
                          backgroundColor:colors["success2"]
                        }}/>
                      </Tooltip>
                      <Tooltip content="delete task" position="top">
                        <Button iconColor={colors["error"]} size="xs" variant="ghost" rounded="xs" isIcon iconName="icon-delete" specificStyles={{
                          backgroundColor:colors["error2"]
                        }}/>
                      </Tooltip>
                    </Frame>
                  </Frame>
                </MiniTaskLine>
                <MiniTaskLine >
                  <Frame>{shortenText("This is the way I wanted to be o. This is the way I wanted to be", 30)}</Frame>
                  <Frame specificStyles={{gap:space["xs"]}}>
                    <Frame width="hug" height="hug" rounded="lg" specificStyles={{
                      fontSize: bodySize["xs"],
                      fontWeight: fontWeight["medium"],
                      color: colors["accent1"],
                      backgroundColor: colors["accent2"],
                      padding: `1px 6px`
                    }}>
                      high
                    </Frame>
                    <Frame width="hug" height="hug" rounded="lg" specificStyles={{
                      fontSize: bodySize["xs"],
                      fontWeight: fontWeight["medium"],
                      color: colors["info"],
                      backgroundColor: colors["info2"],
                      padding: `1px 6px`
                    }}>
                      In Progress
                    </Frame>
                  </Frame>
                </MiniTaskLine>
                <MiniTaskLine >
                  <Frame>{shortenText("This is the way I wanted to be o. This is the way I wanted to be", 30)}</Frame>
                  <Frame specificStyles={{gap:space["xs"]}}>
                    <Frame width="hug" height="hug" rounded="lg" specificStyles={{
                      fontSize: bodySize["xs"],
                      fontWeight: fontWeight["medium"],
                      color: colors["accent1"],
                      backgroundColor: colors["accent2"],
                      padding: `1px 6px`
                    }}>
                      high
                    </Frame>
                    <Frame width="hug" height="hug" rounded="lg" specificStyles={{
                      fontSize: bodySize["xs"],
                      fontWeight: fontWeight["medium"],
                      color: colors["warning"],
                      backgroundColor: colors["warning2"],
                      padding: `1px 6px`
                    }}>
                      Pending
                    </Frame>
                  </Frame>
                </MiniTaskLine>
              </Frame>
            </Card>
  )
}
