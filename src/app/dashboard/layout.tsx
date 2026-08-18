import Frame from "@/src/components/ui/primitives/frame"
import Nav from "@/src/components/layout/nav"
import Main from "@/src/components/layout/main"
import LeftAside from "@/src/components/app/leftAside"
import RightAside from "@/src/components/app/rightAside"
import { ReactNode } from "react"
import Tab from "@/src/components/ui/composites/tab"
import Tooltip from "@/src/components/ui/composites/tooltip"
import Button from "@/src/components/ui/primitives/button"
import { shadow1 } from "../design/shadows"

type LayoutProps = {
  children: ReactNode
}

export default function Layout({children}: LayoutProps) {
  return (
    <Frame className="w-full h-[100vh]">
      <LeftAside/>
      <Frame direction="column" height="stretch" className="flex-col h-full flex-1 overflow-hidden bg-[var(--color-background1)]">
        <Nav/>
        <Frame width="stretch" justify="center" specificStyles={{ height:"calc(100% - 60px)"}}>
          <Main>
            {children}
          </Main>
          <RightAside/>
        </Frame>
      </Frame>
      <Tab/>
      <Frame className="bottom-[var(--space-xl)] right-[var(--space-xxl)] h-max w-max" 
        specificStyles={{ position: "fixed", zIndex:"300"}}>
          <Tooltip position="top" content="add">
            <Button variant="fill" size="xxl" isIcon iconName="icon-plus" iconPosition="left" width="hug" rounded="lg" className={`${shadow1}`}/>
          </Tooltip>
        </Frame>
    </Frame>
  )
}