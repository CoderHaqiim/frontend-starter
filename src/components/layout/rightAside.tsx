import Aside from "./aside";
import Frame from "../ui/primitives/frame";
import { colors } from "@/src/app/design/colors";
import Card from "../ui/composites/card";
import Heading from "../ui/primitives/heading";
import { space } from "@/src/app/design/spacing";

export default function RightAside() {
  return (
    <Aside variant="right" specificStyles={{width:"350px", backgroundColor: colors["background2"]}}>
        <Frame width="stretch" height="hug" direction="column">
            <Heading type="h2" size="sm" text="Task manager" specificStyles={{
              marginBottom: space["sm"]
            }}/>
            <Card padding="md" rounded="sm" width="stretch" height="hug">
              hello
            </Card>
        </Frame>
    </Aside>
  )
}