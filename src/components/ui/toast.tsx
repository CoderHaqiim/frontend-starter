import Frame from "../mixed/frame"
import Icon from "./icon"
import Paragraph from "./paragraph"

type ToastProps = {
  variant: "success" | "error" | "warning" | "info",
  text: string
}

export default function Toast({variant, text}: ToastProps) {
  const accentColor = 
  variant === "success"? "#02681d":
  variant === "error"? "#e50000":
  variant === "warning"? "#bd8c04":
  variant === "info"? "#0534c0": undefined

  const baseStyle = {height:"max-content", width: "350px", border:`1px solid ${accentColor}`, color:`${accentColor}`}
  const successStyle = {backgroundColor:"#def9e0", gap:"8px", ...baseStyle}
  const errorStyle = {backgroundColor:"#f6d0d0", gap:"8px", ...baseStyle}
  const warningStyle = {backgroundColor:"#f9f7e3", gap:"8px", ...baseStyle}
  const infoStyle = {backgroundColor:"#d9e0f7", gap:"8px", ...baseStyle}
  
  const specificStyle = 
  variant === "success"? successStyle : 
  variant === "error"? errorStyle : 
  variant === "warning"? warningStyle : 
  variant === "info"? infoStyle : undefined

  return (
    <Frame variant="custom" padding="lg" rounded specificStyle={specificStyle}>
        <Icon size="md" stroke={2} name="icon-badge-alert" color={accentColor}/>
        <Paragraph size="md" specificStyle={{color: accentColor, width:"280px"}}>
          {text}
        </Paragraph>
    </Frame>
  )
}
