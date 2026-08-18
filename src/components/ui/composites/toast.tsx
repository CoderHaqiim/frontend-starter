import Frame from "../primitives/frame"
import Icon, { IconType } from "../primitives/icon"
import Paragraph from "../primitives/paragraph"
import Button from "../primitives/button"
import { colors, ColorTypes } from "@/src/app/design/colors"
import { space } from "@/src/app/design/spacing"
import { CSSProperties } from "react"
import Label from "../primitives/label"

type ToastProps = {
  variant: "success" | "error" | "warning" | "info",
  text: string,
  title?: string
}

export default function Toast({variant, title, text}: ToastProps) {

  const background:ColorTypes = `${variant}2`

  const iconMap: Record<string, IconType>= {
    "success" : "icon-badge-check",
    "error":"icon-badge-x",
    "warning":"icon-badge-alert",
    "info":"icon-badge-info"
  }

  const baseStyle: CSSProperties = {
    color: colors[variant], 
    boxShadow:"5px 5px 3px -2px #0000005b, 0px 0px 5px -2px #00000057",
    backgroundColor: colors[background],
    flexShrink:0
  }

  return (
    <Frame
      className="w-[350px] gap-[var(--space-md)] border h-max p-[var(--space-md)] rounded-[var(--radius-sm)] shrink-0"
      specificStyles={{ ...baseStyle }}
    >
        <Button
          variant="outline"
          isIcon
          iconName="icon-x"
          size="xs"
          className="right-[var(--space-sm)] top-[var(--space-sm)]"
          specificStyles={{
            position:"absolute",
            backgroundColor:"transparent"
          }}
        />

        <Icon
          size="lg"
          stroke="2"
          name={iconMap[variant]}
          color={variant}
          style={{flexShrink:0}}
        />

        <Frame
          className="flex-col w-[80%] mt-[var(--space-xs)]"
        >
          {
            title &&
            <Label
              weight="medium"
              size="md"
              color={variant}
              text={title}
              className="w-[90%]"
            />
          }

          <Paragraph
            size="sm"
            weight="normal"
            className="leading-[1.5] w-full"
            specificStyle={{wordBreak:"break-all"}}
          >
            {text}
          </Paragraph>
        </Frame>
    </Frame>
  )
}