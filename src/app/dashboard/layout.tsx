import Frame from "@/src/components/ui/primitives/frame"
import Nav from "@/src/components/layout/nav"
import Main from "@/src/components/layout/main"
import LeftAside from "@/src/components/layout/leftAside"
import RightAside from "@/src/components/layout/rightAside"
import { ReactNode } from "react"
import { colors, colorVariables } from "../design/colors"
import { space } from "../design/spacing"
import PageComponent from "@/src/components/layout/page"

type LayoutProps = {
  children: ReactNode
}
export default function Layout({children}: LayoutProps) {
  return (
    <PageComponent 
      scrollable={false} 
      direction="column" 
      specificStyle={{
        gap:"1px", 
        overflow:"hidden",
        backgroundColor: colors["background3"]
      }}
    >
      <Nav/>
      <Frame width="stretch" height="stretch"
        specificStyle={{
          gap: space["xs"], 
          flex:"1",
        }}
        >
        <LeftAside/>
        <Main padding="lg"
          specificStyles={{
            paddingBottom: "80px",
          }}>
          {children}
        </Main>
        <RightAside/>
      </Frame>
    </PageComponent>
  )
}

