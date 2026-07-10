"use client"

import { ReactNode } from "react"
import Frame from "./frame"
import { useBackdropState } from "@/src/store/backdropState"

type BackdropProps = {
    children: ReactNode,
}

export default function Backdrop({children}:BackdropProps) {
  const {backdropOpen} = useBackdropState()
  return (
    <Frame width="stretch" height="100vh" justify="center" align="center" className="bg-[#00000040] inset-0 z-3000" 
        specificStyles={{
            display: backdropOpen? "flex" : "none",
            position: "fixed"
        }}>
        {children}
    </Frame>
  )
}
