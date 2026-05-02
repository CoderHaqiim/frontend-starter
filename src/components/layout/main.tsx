import { ReactNode } from "react"
import Frame from "../mixed/frame"

type MainProps = {
    children: ReactNode
}

export default function Main({children}: MainProps) {
  return (
    <Frame variant="custom">
        {children}
    </Frame>
  )
}
