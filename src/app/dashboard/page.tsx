"use client"

import Frame from "@/src/components/ui/primitives/frame"
import Main from "@/src/components/layout/main"
import Heading from "@/src/components/ui/primitives/heading"
import { useUserState } from "@/src/store/user"
import Card from "@/src/components/ui/composites/card"
import { space } from "../design/spacing"

export default function Home() {
  const {userState} = useUserState()
  return (
    <Frame width="stretch" direction="column" height="hug"
      specificStyle={{
        gap: space["lg"]
      }}> 
      <Heading size="lg" type="h1" text={`Welcome back, ${userState.username}.`}/>
      <Frame width="stretch" height="100px" 
        specificStyle={{
          gap: space["md"]
        }}>
        <Card width="stretch" height="stretch" padding="sm" rounded="sm">
          <Heading size="md" type="h2" text="Hello"/>
        </Card>
        <Card width="stretch" height="stretch" padding="sm" rounded="sm">
          <Heading size="md" type="h2" text="Hello"/>
        </Card>
        <Card width="stretch" height="stretch" padding="sm" rounded="sm">
          <Heading size="md" type="h2" text="Hello"/>
        </Card>
        <Card width="stretch" height="stretch" padding="sm" rounded="sm">
          <Heading size="md" type="h2" text="Hello"/>
        </Card>
      </Frame>
    </Frame>
  )
}
