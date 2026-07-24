import Card from "../../ui/composites/card"
import Button from "../../ui/primitives/button"
import { colors } from "@/src/app/design/colors"
import Frame from "../../ui/primitives/frame"
import { space } from "@/src/app/design/spacing"
import Paragraph from "../../ui/primitives/paragraph"
import Heading from "../../ui/primitives/heading"
import Button2 from "../button2"

export default function SubscriptionCard() {
  return (
    <Card 
        width="stretch" 
        height="hug" 
        padding="lg"
        rounded="md"
        gap="sm"
        specificStyles={{
            backgroundColor: colors["accent2"],
        }}>
        <Frame direction="column">
            <Heading size="xs" type="h2">Subscription</Heading>
            <Paragraph size="xs">
                Plan: Free
            </Paragraph>
        </Frame>
        <Button variant="fill" size="sm">Manage Subscription</Button>
    </Card>
  )
}
