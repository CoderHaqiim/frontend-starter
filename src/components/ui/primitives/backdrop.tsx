import { ReactNode } from "react"
import Frame from "./frame"

type BackdropProps = {
    children: ReactNode,
    modalIsOpen : boolean
}

export default function Backdrop({children, modalIsOpen}:BackdropProps) {
  return (
    <Frame 
        width="stretch" 
        height="stretch" 
        centered 
        specificStyles={{
            backgroundColor: "#00000033",
            position: "fixed",
            inset: 0,
            zIndex: 2000,
            display: modalIsOpen? "flex" : "none"
        }}
    >
        {
            children
        }
    </Frame>
  )
}
