import Frame from "../mixed/frame"
import Icon from "./icon"
import Paragraph from "./paragraph"

type ToastProps = {
  variant: "success" | "error" | "warning" | "info",
  text: string
}

export default function Toast({variant, text}: ToastProps) {
  const baseStyle = {height:"max-content", width: "350px"}
  const successStyle = {border:"0.5px solid #02681d", color:"#02681d", backgroundColor:"#def9e0", gap:"8px", ...baseStyle}
  const errorStyle = {border:"0.5px solid #e50000", color:"#e50000", backgroundColor:"#f6d0d0", gap:"8px", ...baseStyle}
  const warningStyle = {border:"0.5px solid #c09d05", color:"#c09d05", backgroundColor:"#f6f0bf", gap:"8px", ...baseStyle}
  const infoStyle = {border:"0.5px solid #0534c0", color:"#0534c0", backgroundColor:"#bfccf6", gap:"8px", ...baseStyle}
  
  const specificStyle = 
  variant === "success"? successStyle : 
  variant === "error"? errorStyle : 
  variant === "warning"? warningStyle : 
  variant === "info"? infoStyle : undefined

  const accentColor = 
  variant === "success"? "#02681d":
  variant === "error"? "#e50000":
  variant === "warning"? "#c09d05":
  variant === "info"? "#0534c0": undefined

  return (
    <Frame variant="custom" padded rounded specificStyle={specificStyle}>
        <Icon variant="icon-md" name="icon-badge-alert" color={accentColor}/>
        <Paragraph size="md" text={text} specificStyle={{color: accentColor, width:"280px"}}/>
    </Frame>
  )
}
