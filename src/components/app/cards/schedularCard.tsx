import Frame from "../../ui/primitives/frame"
import Card from "../../ui/composites/card"
import { colors } from "@/src/app/design/colors"
import { space } from "@/src/app/design/spacing"
import Heading from "../../ui/primitives/heading"
import Button from "../../ui/primitives/button"

export default function SchedularCard() {
  return (
    <Card padding="md" rounded="sm" width="stretch" height="150px" specificStyles={{
                  backgroundColor: colors["white"]
                }}>
                  <Frame width="full" height="hug" 
                  specificStyles={{
                    justifyContent: "space-between",
                    paddingBottom: space["md"],
                    borderBottom: `solid 1px ${colors["outline"]}`
                  }}>
                    <Heading type="h2" size="sm" specificStyles={{marginBottom: space["sm"]}}>Schedular</Heading>
                    <Frame specificStyles={{
                      gap: space["sm"]
                    }}>
                      <Button variant="outline" size="sm" isIcon iconName="icon-expand"/>
                    </Frame>
                  </Frame>
                  <Frame width="stretch" height="hug" specificStyles={{
                    marginTop: space["md"],
                    gap: space["xs"]
                  }}>
                    <Button variant="outline" rounded="lg" size="xs"> Due Today</Button>
                    <Button variant="outline" rounded="lg" size="xs"> Due Today</Button>
                    <Button variant="outline" rounded="lg" size="xs"> Due Today</Button>
                  </Frame>
                </Card>
  )
}
