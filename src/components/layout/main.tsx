import { ReactNode } from "react"
import Frame from "../mixed/frame"

type MainProps = {
    children: ReactNode
}

export default function Main({children}: MainProps) {
  return (
    <main className="w-auto flex-1 h-full">
        {children}
    </main>
  )
}
