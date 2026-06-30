"use client"

import Frame from "@/src/components/ui/primitives/frame"
import Main from "@/src/components/layout/main"
import Heading from "@/src/components/ui/primitives/heading"
import { useUserState } from "@/src/store/user"
import Card from "@/src/components/ui/composites/card"
import { space } from "../design/spacing"
import Paragraph from "@/src/components/ui/primitives/paragraph"
import { colors } from "../design/colors"
import { fontWeight } from "../design/typograhy"

export default function Home() {
  const {userState} = useUserState()
  return (
    <Frame width="stretch" direction="column" height="hug"
      specificStyle={{
        gap: space["lg"]
      }}> 
      <Frame width="hug" height="hug" direction="column">
        <Heading size="xl" type="h1" text={`Welcome back, ${userState.username}.`}/>
        <Paragraph size="md">
          Here's what's happening today.
        </Paragraph>
      </Frame>
      <Frame width="stretch" height="100px" 
        specificStyle={{
          gap: space["md"]
        }}>
        <Card width="stretch" height="stretch" padding="md" rounded="sm">
          <Heading 
            size="xs" 
            type="h2" 
            text="Active Businesses" 

            specificStyles={{
              color: colors["textColor2"],
              fontWeight: fontWeight["medium"]
            }}
          />
          <Paragraph 
            size="xxl"
            specificStyle={{
              color: colors["textColor1"],
              fontWeight: fontWeight["bold"]
            }}
          >
            3
          </Paragraph>
        </Card>
        <Card width="stretch" height="stretch" padding="md" rounded="sm">
          <Heading 
            size="xs" 
            type="h2" 
            text="Total Income" 

            specificStyles={{
              color: colors["textColor2"],
              fontWeight: fontWeight["medium"]
            }}
          />
          <Paragraph 
            size="xxl"
            specificStyle={{
              color: colors["textColor1"],
              fontWeight: fontWeight["bold"]
            }}
          >
            $4000
          </Paragraph>
        </Card>
        <Card width="stretch" height="stretch" padding="md" rounded="sm">
          <Heading 
            size="xs" 
            type="h2" 
            text="Total Expenses" 

            specificStyles={{
              color: colors["textColor2"],
              fontWeight: fontWeight["medium"]
            }}
          />
          <Paragraph 
            size="xxl"
            specificStyle={{
              color: colors["textColor1"],
              fontWeight: fontWeight["bold"]
            }}
          >
            $500
          </Paragraph>
        </Card>
        <Card width="stretch" height="stretch" padding="md" rounded="sm">
          <Heading 
            size="xs" 
            type="h2" 
            text="Net Profit" 

            specificStyles={{
              color: colors["textColor2"],
              fontWeight: fontWeight["medium"]
            }}
          />
          <Paragraph 
            size="xxl"
            specificStyle={{
              color: colors["textColor1"],
              fontWeight: fontWeight["bold"]
            }}
          >
            $3500
          </Paragraph>
        </Card>
      </Frame>
    </Frame>
  )
}
