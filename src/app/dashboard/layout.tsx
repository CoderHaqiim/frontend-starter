import Frame from "@/src/components/mixed/frame"
import { navItems } from "@/src/utils/navItems"
import Nav from "@/src/components/layout/nav"
import Main from "@/src/components/layout/main"
import LeftAside from "@/src/components/layout/leftAside"
import RightAside from "@/src/components/layout/rightAside"
import { ReactNode } from "react"

type LayoutProps = {
  children: ReactNode
}
export default function Layout({children}: LayoutProps) {
  return (
    <Frame variant="custom" direction="column" specificStyle={{width:"100%", height:"100vh", backgroundColor:"white"}}>
      <Nav/>
      <Frame variant="stretch">
        <LeftAside/>
        <Main>
          {children}
        </Main>
        <RightAside/>
      </Frame>
    </Frame>
  )
}

