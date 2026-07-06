import Frame from "../../ui/primitives/frame"
import Card from "../../ui/composites/card"
import { colors } from "@/src/app/design/colors"
import { space } from "@/src/app/design/spacing"
import Heading from "../../ui/primitives/heading"
import Button from "../../ui/primitives/button"
import MiniTaskLine from "../MiniTaskLine"
import Paragraph from "../../ui/primitives/paragraph"
import { shortenText } from "@/src/utils/shortenText"
import { radius } from "@/src/app/design/radius"
import { bodySize } from "@/src/app/design/typograhy"
import { fontWeight } from "@/src/app/design/typograhy"

export default function TaskManagerCard() {
  return (
    
            <Card padding="md" rounded="sm" width="stretch" height="hug" specificStyles={{
              backgroundColor: colors["white"],
            }}>
              <Frame width="full" height="hug" 
                specificStyles={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: space["md"],
                  borderBottom: `solid 1px ${colors["outline"]}`
                }}>
                <Heading type="h2" size="md">Task Manager</Heading>
                <Frame specificStyles={{gap: space["sm"]}}>
                  <Button variant="fill" iconPosition="left" rounded="lg" size="sm" iconName="icon-plus">Add Task</Button>
                  <Button variant="outline" isIcon size="sm" iconName="icon-expand"/>
                </Frame>
              </Frame>
              <Frame width="stretch" height="hug" specificStyles={{marginTop: space["sm"], marginBottom: space["sm"],gap: space["xs"], alignItems: "center"}}>
                <Heading type="h3" size="sm">
                  Today
                </Heading>
                <Frame>
                  <Paragraph size="sm">• 8 Tasks • 5 Completed </Paragraph>
                </Frame>
              </Frame>
              <Frame width="stretch" direction="column" scroll={false} 
                specificStyles={{
                  flex:1,
                  overflow: "hidden",
                  gap: space["sm"]
                }}>
                <MiniTaskLine >
                  <Frame>
                    {shortenText("This is the way I wanted to be o", 50)}
                  </Frame>
                  <Frame>
                    <Frame width="hug" height="hug" rounded="lg" specificStyles={{
                      fontSize: bodySize["xs"],
                      fontWeight: fontWeight["bold"],
                      color: colors["error"],
                      border: `solid 0.5px ${colors["error"]}`,
                      padding: `1px 6px`
                    }}>
                      high
                    </Frame>
                  </Frame>
                </MiniTaskLine>
                <MiniTaskLine >
                  <Frame>
                    {shortenText("This is the way I wanted to be o", 50)}
                  </Frame>
                  <Frame>
                    <Frame width="hug" height="hug" rounded="lg" specificStyles={{
                      fontSize: bodySize["xs"],
                      fontWeight: fontWeight["bold"],
                      color: colors["info"],
                      border: `solid 0.5px ${colors["info"]}`,
                      padding: `1px 6px`
                    }}>
                      low
                    </Frame>
                  </Frame>
                </MiniTaskLine>
                <MiniTaskLine >
                  <Frame>
                    {shortenText("This is the way I wanted to be o", 50)}
                  </Frame>
                  <Frame>
                    <Frame width="hug" height="hug" rounded="lg" specificStyles={{
                      fontSize: bodySize["xs"],
                      fontWeight: fontWeight["bold"],
                      color: colors["warning"],
                      border: `solid 0.5px ${colors["warning"]}`,
                      padding: `1px 6px`
                    }}>
                      medium
                    </Frame>
                  </Frame>
                </MiniTaskLine>
              </Frame>
            </Card>
  )
}
