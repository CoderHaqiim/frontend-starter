"use client"

import Frame from "@/src/components/mixed/frame"
import Main from "@/src/components/layout/main"
import Heading from "@/src/components/ui/heading"
import { useUserState } from "@/src/store/user"

export default function Home() {
  const {userState} = useUserState()
  return (
    <Main>
      <Frame variant="stretch" padding="md">
        <Heading type="h1" text={`Welcome back, ${userState.username}.`}/>
      </Frame>
    </Main>
  )
}
