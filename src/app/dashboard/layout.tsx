import Frame from "@/src/components/mixed/frame"
import Nav from "@/src/components/layout/nav"
import Main from "@/src/components/layout/main"
import LeftAside from "@/src/components/layout/leftAside"
import RightAside from "@/src/components/layout/rightAside"
import { ReactNode } from "react"
import { colors, colorVariables } from "../design/colors"
import { space } from "../design/space"

type LayoutProps = {
  children: ReactNode
}
export default function Layout({children}: LayoutProps) {
  return (
    <Frame variant="page" direction="column" specificStyle={{gap:"1px", height:"100vh", backgroundColor: colors["background3"]}}>
      <Nav/>
      <Frame variant="stretch" specificStyle={{gap: space["xs"], flex:"1"}}>
        <LeftAside/>
        <Main>
          {children}
        </Main>
        <RightAside/>
      </Frame>
    </Frame>
  )
}

