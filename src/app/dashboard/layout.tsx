import Frame from "@/src/components/ui/primitives/frame"
import Nav from "@/src/components/layout/nav"
import Main from "@/src/components/layout/main"
import LeftAside from "@/src/components/app/leftAside"
import RightAside from "@/src/components/app/rightAside"
import { ReactNode } from "react"
import { colors, colorVariables } from "../design/colors"
import { space } from "../design/spacing"
import Button from "@/src/components/ui/primitives/button"
import PageComponent from "@/src/components/layout/page"
import Tooltip from "@/src/components/ui/composites/tooltip"

type LayoutProps = {
  children: ReactNode
}

export default function Layout({children}: LayoutProps) {
  return (
    <Frame width="stretch" height="100vh">
      <LeftAside/>
      <Frame direction="column" height="stretch" className="flex-1 overflow-hidden bg-[var(--color-background1)]">
        <Nav/>
        <Frame width="stretch" specificStyles={{
          height:"calc(100% - 60px)"
        }}>
          <Main padding="lg">
            {children}
          </Main>
          <RightAside/>
          <Frame height="hug" width="hug" className="bottom-[var(--space-xl)] right-[var(--space-xxl)]" 
            specificStyles={{ position: "fixed", zIndex:"300"}}>
            <Tooltip position="top" content="add">
              <Button variant="fill" size="xxl" isIcon iconName="icon-plus" iconPosition="left" width="hug" rounded="lg" className="shadow-[0_4px_8px_#00000080]"/>
            </Tooltip>
          </Frame>
        </Frame>
      </Frame>
    </Frame>
  )
}

