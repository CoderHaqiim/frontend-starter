"use client"

import Card from "../../ui/composites/card"
import Button from "../../ui/primitives/button"
import Frame from "../../ui/primitives/frame"
import Paragraph from "../../ui/primitives/paragraph"
import Heading from "../../ui/primitives/heading"
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
