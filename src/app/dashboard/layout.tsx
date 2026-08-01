import Frame from "@/src/components/ui/primitives/frame"
import Nav from "@/src/components/layout/nav"
import Main from "@/src/components/layout/main"
import LeftAside from "@/src/components/app/leftAside"
import RightAside from "@/src/components/app/rightAside"
import { ReactNode } from "react"
import Tab from "@/src/components/ui/composites/tab"

type LayoutProps = {
  children: ReactNode
}

export default function Layout({children}: LayoutProps) {
  return (
    <Frame width="stretch" height="100vh">
      <LeftAside/>
      <Frame direction="column" height="stretch" className="flex-1 overflow-hidden bg-[var(--color-background1)]">
        <Nav/>
        <Frame width="stretch" justify="center" specificStyles={{ height:"calc(100% - 60px)"}}>
          <Main padding="lg">
            {children}
          </Main>
          <RightAside/>
        </Frame>
      </Frame>
      <Tab/>
    </Frame>
  )
}

