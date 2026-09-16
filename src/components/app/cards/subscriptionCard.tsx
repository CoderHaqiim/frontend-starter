"use client"

import Card from "../../base/ui/composites/card"
import Button from "../../base/ui/primitives/button"
import Frame from "../../base/ui/primitives/frame"
import Heading from "../../base/ui/primitives/heading"
import Paragraph from "../../base/ui/primitives/paragraph"
import { useTheme } from "../../providers/themeProvider"

export default function SubscriptionCard() {
    const {colors} = useTheme()
  return (
    <Card 
        width="stretch" 
        height="hug" 
        padding="lg"
        rounded="md"
        gap="sm"
        specificStyles={{
            backgroundColor: "transparent",
        }}>
        <Frame className="flex-col">
            <Heading size="xs" type="h2">Subscription</Heading>
            <Paragraph size="xs">
                Plan: Free
            </Paragraph>
        </Frame>
        <Button variant="outline" size="sm">Manage Subscription</Button>
    </Card>
  )
}
