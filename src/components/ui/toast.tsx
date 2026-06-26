import Frame from "../mixed/frame"
import Icon,{IconType} from "./icon"
import Paragraph from "./paragraph"
import Button from "./button"
import { colors } from "@/src/app/design/colors"
import { space } from "@/src/app/design/space"
import { CSSProperties } from "react"
import Label from "./label"

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

  const baseStyle: CSSProperties = { height:"max-content", border:"solid 1px var(--outline-color1)", gap:"12px", width: "350px", color:`${accentColor}`, boxShadow:"5px 5px 3px -2px #0000005b, 0px 0px 5px -2px #00000057"}
  const toastStyle = { backgroundColor: `${background[variant]}`}

  return (
    <Frame variant="custom" padding="md" rounded="sm" specificStyle={{...baseStyle, ...toastStyle}}>
        <Button variant="icon" iconName="icon-x" size="sm" id="close-toast" specificStyle={{position:"absolute", right: space["sm"], top: space["sm"]}}/>
        <Icon size="xxl" stroke={2} name={iconMap[variant]} color={accentColor}/>
        <Paragraph size="sm" specificStyle={{color: accentColor, display:"flex", flexDirection:"column", width:"280px", lineHeight:"1.2"}}>
          <Label size="md" text={title && variant + ": " + title} specificStyle={{color: accentColor}}/>
          <span className="leading-[1.5] mt-[4px]">
            {text}
          </span>
        </Paragraph>
    </Frame>
  )
}
