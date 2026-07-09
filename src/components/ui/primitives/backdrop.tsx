import { ReactNode } from "react"
import Frame from "./frame"

type BackdropProps = {
    children: ReactNode,
    modalIsOpen : boolean
}

export default function Backdrop({children, modalIsOpen}:BackdropProps) {
  return (
    <Frame width="stretch" height="stretch" centered className="bg-[00000033] fixed inset-0 z-3000" 
        specificStyles={{
            display: modalIsOpen? "flex" : "none"
        }}>
        {children}
    </Frame>
  )
}
