import Frame from "@/src/components/ui/primitives/frame"
import Nav from "@/src/components/layout/nav"
import Main from "@/src/components/layout/main"
import LeftAside from "@/src/components/layout/leftAside"
import RightAside from "@/src/components/layout/rightAside"
import { ReactNode } from "react"
import { colors, colorVariables } from "../design/colors"
import { space } from "../design/spacing"
import Button from "@/src/components/ui/primitives/button"
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
        gap:"2px", 
        overflow:"hidden",
        backgroundColor: colors["background3"]
      }}
    >
      <Nav/>
      <Frame width="stretch" height="stretch"
        specificStyle={{
          gap:"2px", 
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
        <Button 
          variant="text-icon" 
          size="xl" 
          iconName="icon-plus" 
          iconPosition="left" 
          text="Add Business"
          iconColor = {colors["white"]}

          specificStyles={{
            position:"fixed",
            bottom: space["xl"],
            right: space["xl"]
          }}
        />
      </Frame>
    </PageComponent>
  )
}

