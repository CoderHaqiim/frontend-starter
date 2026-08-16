import { bodySize } from "@/src/app/design/typograhy"
import Frame from "../ui/primitives/frame"
import { ReactNode } from "react"
import { space } from "@/src/app/design/spacing"
import { colors } from "@/src/app/design/colors"
import Tooltip from "../ui/composites/tooltip"
import Paragraph from "../ui/primitives/paragraph"
import { shortenText } from "@/src/utils/shortenText"
import Button from "../ui/primitives/button"
import Badge from "../ui/composites/badge"

type TaskLineProps = {
  task: any
}

export default function TaskLine({task}: TaskLineProps) {
  return (
    <Frame width="stretch" gap="xxs" justify="center" height="hug" padding="md" direction="column" 
        className="shrink-0 text-[length:var(--bodySize-sm)]">
      <Frame>
        <Paragraph size="sm" color="textColor1" >
          {shortenText("This is the way I wanted to be o. This is the way I wanted to be", 40)}
        </Paragraph>
      </Frame>
      <Frame justify="space-between" align="center">
        <Frame width="stretch" height="hug" gap="xs">
          <Badge size="xxs" text="high" color="error"/>
          <Badge size="xxs" text="completed" color="success"/>
        </Frame>
        <Frame gap="sm">
          <Tooltip content="mark as done" position="top">
            <Button iconColor="success" size="xxs" variant="outline" rounded="xs" isIcon iconName="icon-double-check" specificStyles={{
              // backgroundColor:colors["success2"]
            }}/>
          </Tooltip>
          <Tooltip content="delete" position="top">
            <Button iconColor="error" size="xxs" variant="outline" rounded="xs" isIcon iconName="icon-delete" specificStyles={{
              // backgroundColor:colors["error2"]
            }}/>
          </Tooltip>
        </Frame>
      </Frame>
    </Frame>
  )
}
