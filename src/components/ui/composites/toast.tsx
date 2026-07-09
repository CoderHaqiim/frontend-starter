import Frame from "../primitives/frame"
import Icon,{IconType} from "../primitives/icon"
import Paragraph from "../primitives/paragraph"
import Button from "../primitives/button"
import { colors } from "@/src/app/design/colors"
import { space } from "@/src/app/design/spacing"
import { CSSProperties } from "react"
import Label from "../primitives/label"

type ToastProps = {
  variant: "success" | "error" | "warning" | "info",
  text: string,
  title?: string
}

export default function Toast({variant, title, text}: ToastProps) {
  const accentColor = colors[variant]
  const background = {
    "success": "#f2f9f3",
    "error": "#faebe9",
    "warning": "#f7f4e8",
    "info": "#f3f3fd"
  }

  const iconMap: Record<string,IconType>= {
    "success" : "icon-badge-check",
    "error":"icon-badge-x",
    "warning":"icon-badge-alert",
    "info":"icon-badge-info"
  }

  const baseStyle: CSSProperties = {gap:"12px", color:`${accentColor}`, boxShadow:"5px 5px 3px -2px #0000005b, 0px 0px 5px -2px #00000057"}
  const toastStyle = { backgroundColor: `${background[variant]}`}

  return (
    <Frame width="350px" border height="hug" padding="md" rounded="sm" 
      specificStyles={{
        ...baseStyle, 
        ...toastStyle
      }}
    >
        <Button variant="ghost" isIcon iconName="icon-x" size="sm" className="absolute right-[var(--space-sm)] top-[var(--space-sm)]"/>
        <Icon size="xxl" stroke={2} name={iconMap[variant]} color={accentColor}/>
        <Paragraph size="sm" specificStyle={{color: accentColor, display:"flex", flexDirection:"column", width:"280px", lineHeight:"1.2"}}>
          {
            title && <Label size="md" text={variant + ": " + title} specificStyle={{color: accentColor}}/>
          }
          <span className="leading-[1.5] mt-[4px]">
            {text}
          </span>
        </Paragraph>
    </Frame>
  )
}
