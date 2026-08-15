import Frame from "../../ui/primitives/frame"
import { goals } from "@/src/app/dashboard/performance/goals/page"
import List from "../../ui/composites/list"
import Heading from "../../ui/primitives/heading"
import Card from "../../ui/composites/card"
import Paragraph from "../../ui/primitives/paragraph"
import GoalsItem from "../goalsItem"

export default function GoalsCard() {
  return (
    <Card padding="lg" height="hug" width="300px" className="border-[1px] border-[var(--color-outline2)]">
      <Frame className="mb-[var(--space-md)]">
        <Heading size="sm" type="h2">Upcoming Goals</Heading>
      </Frame>
      <Frame>
        {goals && goals.length > 0 ? (
          <List scroll="hidden">
            {goals.map((goal) => (
              <GoalsItem key={goal.id} goal={goal} />
            ))}
          </List>
        ) : (
          <Paragraph size="md">No upcoming goals yet.</Paragraph>
        )}
      </Frame>
    </Card>
  )
}
