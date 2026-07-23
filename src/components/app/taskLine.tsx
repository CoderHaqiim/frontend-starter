import { bodySize } from "@/src/app/design/typograhy"
import Frame from "../ui/primitives/frame"
import { ReactNode } from "react"
import { space } from "@/src/app/design/spacing"
import { colors } from "@/src/app/design/colors"
import Tooltip from "../ui/composites/tooltip"
import Paragraph from "../ui/primitives/paragraph"
import { shortenText } from "@/src/utils/shortenText"
import Button from "../ui/primitives/button"

type TaskLineProps = {
  task: any
}

export default function TaskLine({task}: TaskLineProps) {
  return (
    <Frame width="stretch" gap="xxs" justify="center" height="hug" padding="md" direction="column" 
        className="shrink-0 text-[length:var(--bodySize-sm)]">
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
    </Frame>
  )
}
