import BusinessPageHeader from "@/src/components/app/businessPageHeader"
import LeftAside from "@/src/components/app/leftAside"
import RightAside from "@/src/components/app/rightAside"
import Main from "@/src/components/layout/main"
import Nav from "@/src/components/layout/nav"
import Frame from "@/src/components/ui/primitives/frame"
import { ReactNode } from "react"
// import Tab from "@/src/components/ui/composites/tab"

type LayoutProps = {
  children: ReactNode
}

export default function Layout({children}: LayoutProps) {
  return (
    <Frame className="w-full h-[100vh]">
      <LeftAside/>
      <Frame  className="h=full flex-col h-full flex-1 overflow-hidden bg-[var(--color-background1)]">
        <Nav/>
        <BusinessPageHeader />
        {/* <SmartNavigation/> */}
        <Frame className="w-full flex-1 min-h-0 justify-center">
          <Main>
            {children}
          </Main>
          <RightAside/>
        </Frame>
      </Frame>
      {/* <Tab/> */}
      {/* <Frame className="bottom-[var(--space-xl)] right-[var(--space-xxl)] h-max w-max" 
        specificStyles={{ position: "fixed", zIndex:"300"}}>
          <Tooltip position="top" content="add">
            <Button variant="fill" size="xxl" isIcon iconName="icon-plus" iconPosition="left" width="hug" rounded="lg" className={`${shadow1}`}/>
          </Tooltip>
      </Frame> */}
    </Frame>
  )
}