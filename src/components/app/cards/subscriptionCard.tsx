import Card from "../../ui/composites/card"
import Button from "../../ui/primitives/button"
import { colors } from "@/src/app/design/colors"
import Frame from "../../ui/primitives/frame"
import { space } from "@/src/app/design/spacing"
import Paragraph from "../../ui/primitives/paragraph"
import Heading from "../../ui/primitives/heading"

export default function SubscriptionCard() {
  return (
    <Card 
        width="stretch" 
        height="hug" 
        padding="lg"
        rounded="md"

        specificStyles={{
            backgroundColor: colors["accent2"],
            gap: space["md"]
        }}>
        <Frame direction="column">
            <Heading size="sm" type="h2">Subscription</Heading>
            <Paragraph size="sm">
                Plan: Free
            </Paragraph>
        </Frame>
        <Button variant="fill" rounded="lg" size="sm">Manage Subscription</Button>
    </Card>
  )
}
