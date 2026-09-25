import { colors, ColorTypes } from "@/src/app/design/colors"
import { ToastType } from "@/src/types/types"
import { CSSProperties, useEffect, useState } from "react"
import Button from "../primitives/button"
import Frame from "../primitives/frame"
import Icon, { IconType } from "../primitives/icon"
import Label from "../primitives/label"
import Paragraph from "../primitives/paragraph"

type ToastProps = ToastType & {
  onClose?: () => void
  exitDuration?: number
}

export default function Toast({variant, title, message, onClose, exitDuration = 260}: ToastProps) {
  const [isLeaving, setIsLeaving] = useState(false)

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
    flexShrink:0,
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsLeaving(true)
    }, 5000)

    const exitTimeoutId = window.setTimeout(() => {
      onClose?.()
    }, 5000 + exitDuration)

    return () => {
      window.clearTimeout(timeoutId)
      window.clearTimeout(exitTimeoutId)
    }
  }, [exitDuration, onClose])

  return (
    <div
      className="w-[350px] shrink-0 overflow-hidden rounded-[var(--radius-sm)] bg-[var(--color-white)]"
      style={{
        opacity: isLeaving ? 0 : 1,
        transform: isLeaving ? "translateX(18px)" : "translateX(0)",
        transition: `transform ${exitDuration}ms ease, opacity ${exitDuration}ms ease`,
      }}
    >
      <Frame className="w-full h-full border gap-[var(--space-md)] rounded-[inherit] p-[var(--space-md)]" specificStyles={{ ...baseStyle }}>
        <Button
          variant="ghost"
          isIcon
          iconColor="textColor2"
          iconName="icon-x"
          size="xxs"
          className="right-[var(--space-sm)] top-[var(--space-sm)]"
          specificStyles={{
            position:"absolute",
            backgroundColor:"transparent"
          }}
          func={onClose}
        />

        <Icon
          size="md"
          stroke="1.5"
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
              weight="normal"
              size="sm"
              color={variant}
              text={title}
              className="w-[90%]"
            />
          }

          <Paragraph
            size="xs"
            weight="normal"
            className="leading-[1.5] w-full"
            specificStyle={{wordBreak:"break-all"}}
          >
            {message}
          </Paragraph>
        </Frame>
      </Frame>
    </div>
  )
}