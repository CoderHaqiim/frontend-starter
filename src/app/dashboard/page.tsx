"use client"

import Frame from "@/src/components/ui/primitives/frame"
import Main from "@/src/components/layout/main"
import Heading from "@/src/components/ui/primitives/heading"
import { useUserState } from "@/src/store/user"

export default function Home() {
  const {userState} = useUserState()
  return (
    <Frame width="stretch" direction="column" height="hug"> 
      <Heading size="lg" type="h1" text={`Welcome back, ${userState.username}.`}/>
    </Frame>
  )
}
