import { ReactNode } from "react"
import Frame from "./frame"

type BlindProps = {
    children: ReactNode
}

export default function Backdrop({children}:BlindProps) {
  return (
    <Frame 
        width="stretch" 
        height="stretch" 
        centered 
        specificStyle={{
            backgroundColor: "#00000033",
            position: "fixed",
            inset: 0,
            zIndex: 2000
        }}
    >
        {
            children
        }
    </Frame>
  )
}
